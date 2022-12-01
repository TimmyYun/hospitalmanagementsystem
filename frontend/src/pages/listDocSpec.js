import '../styles/login.css'
import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useContext, useState } from 'react';
import AuthContext from '../context/authContext';
import LayoutW from '../components/layout';
import DoctorCard from '../components/doctorCard';
import { Divider, List, Typography } from 'antd';


export default function DocsList() {


    const doctorList = JSON.parse(localStorage.getItem('doctors'))

    const params = useParams()

    const navigate = useNavigate();




    useEffect(() => {
        document.title = `${params.specialization.charAt(0).toUpperCase() + params.specialization.slice(1)}`
    }, [])

    return (
        <LayoutW>

            <div style={{ width: 800, margin: 'auto' }}>


                <Divider orientation="center">
                    <p style={{
                        textTransform: 'capitalize'
                    }}>
                        {`List of ${params.specialization.replace(/_/g, ' ')} Doctors`}</p>

                </Divider>
                <List
                    // style={{
                    //     backgroundColor: 'white'
                    // }}
                    pagination={{
                        onChange: (page) => {
                            console.log(page);
                        },
                        pageSize: 3,
                    }}

                    header={<div>Choose the Doctor</div>}
                    // footer={<div>Footer</div>}
                    bordered
                    dataSource={doctorList.filter((e) => e.specialization == params.specialization)}
                    renderItem={(item) => (
                        <List.Item >
                            <DoctorCard details={item} />
                        </List.Item>
                    )}
                />
            </div>
        </LayoutW>
    )
}