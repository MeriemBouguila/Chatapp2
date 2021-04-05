import React from 'react';
import { Menu } from 'semantic-ui-react';
import UserInfo from "./Userinfo/UserinfoComponent";
import Channels from "./Channels/ChannelComponent";
const sideBar = ()=>{
return (<Menu vertical fixed='left' bordeless size='large'>
<UserInfo/>
<Channels/>
</Menu>)
}
export default sideBar; 