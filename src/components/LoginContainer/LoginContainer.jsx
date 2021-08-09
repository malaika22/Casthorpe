import React, { Component } from 'react';
import Header from '../Header/Header'
// import 'firebase/auth'
import firebase from '../../fbConfig'

// let firebase = window.firebase
// console.log(firebase.default.auth)

class LoginContainer extends Component {
    state = {
        email : '',
        password : '',
        error: ''
    }
    inputHandler = (e) => {
        this.setState({
            [e.target.name] : e.target.value 
        })
    }

    onLogin() {
        this.props.history.push("/")
    }

    signup() {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.state.email, this.state.password)
          .then(res => {
            console.log(res);
            this.onLogin()
          })
          .catch(error => {
            console.log(error);
            this.setState({ error: 'Error signing up.' });
          });
      }

    login  = () =>{
        console.log(window.firebase.auth())
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(res => 
        {
            this.onLogin()
        })
        .catch(error => {
            console.log(error)
            if(error.code==="auth/user-not-found"){
                    this.signup()
            } else {
                console.log("error logging in")
            }
        })

    }




    submitHandler = (e) =>{
        e.preventDefault()
        if(this.state.email && this.state.password){
            this.login()
        } else {
            this.setState({error: 'Please fill in both fields.'})
        }
        console.log(this.state)
    }
  render(){
        return(
            <div id="LoginContainer" className="inner-container">
                <Header />
                <form>
                    <p>Sign in or sign up by entering your email and password</p>
                    <input 
                    type='email' 
                    placeholder="Your email" 
                    value={this.state.email}
                    onChange={this.inputHandler}
                    name="email"/>

                    <input 
                    type="password" 
                    placeholder="Your password" 
                    onChange={this.inputHandler}
                    name="password"
                    value={this.state.password}/>
                    <p className="error">{this.state.error}</p>

                    <button className="red light" type="submit" onClick={this.submitHandler}>Login</button>
                </form>
            </div>
        )
  }
}

export default LoginContainer;