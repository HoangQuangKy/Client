import axios from "axios";
const KEY = 'M4T_KH4U'
const filmInstance = axios.create({
    baseURL: "http://localhost:8000",
});
const categoriesInstance = axios.create({
    baseURL: "http://localhost:8000"
})

filmInstance.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("accessToken")
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
})
export const deleteFilm = (id) => {
    return filmInstance.delete(`/film/${id}`)
}
export const getFilm = () => {
    return filmInstance.get("/film/getAllFilms")
}

export const getUniqueCategories = () => {
    return categoriesInstance.get("/film/category")
}

export const createNewUser = (newUser) => {
    return filmInstance.post("/user/register", newUser);
}
export const Login = (userLogin) => {
    return filmInstance.post("/user/login", userLogin)
}
export const getPagingFilms = (pageSize = 3, pageIndex = 1) => {
    return filmInstance.get(`/film/getPagingFilms?pageSize=${pageSize}&pageIndex=${pageIndex}`)
}

export const getTitle = () => {
    return filmInstance.get('/film/getTitle')
}
export const updateFilms = (id, data) => {
    return filmInstance.put(`/film/${id}`, data)
}
export const createNewFilms = (data) => {
    return filmInstance.post('/film/createFilms', data)
}
export const getFilmById = (filmdId) => {
    return filmInstance.get(`/film/${filmdId}`)
}

export const getPagingUser = (pageSize = 3, pageIndex = 1) => {
    return filmInstance.get(`/user/getPagingUser?pageSize=${pageSize}&pageIndex=${pageIndex}`)
}

export const updateUsers = (id, data) => {
    return filmInstance.put(`/user/${id}`, data)
}
export const getUserById = (userId) => {
    return filmInstance.get(`user/${userId}`)
}