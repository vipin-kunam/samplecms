import React from 'react';
import { Button,Container,Row,Col } from 'react-bootstrap';
const Errorpage =(props)=>{
let gotohome=()=>{
    props.history.push('/')
}
    return(<Container  >
      
        <Row>
          <Col> <h1>Some Error occured</h1></Col>
          
        </Row>
        
        <Row>
        <Button   variant="primary" type="button" onClick={gotohome}>
      Go to Home
      </Button>
         </Row>
       
        
      </Container>)
}
export default Errorpage;
