import React from 'react';
import config from '../config.json'

export default function Header(props) {
    return (
        <nav className="navbar navbar-expand-xs navbar-expand-sm navbar-expand-md navbar-light bg-light">
            <a className="navbar-brand text-white" href="#">
                <i className="fas fa-clipboard-check" style={{fontSize: '26px', marginRight: '10px'}}></i>
                {config.appTitle}
            </a>
        </nav>
    );
}