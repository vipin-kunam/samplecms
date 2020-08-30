import React from 'react';
import{ Component } from 'react';
import { Table} from 'react-bootstrap';
import Tablebody from '../Component/Tablebody';
//import axios from 'axios';
import axios from '../services/httpservice'
import { Button,Row,Col,Spinner,Container} from 'react-bootstrap';
import updateusercontext from '../Context/updateuser';
import Model from '../Component/Model/Model'
class Display extends Component{
  state={
    res:null,
    persons:[],
    showloader:true,
    showModel:false
  }
  delid=null;
  canceldelete=()=>{
    this.setState({showModel:false});
  }
  deleteuser=()=>{
    axios.del('/cms/delete'+this.delid).then((success)=>{
      let persons=this.state.persons.filter((person)=>{
    return person.id!=this.delid;
      })
      this.setState({persons:persons,showModel:false});
    
    
    },(err)=>{
      this.setState({showModel:false});
    })
  }

  static contextType=updateusercontext;
  componentDidMount(){

    this.context.updatemethod=(id)=>{
console.log('id',id);
console.log('id',this.props);

this.props.history.push('/add',{id:id});

    }
    this.context.deletemethod=(id,index)=>{
this.delid=id;
this.setState({showModel:true});
    }
    console.log('indisplay');
axios.get('/cms/get').then((success)=>{
  this.setState({persons:success.data,showloader:false});
},(err)=>{
  this.setState({showloader:false});
  this.props.history.push('/abc');
})
  }
  
  updateuser(id){
    console.log('routeprops',this.props);
    //this.props.history.push('/add?');
  }
  gotoadduser(){
    console.log('routeprops',this.props);
    this.props.history.push('/add');
  }
    render(){
      const style={
        margin:'10px',
        marginLeft:'0px'
    }
    const style1={
      position:'relative',
      top:'149px',
      left:'102px'
  } 
  const style2={
    position:'relative',
    top:'149px',
    left:'10px'
} 
  let Nodatacomp=<Container style={style2}>
  <Row>
  <Col> </Col>
  <Col xs={6}> </Col>
  <Col> </Col>
  </Row>
  <Row>
    <Col> </Col>
    <Col><h1>Please add data</h1></Col>
    <Col></Col>
  </Row>
  <Row>
    
  </Row>

</Container>
  let Tablecomp= <Table striped bordered hover>
  <thead>
    <tr>
<th>#{this.state.res}</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Username</th>
      <th>Update</th>
      <th>Remove</th>
    </tr>
  </thead>
 <Tablebody items={this.state.persons} update={this.updateuser.bind(this)}></Tablebody>
</Table>

    let component=<Container >
    <Row style={style}>
    <Button variant="primary" type="button" onClick={this.gotoadduser.bind(this)}>Add User</Button>
    </Row>
    <Row>
   {this.state.persons.length>0?Tablecomp:Nodatacomp}
    </Row>
    <Model display ={this.state.showModel} cancel={this.canceldelete} dodelete={this.deleteuser}></Model>
     </Container>

      
        return(component);
    }
}
export default Display;
