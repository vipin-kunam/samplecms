import React from 'react';
import Tablerow from './Tablerow';
const tablebody=(props)=>{
  const listitems=props.items.map((data,index)=>(<tbody key={index}><Tablerow data={data} index={index}></Tablerow></tbody>))

  return listitems;
}
    
export default tablebody;