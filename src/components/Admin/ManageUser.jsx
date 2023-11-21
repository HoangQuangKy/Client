import { useEffect, useState } from 'react'
import { Space, Table, Tag } from 'antd';
import { getPagingUser } from '../../services';
import { Pagination } from 'antd';
import { Button } from 'antd';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
function ManageUser() {
    const [userEdit, setUserEdit] = useState(null)
    const navigate = useNavigate()

    const handleEditClick = (record) => {
        setUserEdit(record);
    };

    useEffect(() => {
        if (userEdit) {
            navigate(`/admin/update_user/${userEdit._id}`);
        }
    }, [userEdit]);


    const [pageSize, setPageSize] = useState(3)
    const [pageIndex, setPageIndex] = useState(1)
    const [userPaging, setUserPaging] = useState([])
    const [count, setCount] = useState(0)

    const getAllUser = async () => {
        try {
            const result = await getPagingUser(pageSize, pageIndex)
            console.log('result', result);
            setUserPaging(result.data.userAll)
            setCount(result.data.count)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getAllUser();
    }, [pageIndex, pageSize]);
    const columns = [
        {
            title: 'Username',
            dataIndex: 'Username',
            key: 'Username',
            render: (_, text) => <a>{text.username}</a>,
        },
        {
            title: 'UserID',
            dataIndex: 'id',
            key: 'id',
            render: (_, text) => <Tag color='green' typeof='password'>{text._id}</Tag>,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (_, text) => <a>{text.name}</a>
        },
        {
            title: 'phonenumber',
            dataIndex: 'phonenumber',
            key: 'phonenumber',
            render: (_, record) => <a>{`0${record.phonenumber}`}</a>,

        },
        {
            title: 'Date of Birth',
            dataIndex: 'dateOfBirth',
            key: 'dateOfBirth',
            render: (_, record) => {
                const dateOfBirth = new Date(record.dateOfBirth);
                const formattedDate = dateOfBirth.toLocaleDateString();
                return <span>{formattedDate}</span>
            }
        },
        {
            title: 'Authorization',
            dataIndex: 'Authorization',
            key: 'Authorization',
            render: (_, record) => <a>{record.auth}</a>,

        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => handleEditClick(record)}>Edit</Button>
                    <Button danger>Delete</Button>
                </Space>
            ),
        },
    ];
    return (
        <div className='w-full min-h-full pt-5 pl-2'>
            <Link to={'/admin/create_film'}>
                <Button
                    className=' py-1 mb-5 bg-sky-500 border-sky-500	text-white'
                    type='primary'>Thêm phim mới
                </Button>
            </Link>
            <Table
                dataSource={userPaging}
                columns={columns}
                pagination={false} />
            <Pagination
                className='pt-5'
                current={pageIndex}
                pageSize={pageSize}
                total={count}
                showSizeChanger
                pageSizeOptions={[3, 5, 8]}
                onChange={(page, pageSize) => {
                    setPageIndex(page)
                    setPageSize(pageSize)
                }}>

            </Pagination>
        </div>
    )
}

export default ManageUser
