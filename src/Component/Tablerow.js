import React from 'react';
import {useContext} from 'react';
import Updateusercontext from '../Context/updateuser';
import { Button} from 'react-bootstrap';
const Tablerow=(props)=>{
  const context = useContext(Updateusercontext);
  const id=props.data.id;
  // const upateuser=(id)=>{
  //   context.method(id);
  // }
    return(<tr>
      <td>{props.index}</td>
        <td>{props.data.fname}</td>
        <td>{props.data.lname}</td>
        <td>{props.data.email}</td>
        <td ><Button variant="success" onClick={(event)=>{context.updatemethod(id)}}>Edit</Button></td>
        <td ><Button variant="danger" onClick={(event)=>{context.deletemethod(id,props.index)}}>Delete</Button></td>
      </tr>)
}
export default Tablerow;