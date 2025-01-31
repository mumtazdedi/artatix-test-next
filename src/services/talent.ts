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
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      providesTags: ["Talent"],
    }),
    createTalent: builder.mutation<TalentResponse, TalentRequest>({
      query: (body) => {
        const formData = new FormData();
        if (body.image) formData.append("image", body.image?.[0]);
        if (body.name) formData.append("name", body.name);
        return {
          url: "talent",
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
      },
      invalidatesTags: ["Talent"],
    }),
    updateTalent: builder.mutation<
      TalentResponse,
      { id: string; body: TalentRequest }
    >({
      query: ({ id, body }) => {
        const formData = new FormData();
        if (body.image) formData.append("image", body.image?.[0]);
        if (body.name) formData.append("name", body.name);

        formData.append("isActive", body.isActive?.toString() || "0");
        return {
          url: `talent/${id}`,
          method: "PUT",
          body: formData,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
      },
      invalidatesTags: ["Talent"],
    }),
    deleteTalent: builder.mutation<TalentResponse, string>({
      query: (id) => ({
        url: `talent/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
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
