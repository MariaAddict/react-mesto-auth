import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header(props) {
    return (
        <header className="header">
            <img src={logo} alt="Логотип Mesto" className="header__logo" />
            <Link to={props.link.url} className="header__link">{props.link.name}</Link>
        </header>
    );
}

export default Header;