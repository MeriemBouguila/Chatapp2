import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import {Grid,Form, Segment, Header, Button, Message } from 'semantic-ui-react';
import firebase from '../../../Server/Firebase';


const Register = () => {

    let user = {
        userName :'',
        email :'',
        password :''
    }
    let errors =[];
    let userColRef = firebase.database().ref('users');

    const[userState,setuserState]=useState(user);
    const[errorState,seterrorState]=useState(errors);
    const[isLoading,setIsLoading]=useState(false);
    const[isSuccess,setIsSuccess]=useState(false);

    const handleInput=(event) => {
             let target= event.target;
            setuserState((currentState)=>{
            let currentuser = {...currentState};
            currentuser[target.name]=target.value;
            return currentuser;
        })
    }

    const checkForm =()=>{
        if (isFormEmpty()) {
            seterrorState((error)=>error.concat({message :"missing field"}))
            return false;
        } else if (!checkPassword()){
            seterrorState((error)=>error.concat({message :"password not valid"}))
            return false;
        }
        return true;
    }

    const isFormEmpty =()=>{
        return !userState.userName.length ||
        !userState.email.length || 
        !userState.password.length 
    }

    const checkPassword=()=>{
        if (userState.password.length < 6){
            seterrorState((error)=>error.concat({message :"Password should be more than six letters"}))
            return false;
        }
        return true;
    }
    const onSubmit =(event)=>{
        seterrorState(()=> []);
        setIsSuccess(false)
        if (checkForm()){
            setIsLoading(true)
            firebase.auth().createUserWithEmailAndPassword(userState.email,userState.password)
            .then(createdUser => {
                setIsLoading(false)
                updateUser(createdUser)
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

    const updateUser=(createdUser) => {
        if (createdUser){
            setIsLoading(true)
            createdUser.user
            .updateProfile({
                displayName : userState.userName,
                photoURL : `http://gravatar.com/avatar/${createdUser.user.uid}?d=identicon`
            })
            .then(()=>{
                setIsLoading(false)
                saveUserDb(createdUser)
            })
            .catch(serverError => {
                setIsLoading(false)
                seterrorState((error)=>error.concat(serverError))
                
            })
        }
    }

    const saveUserDb = (createdUser)=> { 
        setIsLoading(true)
        userColRef.child(createdUser.user.uid).set({
            displayName : createdUser.user.displayName,
            photoURL : createdUser.user.photoURL
        })
        .then(()=>{
            setIsLoading(false)
            setIsSuccess(true)
        })
        .catch(serverError => {
            setIsLoading(false)
            seterrorState((error)=>error.concat(serverError))
            
        })
    }

    return (
    <Grid verticalAlign="middle" textAlign="center" >
        <Grid.Column style={{maxWidth:'500px'}}>
            <Header as="h2">
                Register
            </Header>
            <Form onSubmit={onSubmit}>
        <Segment>
            <Form.Input
                name="userName"
                value={userState.userName}
                icon="user"
                iconPosition="left"
                onChange={handleInput}
                type="text"
                placeholder="Name"
            ></Form.Input>
            
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
        <Button disabled={isLoading} loading={isLoading}>Submit</Button>
        </Form>

        {errorState.length > 0 && <Message error>
        <h3>Errors</h3>
        {formaterrors()}
        </Message> 
        }
         {isSuccess && <Message success>
        <h3>Registered Successfuly</h3>
        {formaterrors()}
        </Message> 
        }
        <Message>
            Already a user?   <Link to="/Login">Login</Link>
        </Message> 
        
    </Grid.Column>
    </Grid>)
}
export default Register;