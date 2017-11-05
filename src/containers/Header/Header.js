import React, { Component } from 'react';

import './Header.scss';
import logo from './logo.png';

class Header extends Component {
    render() {
        return (
            <div className="header">
                <div className="container">
                    {/*TODO: uncomment*/}
                    {/*<img src={ logo } alt=""/>*/}
                    {/*<span className="header__title">TransferGo Team!</span>*/}
                </div>
            </div>
        )
    }
}

export default Header;
