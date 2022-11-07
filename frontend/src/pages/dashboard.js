import '../styles/dashboard.css'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react';
import Patient from '../components/patient';
import Doctor from '../components/doctor';
import AuthContext from '../context/authContext';
import PatientRegister from '../components/patientRegister';

export default function Dashboard() {
    const { user, logoutUser } = useContext(AuthContext)

    useEffect(() => {
        document.title = "Dashboard"
    }, [])

    return (
        <div className='dashboard-container'>
            <div className='logout'>
                {user && <p>{user.username}</p>}
                {user &&
                    <div className="logout">
                        <p className="">
                            <Link to={"/login"} onClick={() => logoutUser()} >
                                Logout
                            </Link>
                        </p>
                    </div>
                }
                <div>
                    <PatientRegister />
                </div>
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