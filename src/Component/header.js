import React from 'react';
import { Nav, Navbar, Form, FormControl, Button, Row, Col, Container } from 'react-bootstrap';
import { NavLink ,withRouter} from 'react-router-dom';
import Errordata from '../services/errorpagedata';
const header = (props) => {
  Errordata.data=props;
  console.log('header',props);
  const style={
    marginLeft:'12px'
  }
  let logout=()=>{
console.log('props',props);
  localStorage.clear();
  props.history.push('/login');
  };
let logincomp=null;
let signupcomp=null;
let logoutcomp=null;
let displaycomp=null;
  const Authorization=localStorage.getItem('Authorization');
    if(Authorization!=''&&Authorization!=null){
      logoutcomp=<Button variant="danger" style={style} onClick={logout} >Logout</Button>;
      displaycomp=<NavLink to="/display" >Display</NavLink>;
    }
    else{
      logincomp=<NavLink to="/login" >Login</NavLink>;
      signupcomp=<NavLink to="/signup" >Signup</NavLink>;
      logoutcomp=null;
      displaycomp=null;
     
    
 }
  return (<Navbar bg="dark" variant="dark">
    <NavLink to="/" >Home</NavLink>
    <Nav className="mr-auto">
      <Container>
        <Row>
<Col> {logincomp}</Col>
<Col>{signupcomp}</Col>
          <Col>{displaycomp}</Col>
        </Row>

      </Container>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-primary" >Search</Button>{logoutcomp}
      
    </Form>

  </Navbar>)
}

export default withRouter(header);
