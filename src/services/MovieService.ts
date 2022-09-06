import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { IFilmItemMovie, IMovie } from '../types/MoviesTypes';

export const movieApi = createApi({
    reducerPath: 'movieApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://api.themoviedb.org/3' }),
    endpoints: (builder) =>({
        getMoviesById: builder.query<IMovie, any>({
            query: (id: number) => `/movie/${id}?api_key=5ddccc04d5376e3e13b0cf0f39f6a00a&language=ru-RU`,
        }),
        getSimular: builder.query<any, any>({
            query: ({id, name}) => `/${name}/${id}/similar?api_key=5ddccc04d5376e3e13b0cf0f39f6a00a&language=ru-RU&page=1`
        }),
        getTvShowsById: builder.query<any, any>({
            query: (id: number) => `/tv/${id}?api_key=5ddccc04d5376e3e13b0cf0f39f6a00a&language=ru-RU`
        }),
        getReviews: builder.query<any, any>({
            query: ({type, id}) => `/${type}/${id}/reviews?api_key=5ddccc04d5376e3e13b0cf0f39f6a00a&language=en-US&page=1`
        }),
    }),
})

export const {useGetMoviesByIdQuery, useGetSimularQuery, useGetTvShowsByIdQuery, useGetReviewsQuery} = movieApi;

