import { useState } from 'react';
import './SignUpLogIn.css'

const Home = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className='home-container'>
            <div className='login-section'>
                <form className='login-form'>
                    <h2>Log in</h2>
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
                    <button type='submit'>Log In</button>
                </form>
            </div>
        </div>
    )
}

export default Home;