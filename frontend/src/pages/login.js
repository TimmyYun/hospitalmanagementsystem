import '../styles/login.css'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react';
import AuthContext from '../context/authContext';


export default function LoginPage() {
    let { loginUser } = useContext(AuthContext)
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const isInvalid = password === '' || username === '';

    const handleLogin = async (event) => {
        event.preventDefault();
        await loginUser(username, password)
        setUsername("");
        setPassword("");

        navigate('/appointment')
    };



    useEffect(() => {
        document.title = "Login"
    }, [])

    return (
        <div className="login-container">

            <div className="form-box">



                <form onSubmit={handleLogin} method="POST">
                    <input
                        aria-label="Enter your username"
                        type="text"
                        placeholder="Username"
                        className=""
                        onChange={({ target }) => setUsername(target.value)}
                        value={username}
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
            {/* <div className="signup">
                <p className="">
                    Don't have an account?{` `}
                    <Link to={"/sign-up"}  >
                        Sign up
                    </Link>
                </p>
            </div> */}
        </div>
    )
}