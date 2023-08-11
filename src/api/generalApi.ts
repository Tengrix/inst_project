import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type UserData = {
    name: string; 
    aboutMe: string;
    birthdayDate: string;
    city: string;
    file: File; 
    firstName: string;
    lastName: string;
};


// Определение API
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://instagramm-backend.vercel.app" }),
  endpoints: (builder) => ({
    submitUserData: builder.mutation<void, FormData>({
      query: (formData: FormData) => ({
        url: "/user",
        // method: "POST",
        method: "PATCH",
        body: formData,
      }),
    }),
  }),
});


export const { useSubmitUserDataMutation } = userApi;