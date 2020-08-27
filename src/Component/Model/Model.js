import React from 'react';
import './Model.css'
import { Button,Row,Col,Spinner,Container} from 'react-bootstrap';
const Model=(props)=>{
  const style={display:props.display?'block':'none'};

    return(<div id="id01" className="modal" style={style}>
    <span  className="close" title="Close Modal">×</span>
    <form className="modal-content" >
      <div className="containerM">
        <h1>Delete User</h1>
        <p>Are you sure you want to delete?</p>
      <Container>
        <Row><Col><Button variant="success" type="button" onClick={props.cancel}>Cancel</Button></Col>
        <Col><Button variant="primary" type="button" onClick={props.dodelete} >Yes</Button></Col>
        </Row>
      </Container>
       
      </div>
    </form>
  </div>)
}
export default Model;