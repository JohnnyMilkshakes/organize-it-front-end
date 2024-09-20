import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { faUser } from '@fortawesome/free-solid-svg-icons'

const ProfileButton = () => {
    const navigate = useNavigate();

    const handleProfileClick = () => {
        navigate('/profile')
    }
    
    return (
            <button className='profile-button' onClick={handleProfileClick}>
                <FontAwesomeIcon icon={faUser} className='nav-icon' />
            </button>
    )
}

export default ProfileButton;