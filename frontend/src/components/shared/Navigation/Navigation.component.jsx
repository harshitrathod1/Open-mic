import React from 'react'

import { Link } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = () => {

    //Inline CSS
    const brandStyle = {
        color : '#fff',
        textDecoration : 'none',
        fontWeight :'bold',
        fontSize : '22px',
        display : 'flex',
        alignItems : 'center',        
    }

    const LogoText = {
        marginLeft : '10px'
    }

    return (
        <nav className={`${styles.navbar} container`}>
            <Link style={brandStyle} to="/">
                <img src={"/images/logo.png"} alt='Logo'/>
                <span style={LogoText}>Clubhouse</span>
            </Link>
        </nav>
    )
}

export default Navigation;
