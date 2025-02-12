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
      query: ({ body }) => ({
        url: "clients/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Clientes", "Cliente", "SelectsCliente"],
    }),
    updateClienteById: builder.mutation({
      query: ({ body, clientId }) => {
        const url = `clients/${clientId}`;
        return {
          url,
          method: "PUT",
          body,
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
