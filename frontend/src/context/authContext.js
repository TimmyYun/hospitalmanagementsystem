import { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode"

const AuthContext = createContext(null);

export default AuthContext;

export const AuthProvider = ({ children }) => {

    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    const [loading, setLoading] = useState(true)


    let loginUser = async (email, password) => {
        let response = await fetch("http://127.0.0.1:8000/login/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: email, password: password })
        })
        let data = await response.json()

        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        } else {
            alert("Something went wrong")
        }

    }

    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
    }

    let updateToken = async () => {
        console.log('token update')
        let response = await fetch("http://127.0.0.1:8000/login/refresh/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ refresh: authTokens?.refresh })
        })
        let data = await response.json()

        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        } else {
            logoutUser()
        }
        if (loading) {
            setLoading(false)
        }
    }



    let contextData = {
        user: user,
        loginUser: loginUser,
        logoutUser: logoutUser
    }

    useEffect(() => {
        if (loading) {
            updateToken()
        }


        let interval = setInterval(() => {
            if (authTokens) {
                updateToken()
            }
        }, 1000 * 4 * 60);

        return () => clearInterval(interval)

    }, [authTokens, loading])


    return (
        <AuthContext.Provider value={contextData} >
            {loading ? null : children}
        </AuthContext.Provider>
    )
}