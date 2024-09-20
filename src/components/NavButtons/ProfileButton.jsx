import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { faUser } from '@fortawesome/free-solid-svg-icons'

const ProfileButton = ({ onProfileClick }) => {
    return (
            <button className='profile-button' onClick={onProfileClick}>
                <FontAwesomeIcon icon={faUser} className='nav-icon' />
            </button>
    )
}

export default ProfileButton;