import { apiSlice } from "./apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    creditData: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      // invalidatesTags: ['User'],
    }),
    uploadDocument: builder.mutation({
      query: ({ file, documentType }) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("documentType", documentType);

        return {
          url: "/documents/upload",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Documents"],
    }),

    fetchDocuments: builder.query({
      query: () => ({
        url: "/documents",
        method: "GET",
      }),
      providesTags: ["Documents"],
    }),

    getCreditScore: builder.mutation({
      query: (data) => ({
        url: "/credit-assessment",
        method: "POST",
        body: data,
      }),
      // invalidatesTags: ['User'],
    }),

    fetchCreditScore: builder.query({
      query: () => ({
        url: "/credit-assessment",
        method: "GET",
      }),
      // providesTags: ["Documents"],
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useUploadDocumentMutation,
  useFetchDocumentsQuery,
  useGetCreditScoreMutation,
  useFetchCreditScoreQuery,
} = authApi;
