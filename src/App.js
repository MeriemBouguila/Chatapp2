
import './App.css';
import SideBar from './Components/Sidebar/SidebarComponent'
import Messages from './Components/Messages/MessageComponent'
import { Grid } from 'semantic-ui-react';


{/* <div style={{paddingLeft :'350px'}}></div> */}

function App() {
  return (
    <Grid columns="equal">
     <SideBar/>
     <Grid.Column className="messagepanel">
          <Messages/>
     </Grid.Column>
    <Grid.Column width={3}>
       <span>

       </span>
     </Grid.Column>
   </Grid>
  );
}

export default App;
