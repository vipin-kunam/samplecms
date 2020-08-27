import React from 'react';
import { Row,Col,Container,Navbar } from 'react-bootstrap';

const heading =(props)=>{
    console.log('props',props);
    
return( 
    <Navbar><Navbar.Brand>{props.heading}</Navbar.Brand></Navbar> 
    
  );
}
export default heading;