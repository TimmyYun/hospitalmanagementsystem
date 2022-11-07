import { React, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const PatientRegister = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [email, setEmail] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [groups, setGroups] = useState('patient')
    const [middlename, setMiddlename] = useState('')
    const [iin, setIin] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [address, setAddress] = useState('')
    const [maritalStatus, setMaritalStatus] = useState('')
    const [bloodGroup, setBloodGroup] = useState('')
    const [emergencyPhone, setEmergencyPhone] = useState('')
    const [birthDate, setBirthDate] = useState('')

    const isInvalid = password === '' || username === '';

    const handleRegister = async (event) => {
        event.preventDefault();
        console.log('Submitted form')
        let response = await fetch("http://localhost:8000/register/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": username,
                "password": password,
                "password2": password2,
                "email": email,
                "first_name": firstname,
                "last_name": lastname,
                "groups": [2],
                "middlename": middlename,
                "dateOfBirth": birthDate,
                "iin": iin,
                "phoneNumber": phoneNumber,
                "address": address,
                "maritalStatus": maritalStatus,
                "bloodGroup": bloodGroup,
                "emergencyPhoneNumber": emergencyPhone,

            })
        })
        let data = await response.json()

        if (response.status === 201) {
            console.log(data)
            navigate('/')
        } else {
            console.log(data)
            alert("Something went wrong")
        }


        navigate('/')
    };

    return (
        <div className="register-container">

            <div className="register-form-box">

                <h2>Register a Patient</h2>

                <form onSubmit={handleRegister} method="POST">
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
                    <input
                        aria-label="Enter your password"
                        type="password"
                        placeholder="Password2"
                        className=""

                        onChange={({ target }) => setPassword2(target.value)}
                        value={password2}
                    />
                    <input
                        aria-label="Enter your username"
                        type="text"
                        placeholder="email"
                        className=""
                        onChange={({ target }) => setEmail(target.value)}
                        value={email}
                    />
                    <input
                        aria-label="Enter your password"
                        type="text"
                        placeholder="First Name"
                        className=""

                        onChange={({ target }) => setFirstname(target.value)}
                        value={firstname}
                    />
                    <input
                        aria-label="Enter your password"
                        type="text"
                        placeholder="Last Name"
                        className=""

                        onChange={({ target }) => setLastname(target.value)}
                        value={lastname}
                    />
                    <input
                        aria-label="Enter your username"
                        type="text"
                        placeholder="Middle Name"
                        className=""
                        onChange={({ target }) => setMiddlename(target.value)}
                        value={middlename}
                    />
                    <input
                        aria-label="Enter your password"
                        type="date"
                        placeholder="Date Of Birth"
                        className=""

                        onChange={({ target }) => setBirthDate(target.value)}
                        value={birthDate}
                    />
                    <input
                        aria-label="Enter your password"
                        type="text"
                        placeholder="IIN"
                        className=""

                        onChange={({ target }) => setIin(target.value)}
                        value={iin}
                    />
                    <input
                        aria-label="Enter your username"
                        type="text"
                        placeholder="Phone Number"
                        className=""
                        onChange={({ target }) => setPhoneNumber(target.value)}
                        value={phoneNumber}
                    />
                    <input
                        aria-label="Enter your password"
                        type="text"
                        placeholder="Emergency Phone Number"
                        className=""

                        onChange={({ target }) => setEmergencyPhone(target.value)}
                        value={emergencyPhone}
                    />
                    <input
                        aria-label="Enter your password"
                        type="text"
                        placeholder="Address"
                        className=""

                        onChange={({ target }) => setAddress(target.value)}
                        value={address}
                    />
                    <input
                        aria-label="Enter your username"
                        type="text"
                        placeholder="Marital Status"
                        className=""
                        onChange={({ target }) => setMaritalStatus(target.value)}
                        value={maritalStatus}
                    />
                    <input
                        aria-label="Enter your password"
                        type="text"
                        placeholder="Blood Group"
                        className=""

                        onChange={({ target }) => setBloodGroup(target.value)}
                        value={bloodGroup}
                    />
                    <p>User type</p>
                    <select value={groups} onChange={({ target }) => setGroups(target.value)}>
                        <option value="patient">Patient</option>
                        <option value="doctor">Doctor</option>

                    </select>
                    <br></br>


                    <button
                        disabled={isInvalid}
                        type="submit"

                    >
                        Register
                    </button>
                </form>
            </div>

        </div>
    )
}

export default PatientRegister