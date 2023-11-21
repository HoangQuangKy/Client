import React from 'react'
import { useState, useEffect } from 'react';
import { CLOUDINARY_URL } from '../../configs/index.js'
import { useNavigate, useParams } from "react-router";
import { useSelector, useDispatch } from 'react-redux'
import { getTitle, getUniqueCategories, updateFilms, getFilmById } from '../../services';
import { setTitle, setCategories } from '../../redux/slice/film.slice';
import {
    Form,
    Input,
    InputNumber,
    Select,
    Upload,
    Button,
} from 'antd';
const { TextArea } = Input;


function EditFilm() {
    useEffect(() => {
        getTitle()
            .then((response) => {
                const genresData = response.data.data.genres
                const actorData = response.data.data.actors
                dispatch(setTitle({
                    genres: genresData,
                    actors: actorData
                }))
            })
            .catch((error) => {
                console.log("Lỗi khi gọi API getUniqueCategories:", error);
            })
    }, [])
    useEffect(() => {
        getUniqueCategories()
            .then((response) => {
                const categoriesData = response.data.message
                dispatch(setCategories({ categories: categoriesData }))
            })
            .catch((error) => {
                console.log("Lỗi khi gọi API getUniqueCategories:", error);
            })
    }, [])
    const params = useParams()
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const [file, setFile] = useState()

    const [form] = Form.useForm()

    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };
    const getFilm = async () => {
        try {
            const film = await getFilmById(params._id);
            const filmData = film.data.film;

            form.setFieldsValue({
                filmName: filmData.filmName,
                genres: filmData.genres,
                actors: filmData.actors,
                categories: filmData.category,
                acceptAge: filmData.acceptAge,
                episodes: filmData.episodes,
                decs: filmData.decs,
            });

            setImageUrl(`${CLOUDINARY_URL}/${filmData.img}`);
            console.log("Film data:", filmData);
        } catch (error) {
            console.log(error);
        }
    };


    const handleChange = (info) => {
        const newFile = info.file.originFileObj
        console.log(info);
        setFile(newFile)
        getBase64(newFile, (url) => {
            setLoading(false);
            setImageUrl(url);
        });
        console.log('newFile', newFile);
    };
    const onFinish = async (values) => {
        // const values = form.getFieldsValue();
        const formdata = new FormData();
        formdata.append("filmName", values.filmName)
        formdata.append("genres", values.genres)
        formdata.append("actors", values.actors)
        formdata.append("categories", values.category)
        formdata.append("acceptAge", values.acceptAge)
        formdata.append("episodes", values.episodes)
        formdata.append("decs", values.decs)
        formdata.append("img", file)

        try {
            const result = await updateFilms(params._id, formdata)

            alert('chỉnh sửa thành công')

        } catch (error) {
            console.log(error)
        }

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const uploadButton = (
        <div>
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    useEffect(() => {
        if (params._id) {
            getFilm()
        }
    }, [])
    const dispatch = useDispatch();
    const genres = useSelector((state) => state.films.genres);
    const actors = useSelector((state) => state.films.actors);
    const categories = useSelector((state) => state.films.categories);
    const genresOption = [];
    const categoriesOption = [];
    const actorsOption = []
    for (let index = 0; index < categories.length; index++) {
        categoriesOption.push({
            label: categories[index],
            value: categories[index]
        })

    }
    for (let index = 0; index < actors.length; index++) {
        actorsOption.push({
            label: actors[index],
            value: actors[index]
        })

    }
    for (let index = 0; index < genres.length; index++) {
        genresOption.push({
            label: genres[index],
            value: genres[index]
        })

    }

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
                    label="Film Name"
                    name='filmName'>
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Genres"
                    name='genres'>
                    <Select
                        mode='multiple'
                        allowClear
                        style={{
                            width: '100%',
                        }}
                        placeholder="Please select"
                        options={genresOption}>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Category"
                    name='categories'>
                    <Select
                        mode='multiple'
                        allowClear
                        style={{
                            width: '100%',
                        }}
                        placeholder="Please select"
                        options={categoriesOption}>
                    </Select>
                </Form.Item>
                <Form.Item label="Actors"
                    name='actors'>
                    <Select
                        mode='multiple'
                        allowClear
                        style={{
                            width: '100%',
                        }}
                        placeholder="Please select"
                        options={actorsOption}>
                    </Select>
                </Form.Item>
                <Form.Item label="Age Limit"
                    name='acceptAge'>
                    <InputNumber />
                </Form.Item>
                <Form.Item label="episodes"
                    name='episodes'>
                    <InputNumber />
                </Form.Item>
                <Form.Item label="Giới thiệu phim"
                    name='decs'>
                    <TextArea rows={4} />
                </Form.Item>
                <Upload
                    name="img"
                    listType="picture-card"
                    className="avatar-uploader"
                    onChange={handleChange}
                    showUploadList={false}
                    action={() => false}
                >
                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>
                <Button className='mt-5' htmlType="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default EditFilm
