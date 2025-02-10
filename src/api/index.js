import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    //desarrollo
    baseUrl: "http://localhost:4000/api/v1/",
    //baseUrl: `http://172.16.1.13:4000/api/v1/`,
    credentials: "include",
  }),
  tagTypes: ["Tickets", "Usuarios", "Dashboard", "Historico", "Coordinacion", "Clientes"],
  endpoints: (builder) => ({
    //dashboard
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
    //Tickets
    getTicketsAbiertos: builder.query({
      query: ({ collection }) => {
        const url = `tickets/estado/${collection.toUpperCase()}`;
        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["Tickets"],
    }),
    getTickets: builder.query({
      query: ({ estado }) => {
        const url = `tickets/estado/${estado}`;
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
          url: `tickets/buscar/${id}`,
          method: "POST",
        };
      },
      providesTags: ["Tickets"],
    }),
    //login
    login: builder.mutation({
      query: (credentials) => ({
        url: "auth/login",
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
        url: "auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Tickets", "Usuarios", "Dashboard"],
    }),
    //REASIGNAR
    //obtener usuarios (reasignar) ---- cambiar nombre
    getUsuarios: builder.query({
      query: () => {
        const url = `tickets/reasignar/areas`;
        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["Usuarios", "Tickets"],
    }),
    getUsuariosAsignar: builder.query({
      query: () => {
        const url = `tickets/asignar/areas`;
        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["Usuarios", "Tickets"],
    }),
    putReasignar: builder.mutation({
      query: ({ reasignarTicketStore, ticketId }) => {
        console.log(ticketId);
        const url = `tickets/reasignar/${ticketId}`;
        return {
          url,
          method: "PUT",
          body: reasignarTicketStore,
        };
      },
      invalidatesTags: ["Tickets"],
    }),
    putAsignar: builder.mutation({
      query: ({ asignarTicketStore, ticketId }) => {
        console.log(ticketId);
        const url = `tickets/asignar/${ticketId}`;
        return {
          url,
          method: "PUT",
          body: asignarTicketStore,
        };
      },
      invalidatesTags: ["Tickets"],
    }),
    //RESOLVER
    putResolver: builder.mutation({
      query: ({ formData, ticketId }) => {
        const url = `tickets/resolver/${ticketId}`;
        return {
          url,
          method: "PUT",
          body: formData,
          formData: true,
        };
      },
      invalidatesTags: ["Tickets"],
    }),
    putRechazarResolucion: builder.mutation({
      query: ({ ticketId, feedback, Nombre }) => {
        const url = `tickets/resolver/rechazar/${ticketId}`;
        return {
          url,
          method: "PUT",
          body: {
            feedback,
            Nombre,
          },
        };
      },
      invalidatesTags: ["Tickets"],
    }),
    putAceptarResolucion: builder.mutation({
      query: ({ ticketId, Nombre }) => {
        const url = `tickets/resolver/aceptar/${ticketId}`;
        return {
          url,
          method: "PUT",
          body: { Nombre },
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
      query: (formData) => ({
        url: "/tickets/crear/ticket",
        method: "POST",
        body: formData,
        formData: true,
      }),
      providesTags: ["Tickets"],
    }),
    //Editar ticket
    editar: builder.mutation({
      query: ({ ticketState }) => ({
        url: "/tickets/editar",
        method: "PUT",
        body: {
          ticketState,
        },
      }),
    }),
    //Obtener datos para mostrarlos en los select
    getInfoSelects: builder.query({
      query: () => {
        const url = `tickets/crear/getInfoSelects`;
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
        const url = `tickets/historico`;
        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["Tickets"],
    }),
    getHistoricoArea: builder.query({
      query: (area) => {
        const url = `tickets/historico/area?area=${area}`;
        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["Tickets"],
    }),
    getAreasCoordinacion: builder.query({
      query: () => {
        const url = `tickets/coordinacion`;
        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["Tickets"],
    }),
    getTicketsAreaCoordinacion: builder.query({
      query: (area) => {
        const url = `tickets/historico/area`;
        return {
          url,
          params: { area },
          method: "GET",
        };
      },
      providesTags: ["Tickets"],
    }),
    //Usuarios --cambiar nombre
    getAllUsuarios: builder.query({
      query: () => {
        const url = `users/`;
        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["Usuarios"],
    }),
    updateEstadoUsuarios: builder.mutation({
      query: ({ estado, userId }) => {
        const url = `users/${userId}`;
        return {
          url,
          method: "PUT",
          body: { estado },
        };
      },
      invalidatesTags: ["Usuarios"],
    }),
    cerrarTicket: builder.mutation({
      query: ({ ticketId, formData }) => {
        const url = `tickets/cerrar/${ticketId}`;
        return {
          url,
          method: "PUT",
          body: formData,
          formData: true,
        };
      },
      invalidatesTags: ["Tickets"],
    }),
    //clientes
    postCliente: builder.mutation({
      query: ({ body }) => {
        const url = `clients/`;
        return {
          url,
          body,
          method: "POST",
        };
      },
      invalidatesTags: ["Clientes"],
    }),
    getAllClientes: builder.query({
      query: () => {
        const url = `clients/`;
        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["Clientes"],
    }),
    getCliente: builder.query({
      query: ({ Correo }) => {
        const url = `clients/${Correo}`;
        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["Clientes"],
    }),
    getSelectDataClientes: builder.query({
      query: () => {
        const url = `clients/selectData`;
        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["Clientes"],
    }),
    updateCliente: builder.mutation({
      query: ({ body, clientId }) => {
        const url = `clients/${clientId}`;
        return {
          url,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Clientes"],
    }),
    //Editar Usuario
    updateUsuario: builder.mutation({
      query: ({ userStore, id }) => ({
        url: `users/editar/${id}`,
        method: "PUT",
        body: userStore,
      }),
      invalidatesTags: ["Usuarios"],
    }),
    //Editar estado Usuario
    editarUsuario: builder.mutation({
      query: ({ userStore, id }) => ({
        url: `users/${id}`,
        method: "PUT",
        body: userStore,
      }),
      invalidatesTags: ["Usuarios"],
    }),
    //Crear Usuario
    crearUsuario: builder.mutation({
      query: (userStore) => ({
        url: "users/crear",
        method: "POST",
        body: userStore,
      }),
      invalidatesTags: ["Usuarios"],
    }),
    //Roles de usuarios
    getSelectRol: builder.query({
      query: () => {
        const url = `users/usuarios/roles`;
        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["Usuarios"],
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
  useGetAllUsuariosQuery,
  useUpdateEstadoUsuariosMutation,
  useCerrarTicketMutation,
  useGetAllClientesQuery,
  useUpdateClienteMutation,
  useGetSelectDataClientesQuery,
  useLazyGetClienteQuery,
  usePostClienteMutation,
  useUpdateUsuarioMutation,
  useEditarUsuarioMutation,
  useCrearUsuarioMutation,
  useGetSelectRolQuery,
  useGetTicketsQuery,
  usePutAsignarMutation,
  useGetUsuariosAsignarQuery,
} = apiSlice;
