import { apiSlice } from "./apiSlice";

export const clientsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    clientes: builder.query({
      query: () => {
        const url = `clients/`;
        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["Clientes"],
    }),
    selectsClientes: builder.query({
      query: () => {
        const url = `clients/selectData`;
        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["SelectsCliente"],
    }),
    getClienteByCorreo: builder.query({
      query: ({ Correo }) => {
        const url = `clients/${Correo}`;
        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["Cliente"],
    }),
    crearCliente: builder.mutation({
      query: ({ data }) => {
        const auxData = {
          Nombre: data.nombre,
          Correo: data.correo,
          Telefono: data.telefono,
          Extension: data.extension,
          Ubicacion: data.ubicacion,
          // Dependencia: data.dependencia,
          // nuevaDependencia: data.nuevaDependencia ?? undefined,
          Direccion_General: data.direccion_general,
          nuevaDGeneral: data.nuevaDGeneral ?? undefined,
          direccion_area: data.direccion_area,
          nuevaDArea: data.nuevaDArea ?? undefined,
        };
        return {
          url: `clients/`,
          method: "POST",
          body: auxData,
        };
      },
      invalidatesTags: ["Clientes", "Cliente", "SelectsCliente"],
    }),
    updateClienteById: builder.mutation({
      query: ({ data }) => {
        const clientId = data._id;
        const auxData = {
          Nombre: data.Nombre,
          Correo: data.Correo,
          Telefono: data.Telefono,
          Extension: data.Extension,
          Ubicacion: data.Ubicacion,
          // Dependencia: data.Dependencia._id,
          // nuevaDependencia: data.nuevaDependencia ?? undefined,
          Direccion_General: data.Direccion_General._id,
          nuevaDGeneral: data.nuevaDGeneral ?? undefined,
          direccion_area: data.direccion_area._id,
          nuevaDArea: data.nuevaDArea ?? undefined,
        };
        return {
          url: `clients/${clientId}`,
          method: "PUT",
          body: auxData,
        };
      },
      invalidatesTags: ["Clientes", "Cliente", "SelectsCliente"],
    }),
  }),
});

export const {
  useClientesQuery,
  useSelectsClientesQuery,
  useLazyGetClienteByCorreoQuery,
  useCrearClienteMutation,
  useUpdateClienteByIdMutation,
} = clientsApi;
