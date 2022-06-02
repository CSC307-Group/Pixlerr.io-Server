import React from 'react';
import { fallDown as Menu } from 'react-burger-menu';

import './styles/Sidebar.scss';


export default props => {
    if (true) {
        return (
            <Menu>
                <a className="menu-item" href="/">
                    Home
                </a>
                <a className="menu-item" href="/myaccount">
                    Account
                </a>
                <a className="menu-item" href="/About">
                    About
                </a>
            </Menu>
        );
    }


};
