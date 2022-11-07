import { React, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const DoctorRegister = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [email, setEmail] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [status, setStatus] = useState('A')
    const [middlename, setMiddlename] = useState('')
    const [iin, setIin] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [address, setAddress] = useState('')
    const [maritalStatus, setMaritalStatus] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [department, setDepartment] = useState('')
    const [specialization, setSpecialization] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')
    const [experience, setExperience] = useState('')
    const [photo, setPhoto] = useState('')
    const [degree, setDegree] = useState('')
    const [rating, setRating] = useState('')
    const [homepage, setHomepage] = useState('')

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
                "groups": [5],
                "middlename": middlename,
                "dateOfBirth": birthDate,
                "iin": iin,
                "phoneNumber": phoneNumber,
                "address": address,
                "maritalStatus": maritalStatus,
                "status": status,
                "type": "D",
                "department": department,
                "specializationId": specialization,
                "experience": experience,
                "photo": photo,
                "category": category,
                "price": price,
                "degree": degree,
                "rating": rating,
                "homepage": homepage

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



                <form onSubmit={handleRegister} method="POST">
                    <input
                        type="text"
                        placeholder="Username"
                        className=""
                        onChange={({ target }) => setUsername(target.value)}
                        value={username}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className=""

                        onChange={({ target }) => setPassword(target.value)}
                        value={password}
                    />
                    <input
                        type="password"
                        placeholder="Password2"
                        className=""

                        onChange={({ target }) => setPassword2(target.value)}
                        value={password2}
                    />
                    <input
                        type="text"
                        placeholder="email"
                        className=""
                        onChange={({ target }) => setEmail(target.value)}
                        value={email}
                    />
                    <input
                        type="text"
                        placeholder="First Name"
                        className=""

                        onChange={({ target }) => setFirstname(target.value)}
                        value={firstname}
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        className=""

                        onChange={({ target }) => setLastname(target.value)}
                        value={lastname}
                    />
                    <input
                        type="text"
                        placeholder="Middle Name"
                        className=""
                        onChange={({ target }) => setMiddlename(target.value)}
                        value={middlename}
                    />
                    <input
                        type="date"
                        placeholder="Date Of Birth"
                        className=""

                        onChange={({ target }) => setBirthDate(target.value)}
                        value={birthDate}
                    />
                    <input
                        type="text"
                        placeholder="IIN"
                        className=""

                        onChange={({ target }) => setIin(target.value)}
                        value={iin}
                    />
                    <input
                        type="text"
                        placeholder="Phone Number"
                        className=""
                        onChange={({ target }) => setPhoneNumber(target.value)}
                        value={phoneNumber}
                    />
                    <input
                        type="text"
                        placeholder="Address"
                        className=""

                        onChange={({ target }) => setAddress(target.value)}
                        value={address}
                    />
                    <input
                        type="text"
                        placeholder="Marital Status"
                        className=""
                        onChange={({ target }) => setMaritalStatus(target.value)}
                        value={maritalStatus}
                    />
                    <input
                        type="text"
                        placeholder="Department"
                        className=""
                        onChange={({ target }) => setDepartment(target.value)}
                        value={department}
                    />
                    <input
                        type="text"
                        placeholder="Specialization"
                        className=""

                        onChange={({ target }) => setSpecialization(target.value)}
                        value={specialization}
                    />
                    <input
                        type="text"
                        placeholder="Experience"
                        className=""
                        onChange={({ target }) => setExperience(target.value)}
                        value={experience}
                    />
                    <input
                        type="text"
                        placeholder="Photo"
                        className=""
                        onChange={({ target }) => setPhoto(target.value)}
                        value={photo}
                    />
                    <input
                        type="text"
                        placeholder="Category"
                        className=""

                        onChange={({ target }) => setCategory(target.value)}
                        value={category}
                    />
                    <input
                        type="text"
                        placeholder="Degree"
                        className=""
                        onChange={({ target }) => setDegree(target.value)}
                        value={degree}
                    />
                    <input
                        type="text"
                        placeholder="Price"
                        className=""
                        onChange={({ target }) => setPrice(target.value)}
                        value={price}
                    />
                    <input
                        type="text"
                        placeholder="Rating"
                        className=""

                        onChange={({ target }) => setRating(target.value)}
                        value={rating}
                    />
                    <input
                        type="text"
                        placeholder="Homepage"
                        className=""
                        onChange={({ target }) => setHomepage(target.value)}
                        value={homepage}
                    />
                    <p>Status</p>
                    <select value={status} onChange={({ target }) => setStatus(target.value)}>
                        <option value="A">Active</option>
                        <option value="I">In Reserve</option>
                        <option value="R">Retired</option>

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

export default DoctorRegister