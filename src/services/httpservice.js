 import axios from 'axios'
 import Errordata from './errorpagedata'
 const setheader=()=>{
    const Authorization=localStorage.getItem('Authorization');
    if(Authorization!=''&&Authorization!=null){
        axios.defaults.headers.common['Authorization'] = Authorization;}
 }
 let handleerror=(err,reject)=>{
console.log('err',err);
console.log('errordata',Errordata);
//console.log('err',err.response.status);
if(err.response){
   if(err.response.status==401||err.response.status==409){
      reject(err);
   }
}
else{
   Errordata.data.history.push('/abc');
}


 }
 let get=(url)=>{
    setheader()
    return new Promise((resolve,reject)=>{
          axios.get(url).then((data)=>{
       resolve(data);
          },(err)=>{
            handleerror(err,reject);
          })
    })
 }
 let post=(url,payload)=>{
    setheader()
    return new Promise((resolve,reject)=>{
          axios.post(url,payload).then((data)=>{
       resolve(data);
          },(err)=>{
            handleerror(err,reject);
          })
    })
 }
 let del=(url)=>{
    setheader()
    return new Promise((resolve,reject)=>{
          axios.delete(url).then((data)=>{
       resolve(data);
          },(err)=>{
            handleerror(err,reject);
          })
    })
 }
 let login=(url,payload)=>{
    //setheader()
    return new Promise((resolve,reject)=>{
          axios.post(url,payload).then((data)=>{
            localStorage.setItem('Authorization',data.data.token)
       resolve(data);
          },(err)=>{
             //reject(err);
         handleerror(err,reject);
          })
    })
 }
 let signup=(url,payload)=>{
    return new Promise((resolve,reject)=>{
          axios.post(url,payload).then((data)=>{
       resolve(data);
          },(err)=>{
            handleerror(err,reject);
          })
    })
 }
 
export default {get,post,del,login,signup} ;