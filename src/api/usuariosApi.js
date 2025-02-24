import { apiSlice } from "./apiSlice";

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    usuarios: builder.query({
      query: () => {
        const url = `users/`;
        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["Usuarios"],
    }),
    updateUsuarioById: builder.mutation({
      query: ({ data }) => {
        const userId = data._id;
        const auxData = {
          Nombre: data.Nombre,
          Correo: data.Correo,
          Area: data.Area[0]._id,
          Rol: data.Rol._id,
        };
        return {
          url: `users/editar/${userId}`,
          method: "PUT",
          body: auxData,
        };
      },
      invalidatesTags: ["Usuarios"],
    }),
    crearUsuario: builder.mutation({
      query: ({ data }) => {
        const auxData = {
          Nombre: data.NombreUsuario,
          Correo: data.CorreoUsuario,
          Area: data.areaUsuario,
          Rol: data.rolUsuario,
        };
        return {
          url: `users/crear`,
          method: "POST",
          body: auxData,
        };
      },
      invalidatesTags: ["Usuarios"],
    }),
    updateEstadoUsuario: builder.mutation({
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
    getRolUsuario: builder.query({
      query: () => {
        const url = `users/usuarios/roles`;
        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["Roles"],
    }),
    //TODO esto no debe estar relacionado con tickets
    getUsuariosParaAsignacion: builder.query({
      query: () => {
        const url = `tickets/asignar/areas`;
        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["Usuarios"],
    }),
    //TODO esto no debe estar relacionado con tickets
    getUsuariosParaReasignacion: builder.query({
      query: () => {
        const url = `tickets/reasignar/areas`;
        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["Usuarios", "Tickets"],
    }),
    getUsuariosPorAreaModerador: builder.query({
      query: () => {
        const url = `users/usuarios_area`;
        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["Usuarios"],
    }),
  }),
});

export const {
  useUsuariosQuery,
  useUpdateUsuarioByIdMutation,
  useCrearUsuarioMutation,
  useUpdateEstadoUsuarioMutation,
  useGetRolUsuarioQuery,
  useGetUsuariosParaAsignacionQuery,
  useGetUsuariosParaReasignacionQuery,
  useGetUsuariosPorAreaModeradorQuery,
} = usersApi;
