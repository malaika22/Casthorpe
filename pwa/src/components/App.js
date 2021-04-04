import React , {Component} from 'react'
import {Route, withRouter} from 'react-router-dom'
import './App.css';
import LoginContainer from './LoginContainer/LoginContainer'
import ChatContainer from './ChatContainer/ChatContainer'
import UserContainer from './UserContainer/UserContainer'
import firebase from '../fbConfig'

class App extends Component {
  state= { 
    user: null,
    messages: [],
    messagesLoaded :false
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

    firebase.database().ref('/messages').on('value' , snapshot => {
      this.onMessage(snapshot)
      console.log(snapshot.val())
      if (!this.state.messagesLoaded) {
        this.setState({ messagesLoaded: true });
      }
    })

    // firebase.database().ref('/messages/-MXNEkdV3QGwzTgU7XpO/msg').set('checking something')
  }
  handleSubmitMessage = msg => {
    // Send to database
    const data = {
      msg,
      author: this.state.user.email,
      user_id : this.state.user.uid,
      timeStamp : Date.now()
    }
    firebase
    .database()
    .ref('/messages')
    .push(data)
  };

    onMessage = snapshot =>{
        const messages = Object.keys(snapshot.val()).map(key=>{
          const msg = snapshot.val()[key];
          msg.id = key
          return msg
        })

        this.setState({messages})
    }


  render()
  {
    return (
      <div id="container" className="inner-container">
        <Route path="/login" component={LoginContainer} />
        <Route exact path="/" render={()=> <ChatContainer 
        onSubmit={this.handleSubmitMessage} 
        messages={this.state.messages} 
        user={this.state.user}
        messagesLoaded={this.state.messagesLoaded}
        />} />
        <Route path="/users/:id" component={UserContainer} />
      </div>
    )
  
  }


}

export default withRouter(App);
