import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header/Header'


export default class UserContainer extends Component {
    
    render() {
        console.log('in user container')
      return (
        <div id="UserContainer">
        <Header>
            <Link to="/">
                <button className="red">
                Back To Chat
                </button>
            </Link>
        </Header>
          <h1>Hello from UserContainer</h1>
        </div>
      );
    }
  }

