import { apiSlice } from "./apiSlice";

export const ticketsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    tickets: builder.query({
      query: ({ collection }) => {
        const url = `tickets/estado/${collection.toUpperCase()}`;
        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["Tickets"],
    }),
    //TODO se debe crear otra query en el back y otro api hook en el front, ya que editar y crear ticket usan el mismo
    selectsCrearTicket: builder.query({
      query: () => {
        const url = `tickets/crear/getInfoSelects`;
        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["SelectsCrearTicket"],
    }),
    ticketsResolutor: builder.query({
      query: (userId) => {
        const url = `tickets/resolutor/${userId}`;
        return {
          url,
          method: "GET",
        };
      },
      invalidatesTags: ["Tickets"],
    }),
    //TODO este debe ser un GET
    getTicketById: builder.mutation({
      query: (id) => ({
        url: `tickets/buscar/${id}`,
        method: "POST",
      }),
      providesTags: ["Ticket"],
    }),
    crear: builder.mutation({
      query: ({ data }) => {
        const formData = new FormData();
        const ticketState = {};
        delete data.correocliente;
        if (data.isNuevoCliente) {
          formData.append("nuevoCliente", JSON.stringify(data.nuevocliente));
          delete data.nuevocliente;
        }
        const [prioridad, tiempo] = data.prioridad.split("|");
        const [asignado_a, area_asignado] = data.moderador.split("|");
        data.Prioridad = prioridad;
        data.tiempo = tiempo;
        data.Asignado_a = asignado_a;
        data.Area_asignado = area_asignado;
        delete data.moderador;
        Object.entries(data).forEach(([key, value]) => {
          if (key === "Files" && Array.isArray(value)) {
            value.forEach((file) => {
              if (file instanceof File) {
                formData.append("files", file);
              } else {
                console.error(`El archivo no es válido:`, file);
              }
            });
          } else {
            ticketState[key] = value;
          }
        });
        formData.append("ticketState", JSON.stringify(ticketState));
        for (let pair of formData.entries()) {
          console.log(`${pair[0]}: ${pair[1]}`);
        }
        return {
          url: "/tickets/crear/ticket",
          method: "POST",
          body: formData,
          formData: true,
        };
      },
      invalidatesTags: ["Tickets", "Ticket", "Dashboard"],
    }),
    nota: builder.mutation({
      query: ({ data }) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
          if (key === "Files" && Array.isArray(value)) {
            value.forEach((file) => {
              if (file instanceof File) {
                formData.append("files", file);
              } else {
                console.error(`El archivo no es válido:`, file);
              }
            });
          } else {
            formData.append(key, value);
          }
        });
        for (let pair of formData.entries()) {
          console.log(`${pair[0]}: ${pair[1]}`);
        }
        return {
          url: "/tickets/crear/ticket",
          method: "POST",
          body: formData,
          formData: true,
        };
      },
      invalidatesTags: ["Tickets", "Ticket", "Dashboard"],
    }),
    editar: builder.mutation({
      query: ({ ticketState }) => ({
        url: "/tickets/editar",
        method: "PUT",
        body: {
          ticketState,
        },
      }),
      invalidatesTags: ["Tickets", "Ticket", "Dashboard"],
    }),
    resolver: builder.mutation({
      query: ({ formData, ticketId }) => ({
        url: `tickets/resolver/${ticketId}`,
        method: "PUT",
        body: formData,
        formData: true,
      }),
      invalidatesTags: ["Tickets", "Ticket", "Dashboard"],
    }),
    asignar: builder.mutation({
      query: ({ asignarTicketStore, ticketId }) => {
        console.log(ticketId);
        const url = `tickets/asignar/${ticketId}`;
        return {
          url,
          method: "PUT",
          body: asignarTicketStore,
        };
      },
      invalidatesTags: ["Tickets", "Ticket", "Dashboard"],
    }),
    reasignar: builder.mutation({
      query: ({ reasignarTicketStore, ticketId }) => {
        console.log(ticketId);
        const url = `tickets/reasignar/${ticketId}`;
        return {
          url,
          method: "PUT",
          body: reasignarTicketStore,
        };
      },
      invalidatesTags: ["Tickets", "Ticket", "Dashboard"],
    }),
    reabrir: builder.mutation({
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
      invalidatesTags: ["Tickets", "Ticket", "Dashboard"],
    }),
    cerrar: builder.mutation({
      query: ({ ticketId, formData }) => {
        const url = `tickets/cerrar/${ticketId}`;
        return {
          url,
          method: "PUT",
          body: formData,
          formData: true,
        };
      },
      invalidatesTags: ["Tickets", "Ticket", "Dashboard"],
    }),
    rechazarResolucion: builder.mutation({
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
      invalidatesTags: ["Tickets", "Ticket", "Dashboard"],
    }),
    aceptarResolucion: builder.mutation({
      query: ({ ticketId, Nombre }) => {
        const url = `tickets/resolver/aceptar/${ticketId}`;
        return {
          url,
          method: "PUT",
          body: { Nombre },
        };
      },
      invalidatesTags: ["Tickets", "Ticket", "Dashboard"],
    }),
  }),
});

export const {
  useTicketsQuery,
  useGetTicketByIdMutation,
  useResolverMutation,
  useAsignarMutation,
  useReasignarMutation,
  useRechazarResolucionMutation,
  useAceptarResolucionMutation,
  useReabrirMutation,
  useCrearMutation,
  useEditarMutation,
  useSelectsCrearTicketQuery,
  useCerrarMutation,
  useTicketsResolutorQuery,
  useNotaMutation,
} = ticketsApi;
