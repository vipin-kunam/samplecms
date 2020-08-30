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
import Loader from './Component/Loader/loader';
import axios from 'axios';
import {useState,useEffect} from 'react';
function App() {
const [state,setstate]=useState(false);
useEffect(()=>{

  axios.interceptors.request.use(function (config) {
    // spinning start to show
    console.log('in axioss');
    setstate(true);
    return config;
   }, function (error) {
    setstate(false);
     return Promise.reject(error);
    
   });
  
   axios.interceptors.response.use(function (response) {
    // spinning hide
    console.log('in axiose');
    setstate(false);
  
    return response;
  }, function (error) {
    setstate(false);
    return Promise.reject(error);
  });
},[])


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
</Container>
<Loader show={state}></Loader>
</BrowserRouter>
  );
}

export default App;
