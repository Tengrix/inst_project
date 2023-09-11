import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseURL } from '@/api/instances';
import { GetUserDataResponseType, PostFormData, ProfileData } from '@/api/types';
import { PostType } from '@/components/Post/types';
import { RootStateType } from '@/redux/store';
import { authAction } from '@/redux/store/Auth/authSlice';
import { PublicRoutes } from '@/shared/routes/Routes';

const baseQuery = fetchBaseQuery({
    baseUrl: baseURL,
    credentials: 'include',
    prepareHeaders: (headers, { getState, endpoint }) => {
        const token = (getState() as RootStateType).auth.token;
        if (token && !PublicRoutes.find(route => route === `/${endpoint}`)) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    }
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions
) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result?.error?.status === 403 || result?.error?.status === 401) {
        console.log('sending refresh token');
        //send refresh token to get new access token
        const refreshResult = await baseQuery('/auth/refresh-token', api, extraOptions);
        if (refreshResult.data) {
            // store the new token
            api.dispatch(authAction.setCredentials({ ...refreshResult.data }));
            // retry the original query with new access token
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(authAction.logOut());
        }
    }
    return result;
};

export const api = createApi({
    reducerPath: 'authApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Post', 'Profile'],
    endpoints: builder => {
        return {
            createPost: builder.mutation<void, PostFormData>({
                query: data => {
                    const formData = new FormData();
                    formData.append('description', data.description);
                    data.files.forEach(({ blob, filename }) => {
                        formData.append('files', blob, filename);
                    });
                    formData.append('title', data.title);
                    return {
                        url: '/post',
                        method: 'POST',
                        body: formData
                    };
                },
                invalidatesTags: ['Post']
            }),
            getAllPosts: builder.query<GetPostsResponseType, number>({
                query: (page: number) => {
                    return {
                        url: '/post/all',
                        params: {
                            page: page,
                            itemsPerPage: 9
                        }
                    };
                },
                serializeQueryArgs: ({ endpointName }) => {
                    return endpointName;
                },
                transformResponse: (response: PostType[], meta, arg) => {
                    return { items: response, page: arg };
                },
                merge: (currentCacheData, newItems) => {
                    if (newItems.page === 1) {
                        currentCacheData.page = newItems.page;
                        currentCacheData.items = newItems.items;
                    }
                    if (currentCacheData.page !== newItems.page) {
                        currentCacheData.page = newItems.page;
                        currentCacheData.items.push(...newItems.items);
                    }
                },
                forceRefetch: ({ currentArg, previousArg }) => {
                    return currentArg !== previousArg;
                },
                providesTags: ['Post']
            }),
            deletePost: builder.mutation<any, { id: string }>({
                query: data => {
                    return {
                        url: '/post',
                        method: 'DELETE',
                        body: data
                    };
                },
                invalidatesTags: ['Post']
            }),
            submitUserData: builder.mutation<void, ProfileData>({
                query: data => {
                    const formData = new FormData();
                    formData.append('aboutMe', data.aboutMe ?? '');
                    formData.append('birthdayDate', data.birthdayDate);
                    formData.append('city', data.city);
                    data.file && formData.append('file', data.file, data.firstName + data.lastName);
                    formData.append('firstName', data.firstName);
                    formData.append('lastName', data.lastName);
                    return {
                        url: '/user',
                        method: 'PATCH',
                        body: formData
                    };
                },
                invalidatesTags: ['Profile']
            }),
            getUserData: builder.query<GetUserDataResponseType, void>({
                query: () => {
                    return {
                        url: '/user/profile'
                    };
                },
                providesTags: ['Profile']
            }),
            editPost: builder.mutation({
                query: post => {
                    return {
                        url: '/post',
                        method: 'PATCH',
                        body: post
                    };
                },
                invalidatesTags: ['Post']
            }),
            getPostById: builder.query({
                query: postId => {
                    return {
                        url: '/post',
                        body: postId
                    };
                },
                providesTags: ['Post']
            })
        };
    }
});

export const {
    useCreatePostMutation,
    useEditPostMutation,
    useGetAllPostsQuery,
    useLazyGetPostByIdQuery,
    useLazyGetAllPostsQuery,
    useDeletePostMutation,
    useSubmitUserDataMutation,
    useGetUserDataQuery
} = api;

type GetPostsResponseType = {
    items: PostType[];
    page: number;
};
