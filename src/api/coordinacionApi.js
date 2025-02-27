import { apiSlice } from "./apiSlice";

export const coordinacionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //TODO este no creo que sea util debido a que actualmente las coordinaciones no tienen areas
    resolutoresPorAreaModerador: builder.query({
      query: () => {
        const url = `tickets/areas`;
        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["ResolutoresPorModerador"],
      invalidatesTags: ["TicketsResolutor"],
    }),
    getTicketsResolutor: builder.query({
      query: ({ userId }) => {
        const url = `tickets/resolutor/${userId}`;
        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["TicketsResolutor"],
    }),
  }),
});

export const { useResolutoresPorAreaModeradorQuery, useGetTicketsResolutorQuery } = coordinacionApi;
