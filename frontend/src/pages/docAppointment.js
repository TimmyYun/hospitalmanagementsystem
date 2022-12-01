import '../styles/login.css'
import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useContext, useState } from 'react';
import AuthContext from '../context/authContext';
import LayoutW from '../components/layout';
import { Divider, List, Typography } from 'antd';

import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import DoctorForm from '../components/doctorForm';
import DoctorCardForm from '../components/doctorCardForm';



export default function DocAppointment() {
    const doctorList = JSON.parse(localStorage.getItem('doctors'))


    const params = useParams()

    const doctor = doctorList.filter((e) => e.id == params.id)[0]

    const specializationList = [
        'Urology',
        'Plastic Surgery',
        'Neurology',
        'Dermatology',
        'Cardiology',
        'Pediatrics',
    ]

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
        },
        {
            id: 5,
            name: 'Neurology',
            type: 'Specialization'
        },
        {
            id: 6,
            name: 'Dermatology',
            type: 'Specialization'
        },
        {
            id: 7,
            name: 'Cardiology',
            type: 'Specialization'
        },
        {
            id: 8,
            name: 'Pediatrics',
            type: 'Specialization'
        },
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
        navigate(`/doctors/${item.name.toLowerCase().replace(/\s/g, '_')}`)
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
        document.title = 'Doctor Appointment'
    }, [])

    return (
        <LayoutW>
            <h1 style={{ marginLeft: '4rem' }}>Confirm the Appointment</h1>
            <DoctorCardForm details={doctor} />
            <DoctorForm doctor={doctor} />

        </LayoutW>
    )
}