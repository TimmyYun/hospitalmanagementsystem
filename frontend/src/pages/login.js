import '../styles/login.css'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react';


export default function LoginPage() {
    const [emailAddress, setEmailAddress] = useState('');
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const isInvalid = password === '' || emailAddress === '';

    const handleLogin = async (event) => {
        event.preventDefault();
        setEmailAddress("");
            setPassword("");
        console.log('LOGIn')
        navigate('/')
    };



    useEffect(() => {
        document.title = "Zamn - Login"
    }, [])

    return (
        <div className="login-container">

        <div className="form-box">
    
    
        
            <form onSubmit={handleLogin} method="POST">
                <input
                    aria-label="Enter your email address"
                    type="text"
                    placeholder="Email address"
                    className=""
                    onChange={({ target }) => setEmailAddress(target.value)}
                    value={emailAddress}
                />
                <input
                    aria-label="Enter your password"
                    type="password"
                    placeholder="Password"
                    className=""
    
                    onChange={({ target }) => setPassword(target.value)}
                    value={password}
                />
    
                    <button
                        disabled={isInvalid}
                        type="submit"
                     
                    >
                        Login
                    </button>
            </form>
        </div>
        <div className="signup">
            <p className="">
                Don't have an account?{` `}
                <Link to={"/sign-up"} className="font-bold text-purple-medium">
                    Sign up
                </Link>
            </p>
        </div>
        </div>
    )
}