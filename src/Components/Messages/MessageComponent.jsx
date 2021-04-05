import React , {useEffect, useState} from 'react';
import MessageHeader from './MessageHead/MessageHeader';
import MessageContent from './MessageContent/MessageContComponent';
import MessageInput from './MessageInput/MessageInputComponent';
import firebase from '../../Server/Firebase';
import { connect } from 'react-redux';
import { Segment,Comment } from 'semantic-ui-react';
import "./MessageComp.css"
import "./MessageContent/MessageCont.css"



const Message = (props) => {
   const messageRef = firebase.database().ref('messages');
    const [messagesState,setMessagesState]=useState([]);
   

    useEffect(()=>{
        if(props.channel){
            setMessagesState([]);
       messageRef.child(props.channel.id).on('child_added',(snap)=>{
        setMessagesState((currentState)=>{
            let updatedState = [...currentState];
            updatedState.push(snap.val());
            return updatedState;
        })
       })
       return ()=> messageRef.child(props.channel.id).off();
    }
   },[props.channel])

   
   const displayMessages=()=>{
       if(messagesState.length>0){
          return messagesState.map((message)=>{
              return <MessageContent OwnMessage={message.user.id === props.user.uid}key={message.timestamp} message={message}/>
           })
       }
   }
    return  <div>
        <MessageHeader/>
        <Segment className="messagecontent">
          <Comment.Group>{displayMessages()}</Comment.Group>  
        </Segment>
        <MessageInput/>
    </div>
}

const mapStateToProps = (state)=>{
    return {
        channel: state.channel.currentChannel,
        user: state.user.currentUser
    }
}

export default connect(mapStateToProps)(Message);