import '../styles/login.css'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react';
import AuthContext from '../context/authContext';
import LayoutW from '../components/layout';
import { Divider, List, Typography } from 'antd';

import { ReactSearchAutocomplete } from 'react-search-autocomplete'

export default function AppointmentPage() {

    const doctorList = [
        {
            id: 1,
            name: 'Timur',
            middle_name: '',
            surname: 'Unaspekov',
            phone: '87017490273',
            specialization: 'neurology',
            department: 'neurosurgery',
            experience: 24,
            photo: 'https://media.istockphoto.com/id/1150502263/vector/doctor-icon-or-avatar-physician-with-stethoscope-medicine-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=bADu0CBwP4bDQrgIfRVjZ90RwKzTD5-MYqlFFnLD_c0=',
            category: 'highest',
            price: 15000,
            schedule: [
                {
                    date: 'Dec 12',
                    time: '14:00 - 15:00'
                },
                {
                    date: 'Dec 12',
                    time: '16:00 - 17:00'
                },
                {
                    date: 'Dec 13',
                    time: '16:30 - 17:00'
                },
            ],
            degree: 'MD',
            rating: 5.0
        },
        {
            id: 2,
            name: 'Vlad',
            middle_name: '',
            surname: 'Vladov',
            phone: '87033490273',
            specialization: 'neurology',
            department: 'neurosurgery',
            experience: 18,
            photo: 'https://media.istockphoto.com/id/1150502263/vector/doctor-icon-or-avatar-physician-with-stethoscope-medicine-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=bADu0CBwP4bDQrgIfRVjZ90RwKzTD5-MYqlFFnLD_c0=',
            category: 'highest',
            price: 14000,
            schedule: [
                {
                    date: 'Dec 12',
                    time: '14:00 - 15:00'
                },
                {
                    date: 'Dec 12',
                    time: '16:00 - 17:00'
                },
                {
                    date: 'Dec 13',
                    time: '16:30 - 17:00'
                },
            ],
            degree: 'MD',
            rating: 4.8
        },
        {
            id: 3,
            name: 'Erzhan',
            middle_name: '',
            surname: 'Kalimov',
            phone: '87057490273',
            specialization: 'neurology',
            department: 'neurosurgery',
            experience: 9,
            photo: 'https://media.istockphoto.com/id/1150502263/vector/doctor-icon-or-avatar-physician-with-stethoscope-medicine-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=bADu0CBwP4bDQrgIfRVjZ90RwKzTD5-MYqlFFnLD_c0=',
            category: 'second',
            price: 9000,
            schedule: [
                {
                    date: 'Dec 12',
                    time: '14:00 - 15:00'
                },
                {
                    date: 'Dec 12',
                    time: '16:00 - 17:00'
                },
                {
                    date: 'Dec 13',
                    time: '16:30 - 17:00'
                },
            ],
            degree: 'MD',
            rating: 4.2
        },
        {
            id: 4,
            name: 'Nurbek',
            middle_name: 'Serzhanovich',
            surname: 'Aidosov',
            phone: '87017493273',
            specialization: 'neurology',
            department: 'neurosurgery',
            experience: 33,
            photo: 'https://media.istockphoto.com/id/1150502263/vector/doctor-icon-or-avatar-physician-with-stethoscope-medicine-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=bADu0CBwP4bDQrgIfRVjZ90RwKzTD5-MYqlFFnLD_c0=',
            category: 'highest',
            price: 20000,
            schedule: [
                {
                    date: 'Dec 12',
                    time: '14:00 - 15:00'
                },
                {
                    date: 'Dec 12',
                    time: '16:00 - 17:00'
                },
                {
                    date: 'Dec 13',
                    time: '16:30 - 17:00'
                },
            ],
            degree: 'MD',
            rating: 4.9
        },

        {
            id: 5,
            name: 'Zhandos',
            middle_name: '',
            surname: 'Kalimov',
            phone: '87017493273',
            specialization: 'cardiology',
            department: 'cardiology',
            experience: 11,
            photo: 'https://media.istockphoto.com/id/1150502263/vector/doctor-icon-or-avatar-physician-with-stethoscope-medicine-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=bADu0CBwP4bDQrgIfRVjZ90RwKzTD5-MYqlFFnLD_c0=',
            category: 'second',
            price: 10000,
            schedule: [
                {
                    date: 'Dec 12',
                    time: '14:00 - 15:00'
                },
                {
                    date: 'Dec 12',
                    time: '16:00 - 17:00'
                },
                {
                    date: 'Dec 13',
                    time: '16:30 - 17:00'
                },
            ],
            degree: 'MD',
            rating: 4.5
        },
    ]

    const specializationList = [
        'Urology',
        'Plastic Surgery',
        'Neurology',
        'Dermatology',
        'Cardiology',
        'Pediatrics',
    ]

    const serviceList = [
        "Ear Cleaning",
        "Botox",
        "MRI Scanning"
    ]

    const specializationItems = specializationList.map((s) => {
        return {

            name: s,
            type: 'Specialization'
        }
    })

    const serviceItems = serviceList.map((s) => {
        return {

            name: s,
            type: 'Service'
        }
    })

    const dItems = doctorList.map((d) => {
        return {
            docID: d.id,
            name: `${d.name} ${d.middle_name} ${d.surname}`,
            type: 'Doctor'
        }
    })

    const items = specializationItems.concat(serviceItems).concat(dItems).map((e, i) => {
        return {
            id: i,
            ...e
        }
    })



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
        if (item.type === "Specialization") {
            navigate(`/doctors/${item.name.toLowerCase().replace(/\s/g, '_')}`)
        }
        if (item.type === "Service") {
            navigate(`/services/${item.name.toLowerCase().replace(/\s/g, '_')}`)
        }
        if (item.type === "Doctor") {
            navigate(`/appointment/d/${item.docID}`)
        }

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
        document.title = "Make an Appointment"
        // localStorage.setItem("doctors", JSON.stringify(doctorList))
    }, [])

    return (
        <LayoutW>

            <div style={{ width: 400, margin: 'auto' }}>
                <h3 style={{ display: 'flex', justifyContent: 'center' }}>Search: Doctors / Specializations / Services</h3>
                <ReactSearchAutocomplete
                    styling={{ zIndex: "9999" }}
                    fuseOptions={fuseOpt}
                    items={items}
                    onSearch={handleOnSearch}
                    onHover={handleOnHover}
                    onSelect={handleOnSelect}
                    onFocus={handleOnFocus}
                    autoFocus
                    formatResult={formatResult}
                />
                <Divider orientation="center">List Of Specializations</Divider>
                <List
                    header={<div>Select the specialization of the Doctor you Need</div>}
                    // footer={<div>Footer</div>}
                    bordered
                    dataSource={specializationList}
                    renderItem={(item) => (
                        <List.Item>
                            <Link to={`/doctors/${item.toLowerCase().replace(/\s/g, '_')}`}>{item} </Link>
                        </List.Item>
                    )}
                />
            </div>

        </LayoutW>
    )
}