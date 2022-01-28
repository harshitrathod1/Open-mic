import React from 'react'

import { useDispatch,useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setAuth } from 'redux/userAuth/userAuth.actions';
import { logout } from '../../../http/index';

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

    const dispatch = useDispatch();
    const { isAuth, userDetails : user } = useSelector((state) => state.userAuth);

    async function logoutUser(){
        try {
            const {data } = await logout();
            //clear userdata and set isAuth
            dispatch(setAuth(data));     
        } catch (error) {
            console.log("Logout Error ", error);
        }
    }

    return (
        <nav className={`${styles.navbar} container`}>
            <Link style={brandStyle} to="/">
                <img src="/images/logo.png" alt="logo" />
                <span style={LogoText}>Clubhouse</span>
            </Link>
            {isAuth && (
                <div className={styles.navRight}>
                    <h3>{user?.name}</h3>
                    <Link to="/">
                        <img
                            className={styles.avatar}
                            src={
                                user.avatar
                                    ? user.avatar
                                    : '/images/monkey-avatar.png'
                            }
                            width="40"
                            height="40"
                            alt="avatar"
                        />
                    </Link>
                    <button
                        className={styles.logoutButton}
                        onClick={logoutUser}
                    >
                        <img src="/images/logout.png" alt="logout" />
                    </button>
                </div>
            )}
        </nav>
    );
    
}

export default Navigation;
// return (
//     <nav className={`${styles.navbar} container`}>
//         <Link style={brandStyle} to="/">
//             <img src={"/images/logo.png"} alt='Logo'/>
//             <span style={LogoText}>Clubhouse</span>
//         </Link>
//         {user && <div className={styles.navRight}>
//             <h3>{ user.name }</h3>
//             <Link to="/">
//                 <img className={styles.avatar} src={user.avatar} width="40" height="40" alt="Avatar"/>
//             </Link>
//             {isAuth && <button className={styles.logoutButton} onClick={logoutUser}>
//                 <img src='/images/logout.png' alt=''/>
//             </button>}
//         </div>}
        
//     </nav>
// )