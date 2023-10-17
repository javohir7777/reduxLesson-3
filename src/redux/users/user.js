import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { ENDPOINT, TOKEN } from "../../container";

export const user = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: `${ENDPOINT}api/v1/`,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${Cookies.get(TOKEN)}`);
    },
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (page) => `users?page=${page}`,
      transformResponse: (res) => res,
    }),
    getUser: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: "Get",
      }),
    }),
    addUsers: builder.mutation({
      query: (body) => ({
        url: "users",
        method: "POST",
        body,
      }),
    }),
    updateUsers: builder.mutation({
      query: ({ id, body }) => ({
        url: `users/${id}`,
        method: "PUT",
        body,
      }),
    }),
    deleteUsers: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserMutation,
  useAddUsersMutation,
  useUpdateUsersMutation,
  useDeleteUsersMutation,
} = user;

export default user.reducer;
