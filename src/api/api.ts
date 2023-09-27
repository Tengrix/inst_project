import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseURL } from '@/api/instances';
import { EditPostFormDataType, GetUserDataResponseType, PostFormData, ProfileData } from '@/api/types';
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
    reducerPath: 'baseApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Post', 'Profile', 'Auth'],
    endpoints: builder => {
        return {
            createPost: builder.mutation<PostType, PostFormData>({
                query: data => {
                    const formData = new FormData();
                    formData.append('description', data.description);
                    data.files.forEach(({ blob, filename }) => {
                        formData.append('files', blob, filename);
                    });
                    return {
                        url: '/post',
                        method: 'POST',
                        body: formData
                    };
                },
                onQueryStarted: async ({ ...patch }, { dispatch, queryFulfilled }) => {
                    try {
                        const { data } = await queryFulfilled;
                        dispatch(
                            api.util.updateQueryData('getAllPosts', undefined, draftPosts => {
                                draftPosts.items.unshift(data);
                            })
                        );
                    } catch {
                        console.log('error');
                    }
                }
            }),
            editPost: builder.mutation<void, EditPostFormDataType>({
                query: post => {
                    const formData = new FormData();
                    formData.append('description', post.description);
                    formData.append('id', post.id);
                    formData.append('files', post.files);
                    return {
                        url: '/post',
                        method: 'PATCH',
                        body: formData
                    };
                },
                invalidatesTags: ['Post']
            }),
            getPostById: builder.query<PostType, string>({
                query: id => {
                    return {
                        url: '/post',
                        params: {
                            id: id
                        }
                    };
                },
                providesTags: ['Post']
            }),
            getAllPosts: builder.query<GetPostsResponseType, number | void>({
                query: (page = 1) => {
                    return {
                        url: '/post/all',
                        params: {
                            page: page,
                            itemsPerPage: 9,
                            order: 'desc'
                        }
                    };
                },
                serializeQueryArgs: ({ endpointName, queryArgs }) => {
                    return endpointName;
                },
                transformResponse: (response: PostType[], meta, arg) => {
                    return { items: response, page: arg ?? 1 };
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
                }
                // providesTags: (result, error, arg) =>
                //     result ? [...result.items.map(({ id }) => ({ type: 'Post' as const, id })), 'Post'] : ['Post']
            }),
            deletePost: builder.mutation<any, { id: string }>({
                query: data => {
                    return {
                        url: '/post',
                        method: 'DELETE',
                        body: data
                    };
                },
                onQueryStarted: async ({ id }, { dispatch, queryFulfilled }) => {
                    try {
                        const { data } = await queryFulfilled;
                        dispatch(
                            api.util.updateQueryData('getAllPosts', undefined, draftPosts => {
                                const index = draftPosts.items.findIndex(post => post.id === id);
                                if (index !== -1) {
                                    draftPosts.items.splice(index, 1);
                                }
                            })
                        );
                    } catch {
                        console.log('error');
                    }
                }
            }),
            submitUserData: builder.mutation<void, ProfileData>({
                query: data => {
                    const formData = new FormData();
                    formData.append('firstName', data.firstName);
                    formData.append('lastName', data.lastName);
                    data.birthdayDate && formData.append('birthdayDate', data.birthdayDate);
                    data.city && formData.append('city', data.city);
                    data.file && formData.append('file', data.file, data.firstName + data.lastName);
                    formData.append('aboutMe', data.aboutMe ?? '');
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
    useGetUserDataQuery,
    useGetPostByIdQuery
} = api;

type GetPostsResponseType = {
    items: PostType[];
    page: number;
};
