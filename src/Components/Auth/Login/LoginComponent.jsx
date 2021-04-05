import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import {Grid,Form, Segment, Header, Button, Message } from 'semantic-ui-react';
import firebase from '../../../Server/Firebase';

const Login = () => {
    let user = {
         email :'',
        password :''
    }
    let errors =[];

    const[userState,setuserState]=useState(user);
    const[errorState,seterrorState]=useState(errors);
    const[isLoading,setIsLoading]=useState(false);

    const handleInput=(event) => {
        let target= event.target;
       setuserState((currentState)=>{
       let currentuser = {...currentState};
       currentuser[target.name]=target.value;
       return currentuser;
   })
}

const isFormEmpty =()=>{
    return  !userState.email.length || 
    !userState.password.length 
}
const checkForm =()=>{
    if (isFormEmpty()) {
        seterrorState((error)=>error.concat({message :"missing field"}))
        return false;
    }
    return true;
}

const onSubmit =(event)=>{
    seterrorState(()=> []);
    
    if (checkForm()){
        setIsLoading(true)
        firebase.auth().signInWithEmailAndPassword(userState.email,userState.password)
        .then(user => {
            setIsLoading(false)
            console.log(user)
        })
        .catch(serverError => {
            setIsLoading(false)
            seterrorState((error)=>error.concat(serverError))
            
        })
    } 
}
const formaterrors=()=>{
    return errorState.map((error,index) => <p key={index}>{error.message}</p>)
 }
    return (
        <Grid verticalAlign="middle" textAlign="center" >
            <Grid.Column style={{maxWidth:'500px'}}>
                <Header as="h2">
                    Login
                </Header>
                <Form onSubmit={onSubmit}>
            <Segment>
               
                
                <Form.Input
                    name="email"
                    value={userState.email}
                    icon="mail"
                    iconPosition="left"
                    onChange={handleInput}
                    type="email"
                    placeholder="Email"
                ></Form.Input>
                <Form.Input
                    name="password"
                    value={userState.password}
                    icon="lock"
                    iconPosition="left"
                    onChange={handleInput}
                    type="password"
                    placeholder="Password"
                ></Form.Input>
            </Segment>
            <Button disabled={isLoading} loading={isLoading}>Login</Button>
            </Form>
    
            {errorState.length > 0 && <Message error>
            <h3>Errors</h3>
            {formaterrors()}
            </Message> 
            }
             
            <Message>
               Not a user?   <Link to="/Register">Register</Link>
            </Message> 
            
        </Grid.Column>
        </Grid>)
}

export default Login;