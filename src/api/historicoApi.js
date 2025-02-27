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
      keepUnusedDataFor: 0,
    }),
  }),
});

export const { useHistoricoQuery, useGetHistoricoPorAreaQuery } = historicoApi;
