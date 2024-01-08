import React from "react";
import './Header.css';

class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <div className="dropdown">
                    <button className="dropbtn">Account</button>
                    <div className="dropdown-content">
                        <a href="#profile">Profile</a>
                        <a href="#settings">Settings</a>
                        <a href="#logout">Logout</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;