import React, { useState } from 'react';
import { Button, Form, Input, Select, Space, Row } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
const { Option } = Select;
const layout = {
    labelCol: {
        span: 3,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 3,
        span: 16,
    },
};


const DoctorForm = ({ doctor }) => {
    const navigate = useNavigate()
    const params = useParams()



    const [form] = Form.useForm();

    const [method, setMethod] = useState("none")

    const onFinish = async (values) => {

        const index = doctor.schedule.findIndex(obj => {
            return `${obj.date} ${obj.time}` == values.time_slot
        })
        // console.log(doctor.schedule)
        doctor.schedule.splice(index, 1)
        // console.log(doctor.schedule)
        const dList = JSON.parse(localStorage.getItem('doctors'))
        // dList.array.forEach((e, i) => {
        //     if (e.id == doctor.id) {
        //         this[i] = doctor
        //     }
        // }, dList);
        // console.log(dList)
        for (let i = 0; i < dList.length; i++) {
            if (dList[i].id == doctor.id) {
                dList[i] = doctor
                break
            }

        }
        // console.log(dList.length)
        // console.log(dList)
        localStorage.setItem('doctors', JSON.stringify(dList))
        navigate(0);


        // if (method == "POST") {
        //     const r = await fetch('/api/doctor', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'

        //         },
        //         body: JSON.stringify({
        //             email: values.email,
        //             degree: values.degree

        //         })
        //     })
        // }

        // if (method == "PUT") {
        //     const r = await fetch('/api/doctor', {
        //         method: 'PUT',
        //         headers: {
        //             'Content-Type': 'application/json'

        //         },
        //         body: JSON.stringify({
        //             email: values.email,
        //             degree: values.degree

        //         })
        //     })
        // }

        // if (method == "DELETE") {
        //     const r = await fetch('/api/doctor', {
        //         method: 'DELETE',
        //         headers: {
        //             'Content-Type': 'application/json'

        //         },
        //         body: JSON.stringify({
        //             email: values.email
        //         })
        //     })
        // }

        // // const j = await r.json()
        // console.log(values)
    };
    const onReset = () => {
        form.resetFields();
    };
    const onFill = () => {
        form.setFieldsValue({
            note: 'Hello world!',
            gender: 'male',
        });
    };
    return (
        <Form {...layout} form={form}

            name="control-hooks" onFinish={onFinish} className='user-form'
            initialValues={
                {
                    email: 'user@gmail.com',
                    name: 'testUser',
                    surname: 'testUser',
                    phone: '87017190677'
                }
            }>
            <Form.Item
                name="name"
                label="Name"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="surname"
                label="Surname"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="email"
                label="Email"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="phone"
                label="Phone"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="time_slot"
                label="Time Slot"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Select

                    placeholder="Select a option and change input text above"
                    allowClear
                >

                    {doctor.schedule.map((d, i) => {
                        return <Option key={i} value={`${d.date} ${d.time}`}>{`${d.date} ${d.time}`}</Option>
                    })}
                </Select>
            </Form.Item>




            <Form.Item {...tailLayout}>

                <Space>
                    <Button type="primary" htmlType="submit" onClick={() => setMethod('POST')}>
                        REQUEST APPOINTMENT
                    </Button>

                    {/* <Button htmlType="button" onClick={onReset}>
                            Reset
                        </Button> */}
                </Space>

            </Form.Item>
        </Form>
    );
    return <h1>FormD</h1>
};
export default DoctorForm;