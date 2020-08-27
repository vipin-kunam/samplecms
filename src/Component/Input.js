import React from 'react';
import { Form } from 'react-bootstrap';
const Input=(props)=>{
    return (<Form.Group controlId={props.controlId}>
    <Form.Label>{props.label}</Form.Label>
    <Form.Control ref={props.inref} type={props.type} placeholder={props.placeholder} value={props.value} onChange={props.change}/>
  </Form.Group>)

}
export default Input;