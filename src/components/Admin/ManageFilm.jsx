import React, { useEffect, useState } from 'react'
import { Space, Table, Tag } from 'antd';
import { deleteFilm, getPagingFilms } from '../../services';
import { Pagination } from 'antd';
import { Button } from 'antd';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
function MainData() {
    const [filmEdit, setFilmEdit] = useState(null)
    const navigate = useNavigate()

    const handleEditClick = (record) => {
        setFilmEdit(record);
    };
    const handleDeleteClick = async (id) => {
        try {
            const result = await deleteFilm(id)
            alert(`${result.data.message}`)
            getPagingFilm()
        } catch (error) {
            console.error('Error deleting film:', error);
        }
    }
    useEffect(() => {
        if (filmEdit) {
            navigate(`/admin/editfilm/${filmEdit._id}`);
        }
    }, [filmEdit]);

    const [pageSize, setPageSize] = useState(3)
    const [pageIndex, setPageIndex] = useState(1)
    const [filmsPaging, setFilmsPaging] = useState([])
    const [count, setCount] = useState(0)

    const getPagingFilm = async () => {
        try {
            const result = await getPagingFilms(pageSize, pageIndex)
            console.log('result', result);
            setFilmsPaging(result.data.filmsAll)
            setCount(result.data.count)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getPagingFilm()
    }, [pageIndex, pageSize])
    console.log(filmsPaging);
    const columns = [
        {
            title: 'Film Name',
            dataIndex: 'Film Name',
            key: 'Film Name',
            render: (_, text) => <a>{text.filmName}</a>,
        },
        {
            title: 'Episodes',
            dataIndex: 'Episodes',
            key: 'Episodes',
            render: (_, text) => <Tag color='green'>{text.episodes}</Tag>,
        },
        {
            title: 'Genres',
            dataIndex: 'Genres',
            key: 'Genres',
            render: (_, record) => (
                <>
                    {record.genres.map((tag) => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Category',
            dataIndex: 'Category',
            key: 'Category',
            render: (_, record) => (
                <>
                    {record.category.map((tag) => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),

        },
        {
            title: 'Actors',
            dataIndex: 'Actors',
            key: 'Actors',
            render: (_, record) => (
                <>
                    {record.actors.map((tag) => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'Yasuo') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => handleEditClick(record)}>Edit</Button>
                    <Button danger onClick={() => handleDeleteClick(record._id)}>Delete</Button>
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
                dataSource={filmsPaging}
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

export default MainData
