import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    //desarrollo
    //baseUrl: "http://localhost:4000/api/",
    baseUrl: "http://localhost:4000/api/",
    credentials: "include",
  }),
  tagTypes: ["Tickets", "Usuarios"],
  endpoints: (builder) => ({
    //Tickets
    getTicketsAbiertos: builder.query({
      query: ({ collection }) => {
        const url = `tickets/${collection}`;
        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["Tickets"],
    }),
    //login
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    //logout
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      invalidatesTags: ["Tickets", "Usuarios"],
    }),
    //REASIGNAR
    //obtener usuarios (reasignar)
    getUsuarios: builder.query({
      query: () => {
        const url = `reasignar/areas`;
        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["Usuarios"],
    }),
    //RESOLVER
    putResolver: builder.mutation({
      query: ({ Id_ticket, Resuelto_por_id, Descripcion_resolucion }) => {
        const url = `resolver`;
        return {
          url,
          method: "PUT",
          body: {
            Id_ticket,
            Resuelto_por_id,
            Descripcion_resolucion,
          },
        };
      },
      invalidatesTags: ["Tickets"],
    }),
  }),
  keepUnusedDataFor: 300,
});

export const {
  //tickets
  useGetTicketsAbiertosQuery,
  useLoginMutation,
  useLogoutMutation,
  useGetUsuariosQuery,
  usePutResolverMutation,
} = apiSlice;
