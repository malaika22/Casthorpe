import React from 'react';
import logo from '../../assests/images/icon.png'

const Header = (props) =>{
    return (
        <div id="Header" >
        <img src={logo} alt="logo"/>
            <h1>Chatastrophe</h1>
            {props.children}
        </div>
    )
}

export default Header;