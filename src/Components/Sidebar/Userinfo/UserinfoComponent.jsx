import React from 'react';
import { connect } from 'react-redux';
import { Grid, Header ,Image,Dropdown} from 'semantic-ui-react';
import firebase from '../../../Server/Firebase'

const UserInfo = (props) => {
    
    const dropDown=()=>{
        return [{
            key:'signout',
            text:<span onClick={signOut}>SignOut</span>
        }]
    }

    const signOut = () => {
        firebase
        .auth()
        .signOut()
        .then(()=> console.log('user logout'))
    }

    if (props.user){
    return (
        <Grid>
            <Grid.Column>
                <Grid.Row>
                    <Header as="h3">
                    <Header.Content>ChatApp</Header.Content>  
                    </Header>
                    <Header as="h2">
                        <Dropdown
                            trigger={ <span>
                        <Image src={props.user.photoURL} avatar></Image>
                        {props.user.displayName}
                    </span>} 
                            options={dropDown()}
                    ></Dropdown>
                   
                    </Header>
                </Grid.Row>
            </Grid.Column>
        </Grid>
    )
} 
return null;
}
const mapStateToProps = (state)=>{
    return {
        user: state.user.currentUser
    }
}
export default connect(mapStateToProps)(UserInfo);