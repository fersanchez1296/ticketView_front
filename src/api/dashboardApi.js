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
  }),
});

export const { useDashboardQuery } = historicoApi;
