import React , {useEffect, useState} from "react";
import { Button, Icon, Menu, Modal ,Segment,Form} from "semantic-ui-react";
import {connect  } from "react-redux";
import firebase from '../../../Server/Firebase'
import { setChannel } from '../../../Store/actioncreator'
import './Chanelcss.css';

const Channels= (props) =>{
    const [modalOpenState,setModalOpenState]=useState(false);
    const [channelAddState,setchannelAddState]=useState({name:'',description:''});
    const [loadingState,setLoadingState]=useState(false);
    const [channelState,setChannelState]=useState([]);
    
    const channelRef = firebase.database().ref("channels")
    
    useEffect(()=>{
        channelRef.on('child_added',(snap)=>{
            setChannelState((currentState)=>{
                let updatedState =[...currentState]
                updatedState.push(snap.val());
               
                return updatedState;
            })
        })
        return ()=>channelRef.off()
    },[])

    useEffect(()=>{
        if(channelState.length === 0){
            props.selectChannel(channelState[0])
        }
    },[!props.channel ? channelState : null])





    const openModal = () => {
        setModalOpenState(true)
    }

    const closeModal = () => {
        setModalOpenState(false)
    }
    const displayChan = () =>{
       if(channelState.length > 0){
       return  channelState.map((channel)=>{
            return <Menu.Item
                key={channel.id}
                name={channel.name}
                onClick={()=>props.selectChannel(channel)}
                active={props.channel && channel.id === props.channel.id}
            ></Menu.Item>
        })
       }
    }
    const onSubmit = ()=> {
        if(!checkform()){
            return;
        }
            const key = channelRef.push().key;
            const channel ={
                id:key,
                name:channelAddState.name,
                description:channelAddState.description,
                created_by:{
                name : props.user.displayName,
                avatar : props.user.photoURL
                }
            }
        setLoadingState(true);
        channelRef.child(key)
            .update(channel)
            .then(()=>{
                setchannelAddState({ name :'',description:''});
                closeModal();
            })
            .catch((err)=>{
                console.log(err)
            })
            }



    const checkform=()=>{
       return channelAddState && channelAddState.name && channelAddState.description;
    }

    
    const handleInput = (e)=> {
        let target=e.target;
        setchannelAddState((currentState)=>{
            let updatedState={...currentState};
            updatedState[target.name]=target.value;
                return updatedState;
        })
    }

    
    return <> <Menu.Menu>
        <Menu.Item as="h4">
            <span>
                <Icon name="exchange"/>Channels
            </span>
            {channelState.length}
   </Menu.Item>
   {displayChan()}
   <Menu.Item>
            <span onClick={openModal}>
    <Icon name="add" />Add Channel
            </span>
   </Menu.Item>
    </Menu.Menu>
    <Modal open={modalOpenState} onClose={closeModal}>
        <Modal.Header>
            Create Channel
        </Modal.Header>
        <Modal.Content>
        <Form onSubmit={onSubmit}>
            <Segment stacked>
              <Form.Input
                    name="name"
                    value={channelAddState.Name}
                    onChange={handleInput}
                    type="text"
                    placeholder="Enter Channel name"
                ></Form.Input>
                <Form.Input
                    name="description"
                    value={channelAddState.Description}
                    onChange={handleInput}
                    type="text"
                    placeholder="Description of the channel"
                ></Form.Input>
            </Segment>
            </Form>
        </Modal.Content>
        <Modal.Actions>
            <Button loading={loadingState} onClick={onSubmit}>
                <Icon name="checkmark">Save</Icon>
            </Button>
            <Button onClick={closeModal}>
                <Icon name="remove">Cancel</Icon>
            </Button>
        </Modal.Actions>
  </Modal>
    </>
}

    const mapStateToProps = (state)=>{
        return {
            user : state.user.currentUser,
            channel : state.channel.currentChannel
        }
    }

    const mapDispatchToProps =(dispatch)=>{
        return {
            selectChannel : (channel)=> dispatch(setChannel(channel))
        }
    }

export default connect(mapStateToProps,mapDispatchToProps)(Channels);