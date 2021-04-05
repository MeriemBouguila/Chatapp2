import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
import {Provider , connect} from 'react-redux';
import {createStore } from 'redux';
import App from "./App";
import Login from "./Components/Auth/Login/LoginComponent";
import Register from "./Components/Auth/Register/RegisterComponent";
import firebase from "./Server/Firebase";
import reportWebVitals from "./reportWebVitals";
import "semantic-ui-css/semantic.min.css";
import {combinedReducers} from './Store/reducer';
import{ setUser} from './Store/actioncreator'

const store = createStore(combinedReducers);

const Index = (props) => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        props.setUser(user)
        props.history.push("/");
      } else {
        props.setUser(null)
        props.history.push("/Login");
      }
    });
  }, []);

  console.log("Debug",props.currentUser)
  return (
    <Switch>
      <Route path="/Login" component={Login} />
      <Route path="/Register" component={Register} />
      <Route path="/" component={App} />
    </Switch>
  );
};

const mapStateToProps = (state) =>  {
  return {
    currentUser: state.user.currentUser
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    setUser:(user) => { dispatch(setUser(user))}
  }
}
const IndexRouter = withRouter(connect(mapStateToProps,mapDispatchToProps)(Index)); 

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      
    <Router>
      <IndexRouter/>
    </Router>
    </Provider>
    
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
