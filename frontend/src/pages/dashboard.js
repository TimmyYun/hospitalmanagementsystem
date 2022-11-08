import '../styles/dashboard.css'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react';
import Patient from '../components/patient';
import Doctor from '../components/doctor';
import AuthContext from '../context/authContext';
import PatientRegister from '../components/patientRegister';
import DoctorRegister from '../components/doctorRegister';

export default function Dashboard() {
    const { user, logoutUser } = useContext(AuthContext)
    const [patients, setPatients] = useState([])
    const [doctors, setDoctors] = useState([])


    useEffect(() => {
        let getPatients = async () => {
            let response = await fetch("http://127.0.0.1:8000/client/", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            let data = await response.json()

            if (response.status === 200) {
                console.log(data)
                setPatients([data])
            } else {
                alert("Something went wrong")
            }

        }

        let getDoctors = async () => {
            let response = await fetch("http://127.0.0.1:8000/employee/", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            let data = await response.json()

            if (response.status === 200) {
                console.log(data)
                setDoctors([data])
            } else {
                alert("Something went wrong")
            }

        }

        document.title = "Dashboard"
        getDoctors()
        getPatients()
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
                <div className='regforms'>
                    <PatientRegister />
                    <DoctorRegister />
                </div>
            </div>
            <div className='patient-list'><p>Patient List</p>
                {patients !== [] && patients.map((p) => {
                    return <Patient key={p.id} patient={p} />
                })}

            </div>
            <div className='doctor-list'><p>Doctor List</p>
                {doctors && doctors.map((p) => {
                    return <Doctor key={p.id} doctor={p} />
                })}
            </div>
        </div>
    )
}