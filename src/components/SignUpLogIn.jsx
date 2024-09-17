import { useState } from 'react';
import './SignUpLogIn.css'

const Home = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const signUpFrom = () => {
        setIsSignUp(!isSignUp);
    }

    return (
        <div className='home-container'>
            <div className='login-section'>
                <form className='login-form'>
                    <h2>{isSignUp ? 'Sign Up' : 'Log In'}</h2>
                    <div>
                        <input
                            type="email"
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type='password'
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {isSignUp && (
                        <div>
                            <input
                                type='password'
                                placeholder='Confirm Password'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    )}
                    <button type='submit'>{isSignUp ? 'Sign Up' : 'Log In'}</button>

                    <p onClick={signUpFrom} className='link'>
                        {isSignUp ? 'Already have an account? Log In' : 'Do not have an account? Sign Up'}
                    </p>
                </form>
            </div>
            <div className='welcome-section'>
                <h1>Welcome!</h1>
                <p>
                    wjhefhsudfhaisfhisd.
                </p>
            </div>
        </div>
    )
}

export default Home;