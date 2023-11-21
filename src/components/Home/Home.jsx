import React from 'react'
import Header from './Header'
import FilmHeader from './FilmHeader'
import KDrama from './NewRealse'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFilm, getUniqueCategories } from '../../services'
import { setCategories, setFilms } from '../../redux/slice/film.slice'
function Home() {

    const dispatch = useDispatch();
    const genres = useSelector((state) => state.films.genres);
    const actors = useSelector((state) => state.films.actors);
    const films = useSelector((state) => state.films.films);
    const randomFilm = useSelector((state) => state.films.randomFilm);
    const categories = useSelector((state) => state.films.categories);
    const accessToken = useSelector((state) => state.token.accessToken);
    useEffect(() => {
        getFilm()
            .then((response) => {
                const filmsData = response.data.data
                const randomIndex = Math.floor(Math.random() * filmsData.length);
                const randomFilm = filmsData[randomIndex];

                dispatch(setFilms({ films: filmsData, randomFilm: randomFilm }));
            })
            .catch((error) => {
                console.error('Lỗi khi gọi API:', error);
            });
    }, []);
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

    return (
        <div className='max-w-full flex flex-col'>
            <Header></Header>
            <FilmHeader></FilmHeader>
            <KDrama></KDrama>
        </div>
    )
}

export default Home
