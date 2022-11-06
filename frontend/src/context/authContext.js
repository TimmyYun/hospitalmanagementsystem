import { createContext, useState } from "react";
import jwt_decode from "jwt-decode"

const AuthContext = createContext(null);

export default AuthContext;

export const AuthProvider = ({ children }) => {

    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    console.log(user, 'ahahahhaha')


    let loginUser = async (email, password) => {
        console.log(email, password)
        console.log('Submitted form')
        console.log(JSON.stringify({ username: email, password: password }))
        let response = await fetch("http://127.0.0.1:8000/login/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: email, password: password })
        })
        let data = await response.json()
        console.log("data: ", data)
        if (response.status === 200) {
            console.log('ahahahah')
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        } else {
            alert("Something went wrong")
        }
        console.log(user)
    }



    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
    }

    let contextData = {
        user: user,
        loginUser: loginUser,
        logoutUser: logoutUser
    }
    return (
        <AuthContext.Provider value={contextData} >
            {children}
        </AuthContext.Provider>
    )
}