import { TalentList, TalentRequest, TalentResponse } from "@/interfaces/talent";
import { BASE_URL } from "@/lib/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const talentApi = createApi({
  reducerPath: "talentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["Talent"],
  endpoints: (builder) => ({
    getTalents: builder.query<TalentList, void>({
      query: () => ({
        url: "talent",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      providesTags: ["Talent"],
    }),
    getTalentById: builder.query<TalentResponse, string>({
      query: (id) => ({
        url: `talent/${id}`,
        method: "GET",
      }),
      providesTags: ["Talent"],
    }),
    createTalent: builder.mutation<TalentResponse, TalentRequest>({
      query: (body) => ({
        url: "talent",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Talent"],
    }),
    updateTalent: builder.mutation<
      TalentResponse,
      { id: string; body: TalentRequest }
    >({
      query: ({ id, body }) => ({
        url: `talent/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Talent"],
    }),
    deleteTalent: builder.mutation<TalentResponse, string>({
      query: (id) => ({
        url: `talent/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Talent"],
    }),
  }),
});

export const {
  useGetTalentsQuery,
  useGetTalentByIdQuery,
  useCreateTalentMutation,
  useUpdateTalentMutation,
  useDeleteTalentMutation,
} = talentApi;
