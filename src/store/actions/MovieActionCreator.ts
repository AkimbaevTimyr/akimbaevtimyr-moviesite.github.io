import {createAsyncThunk} from '@reduxjs/toolkit'
import { IFavoriteMovie, IMovie } from '../../types/MoviesTypes'
import axios from 'axios'
import { getDocs, collection } from 'firebase/firestore'
import { db } from '../../firebase-config'

export const getAll = createAsyncThunk(
    "movies/getAllMovies",
    async(email: string, thunkAPI) =>{
        const genre = localStorage.getItem('genre')
        try{
                thunkAPI.dispatch(getBestMovies(1))
                thunkAPI.dispatch(getPopularMovies(1))
                thunkAPI.dispatch(getPersonalMovies())
                thunkAPI.dispatch(getPersonalSeries())
                thunkAPI.dispatch(getUpcomingPremiers())
                thunkAPI.dispatch(getTvShows(1))
                thunkAPI.dispatch(getFavoriteMovies(email))
                thunkAPI.dispatch(getAllMovies([1, genre]))
                thunkAPI.dispatch(setIsLoading(false))
        }catch(e){

        }
    }
)


export const getBestMovies = createAsyncThunk(
    "movies/getBestMovies",
    async (page: number, thunkAPI) =>{
        try{
            let { data } = await axios.get<any>(`https://api.themoviedb.org/3/movie/top_rated?api_key=5ddccc04d5376e3e13b0cf0f39f6a00a&language=ru-RU&page=${page}`)
            return data.results
        }catch(e){

        }
    }
)

export const getPopularMovies = createAsyncThunk(
    "movies/getPopularMovies",
    async (page: number, thunkAPI) => {
        try{
            let { data } = await axios.get<any>(`https://api.themoviedb.org/3/movie/popular?api_key=5ddccc04d5376e3e13b0cf0f39f6a00a&language=en-US&page=${page}`)
            return data.results
        }catch(e){

        }
    }
)

export const getPersonalMovies = createAsyncThunk(
    "movies/getPersonalMovies",
    async(_, thunkAPI) =>{
        try{
            let { data } = await axios.get<any>('https://api.themoviedb.org/3/movie/top_rated?api_key=5ddccc04d5376e3e13b0cf0f39f6a00a&language=en-US&page=5');
            return data.results
        }catch(e){

        }
    }
)

export const getPersonalSeries = createAsyncThunk(
    "movies/getPersonalSeries",
    async(_, thunkAPI) => {
        try{
            let { data } = await axios.get<any>('https://api.themoviedb.org/3/tv/top_rated?api_key=5ddccc04d5376e3e13b0cf0f39f6a00a&language=ru-RU&page=4');
            return data.results
        }catch(e){

        }
    }
)

export const getUpcomingPremiers = createAsyncThunk(
    "movies/getUpcomingPremiers",
    async(_, thunkAPI) =>{
        try{
            let { data } = await axios.get<any>('https://api.themoviedb.org/3/movie/upcoming?api_key=5ddccc04d5376e3e13b0cf0f39f6a00a&language=en-US&page=1');
            return data.results
        }catch(e){

        }
    }
)

export const getAllMovies = createAsyncThunk(
    "movies/getAllMovies",
    async(args: any[], thunkAPi) => {
        try{
            const [page, genresId] = args;
            let {data} = await axios.get<any>(`https://api.themoviedb.org/3/discover/movie?api_key=5ddccc04d5376e3e13b0cf0f39f6a00a&language=ru-RU&sort_by=vote_average.desc&vote_average.gte=1&vote_average.lte=10&with_genres=${genresId}&&page=${page}`)
            return data.results
        }catch(e){
            console.log(e)
        }
    }
)

export const getMoviesById = createAsyncThunk(
    "movie/getMoviesById",
    async(id: number, thunkAPI) => {
        try{
            let { data } = await axios.get<any>(`https://api.themoviedb.org/3/movie/${id}?api_key=5ddccc04d5376e3e13b0cf0f39f6a00a&language=ru-RU`)
            return data
        }catch(e){

        }
    }
)

