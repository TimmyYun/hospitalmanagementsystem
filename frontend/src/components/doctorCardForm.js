import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Image, Card, Button } from 'antd';


function DoctorCardForm({ details }) {
    const navigate = useNavigate();

    const specializationList = [
        'Urology',
        'Plastic Surgery',
        'Neurology',
        'Dermatology',
        'Cardiology',
        'Pediatrics',
    ]
    return (

        <Card title={`${details.name} ${details.middle_name} ${details.surname}`} bordered={false} style={{
            width: '800px',
            marginLeft: '4rem',
            marginBottom: '2rem'

        }} bodyStyle={{ padding: "0.3rem" }}>
            <div style={{
                display: 'flex',
                padding: '0.4rem',

            }}>
                <Image
                    width={120}
                    src={details.photo}
                />
                <div className='dCardDets'>
                    <div style={{
                        display: 'flex',

                    }}>
                        <p>{`Experience: ${details.experience} years`}</p>
                        <p>{`Category: ${details.category.charAt(0).toUpperCase() + details.category.slice(1)}`}</p>
                        <p>{`Degree: ${details.degree}`}</p>
                    </div>

                    <div style={{
                        display: 'flex',

                    }}>
                        <p
                        >{`Phone: ${details.phone}`}</p>
                        <p>{`Price: ${details.price} KZT`}</p>
                        <p>{`Rating: ${details.rating}/5`}</p>
                    </div>
                    <div style={{
                        display: 'flex',

                        alignItems: 'center'
                    }}>
                        <p>{`Time Slots:`}</p>
                        {details.schedule.length > 0 ? (details.schedule.map((d) =>
                            <p style={{
                                border: '1px solid black',
                                borderRadius: '5px',
                                padding: '0.1rem 0.4rem',
                                backgroundColor: '#f5f5f5'
                            }}>{`${d.date} ${d.time}`}</p>)) : <p>No Time Slots</p>}
                    </div>
                    <div>
                        <p>{`Specialization: ${details.specialization.charAt(0).toUpperCase() + details.specialization.slice(1)}`}</p>
                    </div>



                </div>

            </div>


        </Card>

    )
}

export default DoctorCardForm