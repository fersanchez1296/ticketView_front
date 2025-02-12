import { apiSlice } from "./apiSlice";

export const historicoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    historico: builder.query({
      query: () => {
        const url = `tickets/historico`;
        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["Historico"],
      //invalidatesTags: ["TicketsArea"],
    }),
    //TODO este esta mal, corregir
    getHistoricoPorArea: builder.query({
      query: (area) => {
        const url = `tickets/historico/area?area=${area}`;
        return {
          url,
          method: "GET",
        };
      },
      invalidatesTags: ["Tickets"],
    }),
  }),
});

export const { useHistoricoQuery, useGetHistoricoPorAreaQuery } = historicoApi;
