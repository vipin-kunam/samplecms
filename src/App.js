import React from 'react';
import {Container,Row,Col} from 'react-bootstrap';
import './App.css';
import Signup from './Containers/Signup/Signup';
import Login from './Containers/Login/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Component/header';
import {Switch} from 'react-router-dom';
import {Route} from 'react-router-dom';
import {BrowserRouter} from 'react-router-dom';
import Display from './Containers/Display';
import Adduser from './Containers/addredituser';
import Home from './Containers/home';
import Errorpage from './Containers/error';
function App() {
  return (
    <BrowserRouter>
    <Container>
      <Row><Col><Header></Header></Col></Row>
  <Row>
    <Col>
<Switch>
  <Route path="/"  exact component={Home}/>
  <Route path="/login"  component={Login}/>
  <Route path="/signup" component={Signup}/>
  <Route path="/display" component={Display}/>
  <Route path="/add" component={Adduser}/>
  <Route  component={Errorpage}/>
</Switch>

    </Col>
  </Row>
</Container></BrowserRouter>
  );
}

export default App;
