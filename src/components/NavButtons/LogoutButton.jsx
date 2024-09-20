import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../../services/auth.js';
import {  faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

const LogoutButton = ({ setIsSignedIn }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut();
        setIsSignedIn(false);
        navigate('/');
    };


    return (
            <button className='logout-button' onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} className='nav-icon' />
            </button>
    )
}

export default LogoutButton;