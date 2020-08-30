import React from 'react';
import './Loader.css'
import { Button,Row,Col,Spinner,Container} from 'react-bootstrap';
const Loader=(props)=>{
    const style={
       display:props.show?'block':'none'
    } 
    let Nodatacomp=null;
    if(props.show){
     Nodatacomp=<div id="id01" className="Loader" style={style}>
     <span  className="close" title="Close Modal">×</span>
     <form className="Loader-content" >
       <div className="containerM">
       <Spinner animation="border" role="status">
    <span className="sr-only">Loading...</span>
  </Spinner>
      
        
       </div>
     </form>
   </div>}
    return(Nodatacomp);
}
export default Loader
