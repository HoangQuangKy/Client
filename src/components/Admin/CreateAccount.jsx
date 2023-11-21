import React from 'react'
import { useDispatch } from 'react-redux'
import { createNewUser } from '../../services';

import {
    Form,
    Input,
    Select,
    Button,
    DatePicker,
} from 'antd';


function CreateAccount() {

    const [form] = Form.useForm()
    const auth = [
        { label: 'Admin', value: 'admin' },
        { label: 'Customer', value: 'customer' }
    ];

    const onFinish = async (values) => {
        const formdata = new FormData();
        formdata.append("username", values.username)
        formdata.append("password", values.password)
        formdata.append("name", values.name)
        formdata.append("phonenumber", values.phonenumber)
        formdata.append("dateOfBirth", values.dateOfBirth.format("YYYY-MM-DD")); // Adjust date format if needed
        formdata.append("auth", values.auth)

        try {
            const result = await createNewUser(formdata)
            console.log('new', result);
            alert('tạo thành công')
        } catch (error) {
            console.log(error)
        }

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    // useEffect(() => {
    //     if (params.id) {
    //         getFilm()
    //     }
    // }, [])

    const dispatch = useDispatch();


    return (
        <div className='bg-white w-full h-full ml-5 mt-5'>
            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                style={{
                    maxWidth: 600,
                }}
                name='basic'
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"

            >
                <Form.Item
                    label="Username"
                    name='username'>
                    <Input onChange={(e) => { form.setFieldValue("username", e.target.value) }} />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name='password'>
                    <Input onChange={(e) => { form.setFieldValue("password", e.target.value) }} />
                </Form.Item>
                <Form.Item
                    label="Fullname"
                    name='name'>
                    <Input onChange={(e) => { form.setFieldValue("name", e.target.value) }} />
                </Form.Item>
                <Form.Item
                    label="Phonenumber"
                    name='phonenumber'>
                    <Input onChange={(e) => { form.setFieldValue("phonenumber", e.target.value) }} />
                </Form.Item>
                <Form.Item
                    label="DateofBirth"
                    name='dateOfBirth'>
                    <DatePicker></DatePicker>
                </Form.Item>
                <Form.Item label="authorization"
                    name='auth'>
                    <Select
                        mode='single'
                        allowClear
                        style={{
                            width: '100%',
                        }}
                        placeholder="Please select"
                        options={auth}>
                    </Select>
                </Form.Item>

                <Button className='mt-5' htmlType="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default CreateAccount
