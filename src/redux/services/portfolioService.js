import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ENDPOINT, TOKEN } from "../../container";
import Cookies from "js-cookie";

export const portfolioService = createApi({
  reducerPath: "portfolio",
  baseQuery: fetchBaseQuery({
    baseUrl: `${ENDPOINT}api/v1/`,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${Cookies.get(TOKEN)}`);
    },
  }),
  endpoints: (builder) => ({
    getPortfolios: builder.query({
      query: (page) => `portfolios?page=${page}`,
      transformResponse: (res) => res,
    }),
    getPortfolio: builder.mutation({
      query: (id) => ({
        url: `portfolios/${id}`,
        method: "Get",
      }),
    }),
    addPortfolios: builder.mutation({
      query: (body) => ({
        url: "portfolios",
        method: "POST",
        body,
      }),
    }),
    updatePortfolios: builder.mutation({
      query: ({ id, body }) => ({
        url: `portfolios/${id}`,
        method: "PUT",
        body,
      }),
    }),
    deletePortfolios: builder.mutation({
      query: (id) => ({
        url: `portfolios/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetPortfoliosQuery,
  useGetPortfolioMutation,
  useAddPortfoliosMutation,
  useUpdatePortfoliosMutation,
  useDeletePortfoliosMutation,
} = portfolioService;

export default portfolioService.reducer;
