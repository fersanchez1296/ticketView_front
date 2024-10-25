import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    //desarrollo
    //baseUrl: "http://localhost:4000/api/",
    baseUrl: "http://localhost:4000/api/",
    //credentials: "include",
  }),
  tagTypes: ["Tickets"],
  endpoints: (builder) => ({
    //Tickets
    getTicketsAbiertos: builder.query({
      query: ({ collection }) => {
        const url = `tickets?collection=${collection}`;
        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["Tickets"],
    }),
    // aceptarSolicitud: builder.mutation({
    //   query: ({ id, data }) => ({
    //     url: `/solicitud/aceptar/${id}`,
    //     body: data,
    //     method: "PUT",
    //   }),
    //   invalidatesTags: ["Solicitudes"],
    // }),
    // rechazarSolicitud: builder.mutation({
    //   query: ({ id, data }) => ({
    //     url: `/solicitud/rechazar/${id}`,
    //     body: data,
    //     method: "PUT",
    //   }),
    //   invalidatesTags: ["Solicitudes"],
    // }),
    // deleteSolicitud: builder.mutation({
    //   query: ({ id }) => ({
    //     url: `/solicitud/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["Solicitudes"],
    // }),
  }),
  keepUnusedDataFor: 300,
});

export const {
  //tickets
  //useUpdateSolicitudMutation,
  useGetTicketsAbiertosQuery,
  //useAceptarSolicitudMutation,
  //useRechazarSolicitudMutation,
  //useDeleteSolicitudMutation,
} = apiSlice;
