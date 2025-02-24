import { apiSlice } from "./apiSlice";

export const historicoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    dashboard: builder.query({
      query: () => {
        const url = `tickets/dashboard`;
        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["Dashboard"],
    }),
    excel: builder.mutation({
      query: () => ({
        url: `tickets/export/excel`,
        method: "GET",
        responseHandler: async (response) => response.blob(), // Recibe el archivo como Blob
      }),
    }),
  }),
});

export const { useDashboardQuery, useExcelMutation } = historicoApi;