export const setSimularMoviesById = createAsyncThunk(
    "movies/setSimularMoviesById",
    async(id: number, thunkAPI) =>{
        try{
            let {data} = await axios.get<any>(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=5ddccc04d5376e3e13b0cf0f39f6a00a&language=en-US&page=1`)
            return data.results
        }catch(e){
            
        }
    }
)

export const getFavoriteMovies = createAsyncThunk(
    "movies/getFavoriteMovies",
    async(email: string, thunkAPI) => {
        try{
            const querySnapshot = await getDocs(collection(db, "favorites"));
            const data = querySnapshot.docs.map(doc => doc.data())
            return data.filter(el => el.email === email)
        }catch(e){

        }
    }
)

export const setSearchMovies = createAsyncThunk(
    "movies/searchMovies",
    async(text: string, thunkAPI) => {
        try{
            let { data } = await axios.get<any>(`https://api.themoviedb.org/3/search/multi?api_key=5ddccc04d5376e3e13b0cf0f39f6a00a&language=en-US&query=${text}&page=1&include_adult=false`)
            return data.results
        }catch(e){

        }
    }
)



export const addFavoriteMovies = createAsyncThunk(
    "movie/addFavoriteMovie",
    async(movies: IFavoriteMovie[], thunkAPI) =>{
        try{
            return movies
        }catch(e){

        }
    }
)

export const deleteMovie = createAsyncThunk(
    "movie/deleteFavoriteMovie",
    async(id: number, thunkAPI) =>{
        try{
            return id
        }catch(e){

        }
    }
)

export const sortingMoviesByRating = createAsyncThunk(
    "movies/sortingMoviesByRating",
    async(data: any) => {
        let  [first = 10, second = 1,firstYear = 1960, secondYear = 2025, page = 1 ] = data;
        try{
            let {data} = await axios.get<any>(`https://api..org/3/discover/movie?api_key=5ddccc04d5376e3e13b0cf0f39f6a00a&language=ru-RU&sort_by=vote_average.asc&page=${page}&release_date.gte=${firstYear}&release_date.lte=${secondYear}&vote_average.gte=${first}&vote_average.lte=${second}&with_watch_monetization_types=flatrate`)
            return data.results
        }catch(e){

        }
    }
)

export const sortingMovies = createAsyncThunk(
    "movies/sortingMovies",
    async(args: any, thunkAPI) => {
        try{
            const [page, first, second, genresId] = args;
            let {data} = await axios.get<any>(`https://api.themoviedb.org/3/discover/movie?api_key=5ddccc04d5376e3e13b0cf0f39f6a00a&language=en-US&sort_by=vote_average.asc&page=${page}&vote_average.gte=${first}&vote_average.lte=${second}&with_genres=${genresId}&with_watch_monetization_types=flatrate`)
            console.log(data.results)
            return data.results
        }catch(e){

        }
    }
)

export const setIsLoading = createAsyncThunk(
    "movies/setIsLoaing",
    async(bool: boolean, thunkAPI) => {
        try{
            return bool
        }catch(e){
            
        }
    }
)

// tvShows

export const getTvShows = createAsyncThunk(
    "tvshows/getTvShows",
    async(page: number, thunkAPI) =>{
        try{
            let { data } = await axios.get<any>(`https://api.themoviedb.org/3/tv/popular?api_key=5ddccc04d5376e3e13b0cf0f39f6a00a&language=ru-RU&page=${page}`)
            return data.results
        }catch(e){

        }
    }
)

export const getTvShowsById = createAsyncThunk(
    "tvshows/getTvShowsById",
    async(id: number, thunkAPI) => {
        try{
            let { data } = await axios.get<any>(`https://api.themoviedb.org/3/tv/${id}?api_key=5ddccc04d5376e3e13b0cf0f39f6a00a&language=ru-RU`)
            return data
        }catch(e){

        }
    }
)

export const setSimularTvShowsById = createAsyncThunk(
    "movies/setSimularTvShowsById",
    async(id: number, thunkAPI) =>{
        try{
            let {data} = await axios.get<any>(`https://api.themoviedb.org/3/tv/${id}/similar?api_key=5ddccc04d5376e3e13b0cf0f39f6a00a&language=en-US&page=1`)
            return data.results
        }catch(e){
            
        }
    }
)

