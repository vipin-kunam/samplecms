import React from 'react';
import { Component } from 'react';
import axios from '../../services/httpservice';
//import axios from 'axios';
import Heading from '../../Component/heading';
import Input from '../../Component/Input'
import { Button, Form ,Container,Row,Col} from 'react-bootstrap';
class Signup extends Component {
  state = {
    form: {
      fname: {
        id: '1',
        value: 'vipin',
        valid: false,
        type: 'text',
        controlId: 'formBasicText1',
        label: 'First Name',
        placeholder: 'First name',
      },
      lname: {
        id: '2',
        value: 'k',
        valid: false,
        type: 'text',
        controlId: 'formBasicText',
        label: 'Last Name',
        placeholder: 'Last name',
      },
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
      },
      cpass: {
        id: '5',
        value: '',
        valid: false,
        type: 'password',
        controlId: 'formBasicPassword',
        label: 'Confirm Password',
        placeholder: 'Confirm password',
      },
    },
    valid: false,
    showwarning:false
  }
  validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  onClickhandler(event) {
    event.preventDefault();
    console.log('in submit', this.state.form);
    let payload={fname:this.state.form.fname.value,
                 lname: this.state.form.lname.value,
                 email:this.state.form.email.value,
                pass:this.state.form.pass.value };
    axios.signup('/signup',payload).then((success)=>{
this.props.history.replace('/login');
    },(err)=>{
      this.setState({showwarning:true});
      //this.props.history.replace('/abc');
    })
  }
  checkforvalidy(form) {
    let iSvalid = true;
    if (form.fname.value != null && form.fname.value.trim() != '' && iSvalid) {
      form.fname.valid = true;
    }
    else {
      form.fname.valid = false;
      iSvalid = false;
    }
    if (form.lname.value != null && form.lname.value.trim() != '' && iSvalid) {
      form.lname.valid = true;
    }
    else {
      form.lname.valid = false;
      iSvalid = false;
    }
    if (this.validateEmail(form.email.value) && iSvalid) {
      form.email.valid = true;
    }
    else {
      form.email.valid = false;
      iSvalid = false;
    }
    if (form.pass.value != null && form.pass.value != '' && form.pass.value.trim() == form.cpass.value.trim() && iSvalid) {
      form.pass.valid = true;
      form.cpass.valid = true;

    }
    else {
      form.pass.valid = false;
      form.cpass.valid = false;
      iSvalid = false;
    }
    return iSvalid;
  }
  gotologin(){
    console.log('this',this.props);
    this.props.history.push('/login');
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

    this.setState({ form: form ,valid:iSvalid,showwarning:false});
  }
  render() {
    const styletext={color:'red'}
    let warningtext=<Row><p style={styletext}>User already exist</p></Row>;
    let buttonele = <Button variant="primary" type="submit" onClick={this.onClickhandler.bind(this)} disabled>
      Signup
</Button>
    if (this.state.valid) {
      buttonele = <Button variant="primary" type="submit" onClick={this.onClickhandler.bind(this)}>
        Signup
    </Button>

    }
    console.log('inrender');

    let arr = []
    const form = this.state.form;
    for (let el in form) {
      //arr.push(form[el]);
      let sl = <Input key={form[el].id} change={(event) => this.onChagehandler(event, form[el].id)} {...form[el]}></Input>;
      arr.push(sl);
    }
    // let signup = arr.map((data, index) => {
    //   return (<Input key={index} change={(event) => this.onChagehandler(event, data.id)} {...data}></Input>);
    // })
   
    return (<Container  >
      {this.state.showwarning?warningtext:null}
      <Row>
        <Col>  <Heading heading="Signup"></Heading></Col>
        
      </Row>
      <Row><Col><Form>{arr}</Form></Col></Row>
      <Row><Col>{buttonele}<Button style={this.style} variant="success" type="button" onClick={this.gotologin.bind(this)}>
      Login
  </Button></Col></Row>
    </Container>
    );
  }
}
export default Signup;