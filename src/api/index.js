import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    //desarrollo
    //baseUrl: "http://localhost:4000/api/",
    baseUrl: "http://localhost:4000/api/",
    credentials: "include",
  }),
  tagTypes: ["Tickets", "Usuarios", "Dashboard", "Historico", "Coordinacion"],
  endpoints: (builder) => ({
    //dashboard
    dashboard: builder.query({
      query: () => {
        const url = `dashboard`;
        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["Dashboard"],
    }),
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
    //Obtener ticket
    postTicket: builder.mutation({
      query: (id) => {
        return {
          url: `/tickets/${id}`,
          method: "POST",
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
    //Crear
    ticket: builder.mutation({
      query: ({ ticketnuevo }) => ({
        url: "/login",
        method: "POST",
        body: ticketnuevo,
      }),
    }),
    //logout
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      invalidatesTags: ["Tickets", "Usuarios", "Dashboard"],
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
      providesTags: ["Usuarios", "Tickets"],
    }),
    putReasignar: builder.mutation({
      query: ({ id_usuario_reasignar, id_ticket }) => {
        const url = `reasignar`;
        return {
          url,
          method: "PUT",
          body: {
            id_usuario_reasignar,
            id_ticket,
          },
        };
      },
      invalidatesTags: ["Tickets"],
    }),
    //RESOLVER
    putResolver: builder.mutation({
      query: ({ _id, Descripcion_resolucion }) => {
        const url = `resolver`;
        return {
          url,
          method: "PUT",
          body: {
            _id,
            Descripcion_resolucion,
          },
        };
      },
      invalidatesTags: ["Tickets"],
    }),
    putRechazarResolucion: builder.mutation({
      query: ({ _id, motivo_rechazo }) => {
        const url = `resolver/rechazar`;
        return {
          url,
          method: "PUT",
          body: {
            _id,
            motivo_rechazo,
          },
        };
      },
      invalidatesTags: ["Tickets"],
    }),
    putAceptarResolucion: builder.mutation({
      query: ({ _id }) => {
        const url = `resolver/aceptar`;
        return {
          url,
          method: "PUT",
          body: {
            _id,
          },
        };
      },
      invalidatesTags: ["Tickets"],
    }),
    //REABRIR
    putReabrir: builder.mutation({
      query: ({ _id, Descripcion_reabrir, Descripcion_cierre, Descripcion, Asignado_a }) => {
        const url = `reabrir`;
        return {
          url,
          method: "PUT",
          body: {
            _id,
            Descripcion_reabrir,
            Descripcion_cierre,
            Descripcion,
            Asignado_a,
          },
        };
      },
      invalidatesTags: ["Tickets"],
    }),
    //Guardar ticket
    guardar: builder.mutation({
      query: ({ ticketState }) => ({
        url: "crear",
        method: "POST",
        body: {
          ticketState,
        },
      }),
    }),
    //Editar ticket
    editar: builder.mutation({
      query: ({
        Prioridad,
        Direccion_area,
        Direccion_general,
        Secretaria,
        _id,
        Descripcion,
        Estado,
        Tipo_incidencia,
        Numero_Oficio,
        NumeroRec_Oficio,
        PendingReason,
        Servicio,
        Categoria,
        Subcategoria,
      }) => ({
        url: "editar",
        method: "PUT",
        body: {
          Prioridad,
          Direccion_area,
          Direccion_general,
          Secretaria,
          _id,
          Descripcion,
          Estado,
          Tipo_incidencia,
          Numero_Oficio,
          NumeroRec_Oficio,
          PendingReason,
          Servicio,
          Categoria,
          Subcategoria,
        },
      }),
    }),
    //Obtener datos para mostrarlos en los select
    getInfoSelects: builder.query({
      query: () => {
        const url = `crear/getInfoSelects`;
        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["Tickets"],
    }),
    //HISTORICO
    getHistorico: builder.query({
      query: () => {
        const url = `historico`;
        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["Tickets"],
    }),
    getHistoricoArea: builder.query({
      query: (area) => {
        const url = `historico/area`;
        return {
          url,
          params: { area },
          method: "GET",
        };
      },
      providesTags: ["Tickets"],
    }),
    getAreasCoordinacion: builder.query({
      query: () => {
        const url = `coordinacion`;
        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["Tickets"],
    }),
    getTicketsAreaCoordinacion: builder.query({
      query: (area) => {
        const url = `historico/area`;
        return {
          url,
          params: { area },
          method: "GET",
        };
      },
      providesTags: ["Tickets"],
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
  useTicketMutation,
  useGetInfoSelectsQuery,
  useGuardarMutation,
  useEditarMutation,
  usePutReasignarMutation,
  useDashboardQuery,
  useGetHistoricoQuery,
  usePostTicketMutation,
  useGetHistoricoAreaQuery,
  useGetAreasCoordinacionQuery,
  usePutRechazarResolucionMutation,
  usePutAceptarResolucionMutation,
  usePutReabrirMutation,
} = apiSlice;
