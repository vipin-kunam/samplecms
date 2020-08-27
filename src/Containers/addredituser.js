import React from 'react';
import { useState, useCallback ,useEffect,useRef} from 'react'
import Input from '../Component/Input';
import { Button, Form } from 'react-bootstrap';
//import axios from 'axios';
import {Container,Row,Col} from 'react-bootstrap';
import axios from '../services/httpservice'
let User = (props) => {
    let adduser = () => {
    }
    const [state, setaddbuttonstatus] = useState({
        form: {
            email: {
                id: '1',
                value: '',
                valid: false,
                type: 'email',
                controlId: 'formBasicEmail',
                label: 'Email',
                placeholder: 'Enter email',
            },
            fname: {
                id: '2',
                value: '',
                valid: false,
                type: 'text',
                controlId: 'formBasicPassword1',
                label: 'Firstname',
                placeholder: 'Firstname',
            },
            lname: {
                id: '3',
                value: '',
                valid: false,
                type: 'text',
                controlId: 'formBasicPassword1',
                label: 'Lastname',
                placeholder: 'Lastname',
            }
        },
        valid: false,
        edit:false
    });
    const inputRef=useRef();
    let editusertodb=()=>{
        let formstate =state.form;
        const id=props.history.location.state.id
        let payload={fname:formstate.fname.value,
                     lname:formstate.lname.value,
                     email:formstate.email.value,
                      id:id }
        console.log('in edit');
        axios.post('/cms/edit',payload).then((success)=>{
            console.log('success',success)
            props.history.push('/display');
        },(err)=>{
console.log('err',err);
        })
    }
    useEffect(()=>{
        console.log('input',inputRef);
        inputRef.current.focus();
        if(props.history.location.state){
            const id=props.history.location.state.id
            axios.get('/cms/getsingledata'+id).then((success)=>{
       console.log(success)
       let data=success.data;
       let formstate =state.form;
       formstate.email.value=data.email;
       formstate.fname.value=data.fname;
       formstate.lname.value=data.lname;
       setaddbuttonstatus({ form: formstate, valid: true,edit:true });
            },(err)=>{
                props.history.push('/abc');
            })
        }

    },[])

    let addusertodb=()=>{
        let formstate =state.form;
        let payload={fname:formstate.fname.value,
                     lname:formstate.lname.value,
                     email:formstate.email.value}
                     axios.post('/cms/add',payload).then((success)=>{
                         console.log('success',success)
                         props.history.push('/display');
                     },(err)=>{
                        props.history.push('/abc');
                     })
            }
    let buttonel = <Button variant="primary" type="button" disabled >
        Disabled
</Button>
    if (state.valid) {
        buttonel = <Button variant="primary" type="button" onClick={state.edit?editusertodb:addusertodb} >
            {state.edit?'Edit':'ADD'}
</Button>
    }
    


    let validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    let checkforvalidy = (form) => {
        let iSvalid = true;
        if (validateEmail(form.email.value) && iSvalid) {
            form.email.valid = true;
            console.log('ife')
        }
        else {
            form.email.valid = false;
            iSvalid = false;
        }
        if (form.fname.value.trim() != '' && form.fname.value != null && iSvalid) {
            form.fname.valid = true;
            console.log('iff')
        }
        else {
            form.fname.valid = false;
            iSvalid = false;
        }
        if (form.lname.value.trim() != '' && form.lname.value != null && iSvalid) {
            form.lname.valid = true;
            console.log('ifl')
        }
        else {
            form.lname.valid = false;
            iSvalid = false;
        }
        console.log('isValis', iSvalid);
        return iSvalid;
    }
    let onChagehandler = useCallback((event, id) => {
        console.log('in change');
        let iSvalid = false;
        let edit=false
        let form = state.form;
        for (let el in form) {

            if (form[el].id == id) {
                const temp = { ...form[el] };
                temp.value = event.target.value;
                form[el] = temp;
            }
        } iSvalid = checkforvalidy(form)
        if(props.history.location.state){
            edit=true;
        }
        setaddbuttonstatus({ form: form, valid: iSvalid ,edit:edit});
        // this.setState({ form: form ,valid:iSvalid});
    }, [])
    let form = state.form;
    let arr = [];
let c=0;
    for (let el in form) {
        //console.log(el)
        
        let sl = <Input key={form[el].id} novalue={true} inref ={c==0?inputRef:null} change={(event) => onChagehandler(event, form[el].id)} {...form[el]}></Input>;
        arr.push(sl);
        c++;

    }
    const style={
        marginTop:'10px'
    }
    
    return (<Container  >
        <Row style={style}>
          <Col> <Form>{arr}</Form></Col>
          
        </Row>
        <Row><Col>{buttonel}</Col></Row>
      </Container>);

}
export default User;