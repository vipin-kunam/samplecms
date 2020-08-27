import React from 'react';
import { Component } from 'react';
import Input from '../../Component/Input';
import Heading from '../../Component/heading';
//import axios from 'axios';
import axios from '../../services/httpservice';
import { Button, Form,Container,Row,Col } from 'react-bootstrap';
class Login extends Component {
  state={
    form:{
      email: {
        id: '3',
        value: '',
        valid: false,
        type: 'email',
        controlId: 'formBasicEmail',
        label: 'Email',
        placeholder: 'Enter email',
      },
      pass: {
        id: '4',
        value: '',
        valid: false,
        type: 'password',
        controlId: 'formBasicPassword1',
        label: 'Password',
        placeholder: 'Password',
      }
    },
    valid:false,
    invalid:false
  }
  componentDidMount(){
    console.log('in loggin')
  }

  validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  checkforvalidy(form) {
    let iSvalid=true;
    if (this.validateEmail(form.email.value) && iSvalid) {
      form.email.valid = true;
    }
    else {
      form.email.valid = false;
      iSvalid = false;
    }
    if(form.pass.value.trim()!=''&&form.pass.value!=null&&iSvalid){
      form.pass.valid = true;
    }
    else{
      form.pass.valid = false;
      iSvalid = false;
    }
    return iSvalid;
  }
  gotosignup=()=>{
    this.props.history.push('/signup');
  }
style={
    marginLeft:'10px'
}
  onChagehandler(event, id) {
    let iSvalid=false;
    let form = { ...this.state.form }
    for (let el in form) {

      if (form[el].id == id) {
        const temp = { ...form[el] };
        temp.value = event.target.value;
        form[el] = temp;
      }
    } iSvalid=this.checkforvalidy(form)

    this.setState({ form: form ,valid:iSvalid,invalid:false});
  }
  onClickhandler(event) {
    event.preventDefault();
  //console.log('form',this.state.form);
  const payload={email:this.state.form.email.value,
                 pass:this.state.form.pass.value}    
axios.login('/login',payload).then((success)=>{
console.log(success);
localStorage.setItem('Authorization',success.data.token)
//localStorage.setItem('userid',success.data.userid)
this.props.history.push('/display');
},(err)=>{
this.setState({invalid:true});
})
  } 
  
  render() {
    let validatortext=this.state.invalid?<Row><p>Username or password invalid</p></Row>:null;
    let buttonele = <Button variant="success" type="button" onClick={this.onClickhandler.bind(this)} disabled>
    Login
</Button>
  if (this.state.valid) {
    buttonele = <Button variant="success" type="button" onClick={this.onClickhandler.bind(this)}>
      Login
  </Button>

  }
    let arr = []
    const form = this.state.form;
    for (let el in form) {
      //arr.push(form[el]);
      let sl = <Input key={form[el].id} change={(event) => this.onChagehandler(event, form[el].id)} {...form[el]}></Input>;
      arr.push(sl);
    }
    
    return (<Container  >
      
      <Row>
        <Col> <Heading heading="Login"></Heading></Col>
        
      </Row>
      {validatortext}
      <Row>
        <Col ><Form>{arr}</Form></Col></Row>
      <Row><Col xs={2}>{buttonele}<Button  style ={this.style} variant="primary" type="button" onClick={this.gotosignup.bind(this)}>
      Signup
  </Button></Col></Row>
      
    </Container>);
  }
}
export default Login;