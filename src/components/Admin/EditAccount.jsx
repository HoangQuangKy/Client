import React from 'react'
import moment from 'moment'
import { useEffect } from 'react';
import { useParams } from 'react-router'
import { useDispatch } from 'react-redux'
import { updateUsers, getUserById } from '../../services';
import {
    Form,
    Input,
    Select,
    Button,
    DatePicker,
} from 'antd';
const { TextArea } = Input;


function EditAccount() {
    const params = useParams()
    const [form] = Form.useForm()
    const auth = [
        { label: 'Admin', value: 'admin' },
        { label: 'Customer', value: 'customer' }
    ];

    const getUser = async () => {
        try {
            const user = await getUserById(params._id)
            const userData = user.data.userfind

            form.setFieldsValue({
                username: userData.username,
                password: userData.password,
                name: userData.name,
                phonenumber: userData.phonenumber,
                dateOfBirth: moment(userData.dateOfBirth),
                auth: userData.auth
            })
            console.log();
        } catch (error) {
            console.log(error);
        }
    }
    const onFinish = async (values) => {
        // const values = form.getFieldsValue();
        const formdata = new FormData();
        formdata.append("username", values.username)
        formdata.append("password", values.password)
        formdata.append("name", values.name)
        formdata.append("phonenumber", values.phonenumber)
        formdata.append("dateOfBirth", values.dateOfBirth.format("YYYY-MM-DD"));
        formdata.append("auth", values.auth)

        try {
            const result = await updateUsers(params._id, formdata)
            console.log('new', result);
            alert('update thành công')
        } catch (error) {
            console.log(error)
        }

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        if (params._id) {
            getUser()
        }
    }, [])




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
                    <Input disabled />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name='password'>
                    <Input disabled />
                </Form.Item>
                <Form.Item
                    label="Fullname"
                    name='name'>
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Phonenumber"
                    name='phonenumber'>
                    <Input />
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

export default EditAccount
