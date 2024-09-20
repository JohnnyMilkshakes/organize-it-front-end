import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

const LogoutButton = ({ onLogoutClick }) => {
    return (
            <button className='logout-button' onClick={onLogoutClick}>
            <FontAwesomeIcon icon={faSignOutAlt} className='nav-icon' />
            </button>
    )
}

export default LogoutButton;