import '../styles/login.css'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react';
import AuthContext from '../context/authContext';
import LayoutW from '../components/layout';

import { ReactSearchAutocomplete } from 'react-search-autocomplete'

export default function AppointmentPage() {


    const items = [
        {
            id: 0,
            name: 'Ear Cleaning',
            type: 'Service'
        },
        {
            id: 1,
            name: 'Plastic Surgery',
            type: 'Specialization'
        },
        {
            id: 2,
            name: 'Urology',
            type: 'Specialization'
        },
        {
            id: 3,
            name: 'Unaspekov Timur',
            type: 'Doctor'
        },
        {
            id: 4,
            name: 'Timofei Tumerov',
            type: 'Doctor'
        }
    ]
    const handleOnSearch = (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        console.log(string, results)
    }

    const handleOnHover = (result) => {
        // the item hovered
        console.log(result)
    }

    const handleOnSelect = (item) => {
        // the item selected
        console.log(item)
        navigate(`/${item.name}`)
    }

    const handleOnFocus = () => {
        console.log('Focused')
    }

    const fuseOpt = {

        shouldSort: true,
        threshold: 0.3,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
            "name",
        ]
    }

    const formatResult = (item) => {
        return (
            <>
                {/* <span style={{ display: 'block', textAlign: 'left' }}>{item.type}</span> */}
                <span style={{ display: 'block', textAlign: 'left' }}>
                    {item.type === "Doctor" ? "Dr." :
                        item.type === "Service" ? "Service: " : "Specialization: "} {item.name}
                </span>
            </>
        )
    }


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

        navigate('/')
    };



    useEffect(() => {
        document.title = "Login"
    }, [])

    return (
        <LayoutW>
            <div style={{ width: 400 }}>
                <ReactSearchAutocomplete
                    fuseOptions={fuseOpt}
                    items={items}
                    onSearch={handleOnSearch}
                    onHover={handleOnHover}
                    onSelect={handleOnSelect}
                    onFocus={handleOnFocus}
                    autoFocus
                    formatResult={formatResult}
                />
            </div>
        </LayoutW>
    )
}