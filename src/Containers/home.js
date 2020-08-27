import React from 'react';
import {Card,Button} from 'react-bootstrap';
const Home=(props)=>{
let gotosignup=()=>{
    props.history.push('/signup');
}
    return(<Card className="text-center">
    <Card.Header>Simple CRUD App</Card.Header>
    <Card.Body>
      <Card.Title>A small app powered by React,Nodejs and Firestore</Card.Title>
      <Card.Text>
        Please Create a account and  Login for Create ,Add ,update and Delete operations.
      </Card.Text>
      <Button variant="primary" onClick={gotosignup} >Go to Signup</Button>
    </Card.Body>
    <Card.Footer className="text-muted">Since 25 August 2020 </Card.Footer>
  </Card>)
}
export default Home;