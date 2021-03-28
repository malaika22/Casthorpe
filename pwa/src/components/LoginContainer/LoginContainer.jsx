import React, { Component } from 'react';
import Header from '../Header/Header'

class LoginContainer extends Component {
    state = {
        email : '',
        password : ''
    }

    inputHandler = (e) => {
        this.setState({
            [e.target.name] : e.target.value 
        })
    }

    submitHandler = (e) =>{
        e.preventDefault()
        console.log(this.state)
    }
  render(){
        return(
            <div id="LoginContainer" className="inner-container">
                <Header />
                <form>
                    <p>Sign in or sign up by entering your email and password</p>
                    <input 
                    type='text' 
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
                    <button className="red light" type="submit" onClick={this.submitHandler}>Login</button>
                </form>
            </div>
        )
  }
}

export default LoginContainer;