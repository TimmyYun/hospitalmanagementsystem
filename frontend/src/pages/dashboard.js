import '../styles/dashboard.css'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react';
import Patient from '../components/patient';
import Doctor from '../components/doctor';

export default function Dashboard() {


    useEffect(() => {
        document.title = "Dashboard"
    }, [])

    return (
        <div className='dashboard-container'>
            <div className='register_u'><p>Register Patient</p>
            </div>
            <div className='patient-list'><p>Patient List</p>
                <Patient />
                <Patient />
                <Patient />
                <Patient />
            </div>
            <div className='doctor-list'><p>Doctor List</p>
                <Doctor />
                <Doctor />
                <Doctor />
                <Doctor />
            </div>
        </div>
    )
}