import React , {Component} from 'react'
import {Route, withRouter} from 'react-router-dom'
import './App.css';
import LoginContainer from './LoginContainer/LoginContainer'
import ChatContainer from './ChatContainer/ChatContainer'
import firebase from '../fbConfig'

class App extends Component {
  state= { 
    user: null
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged(user=>{
      if(user) {
        console.log(user)
        this.setState({user})
      }  else {
        this.props.history.push("/login")
      }
    })
  }
  render()
  {
    return (
      <div id="container" className="inner-container">
        <Route path="/login" component={LoginContainer} />
        <Route path="/" component={ChatContainer} />
      </div>
    )
  
  }


}

export default withRouter(App);
