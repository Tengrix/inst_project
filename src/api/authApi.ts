import {BaseQueryApi, createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {baseURL} from "@/api/instances";
import {CommonServerResponse} from "@/api/types/LoginPropsType";
import {ImageType} from "@/redux/store/imageSlice/types/store";
import {RootStateType} from "@/redux/store";
import {BaseQueryFn, FetchArgs, FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {authAction} from "@/redux/store/Auth/authSlice";
import {PublicRoutes} from "@/shared/routes/Routes";

const baseQuery = fetchBaseQuery({
    baseUrl: baseURL,
    credentials: 'include',
    prepareHeaders: (headers, {getState,endpoint}) => {
        const token = (getState() as RootStateType).auth.token
        if(token && !PublicRoutes.find(route=>route===`/${endpoint}`)){
            headers.set('Authorization', `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args,api,extraOptions)
    if(result?.error?.status===403 || result?.error?.status===401){
        console.log('sending refresh token')
        //send refresh token to get new access token
        const refreshResult = await baseQuery('/auth/refresh-token', api, extraOptions)
        if(refreshResult.data){
            // store the new token
            api.dispatch(authAction.setCredentials({...refreshResult.data}))
            // retry the original query with new access token
            result = await baseQuery(args,api, extraOptions)
        }else{
            api.dispatch(authAction.logOut())
        }
    }
    return result
}


export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => {
        return {
            submitUserData: builder.mutation<void, PostFormData>({
                query: (data) => {
                    const formData = new FormData()
                    formData.append('description',data.description)
                    data.files.forEach((photo,index)=> {
                        formData.append('files',photo.src)
                    })
                    formData.append('title',data.title)
                    console.log(formData)
                    return {
                        url: "/user",
                        method: "POST",
                        body: formData,
                        headers: {'Content-Type': 'multipart/form-data'},
                    }
                },
            })
        }
    }
})

export const {useSubmitUserDataMutation} = authApi

//types
export type RegisterParamsType = {
    userName: string
    email: string
    password: string
}

export type ErrorDataType = {
    errorsMessages:string
}
export type CustomerError = {
    data:ErrorDataType,
    status:number
}
export type PostFormData = {
    description: string
    files: ImageType[]
    title: string
}
