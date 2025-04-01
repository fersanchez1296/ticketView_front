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
      keepUnusedDataFor: 0,
      invalidatesTags: ["Tickets"],
    }),
    reabrirFields: builder.query({
      query: () => {
        const url = `tickets/reabrir/fields`;
        return {
          url,
          method: "GET",
        };
      },
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
        console.log(data);
        const formData = new FormData();
        const ticketState = {};
        delete data.correocliente;
        const [_id, Nombre] = data.Asignado_a.split("|");
        data.Asignado_a = _id;
        console.log("Asignado", data.Asignado_a);
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
        for (let [key, value] of formData.entries()) {
          console.log(`${key}: ${value}`);
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
        const ticketData = {
          Nota: data.Nota,
        };
        const ticketId = data._id;
        if (data.Files) {
          Object.entries(data).forEach(([key, value]) => {
            if (key === "Files" && Array.isArray(value)) {
              value.forEach((file) => {
                if (file instanceof File) {
                  formData.append("files", file);
                } else {
                  console.error(`El archivo no es válido:`, file);
                }
              });
            }
          });
        }
        formData.append("ticketData", JSON.stringify(ticketData));
        for (let pair of formData.entries()) {
          console.log(`${pair[0]}: ${pair[1]}`);
        }
        return {
          url: `/tickets/nota/${ticketId}`,
          method: "PUT",
          body: formData,
          formData: true,
        };
      },
      invalidatesTags: ["Tickets", "Ticket", "Dashboard"],
    }),
    retornoMesa: builder.mutation({
      query: ({ data }) => {
        const formData = new FormData();
        const ticketData = {
          descripcion_retorno: data.descripcion_retorno,
        };
        const ticketId = data._id;
        if (data.Files) {
          Object.entries(data).forEach(([key, value]) => {
            if (key === "Files" && Array.isArray(value)) {
              value.forEach((file) => {
                if (file instanceof File) {
                  formData.append("files", file);
                } else {
                  console.error(`El archivo no es válido:`, file);
                }
              });
            }
          });
        }
        formData.append("ticketData", JSON.stringify(ticketData));
        for (let pair of formData.entries()) {
          console.log(`${pair[0]}: ${pair[1]}`);
        }
        return {
          url: `/tickets/retornoMesa/${ticketId}`,
          method: "PUT",
          body: formData,
          formData: true,
        };
      },
      invalidatesTags: ["Tickets", "Ticket", "Dashboard"],
    }),
    //Editar ticket
    editar: builder.mutation({
      query: ({ data }) => {
        const formData = new FormData();
        const ticketId = data._id;
        const ticketData = {
          NumeroRec_Oficio: data.NumeroRec_Oficio,
          // Subcategoria: data.Subcategoria,
          Descripcion: data.Descripcion,
          Medio: data.Medio._id,
        };
        if (data.Files) {
          Object.entries(data).forEach(([key, value]) => {
            if (key === "Files" && Array.isArray(value)) {
              value.forEach((file) => {
                if (file instanceof File) {
                  formData.append("files", file);
                } else {
                  console.error(`El archivo no es válido:`, file);
                }
              });
            }
          });
        }
        formData.append("ticketData", JSON.stringify(ticketData));
        // for (let pair of formData.entries()) {
        //   console.log(`${pair[0]}: ${pair[1]}`);
        // }
        return {
          url: `/tickets/editar/${ticketId}`,
          method: "PUT",
          body: formData,
          formData: true,
        };
      },
      invalidatesTags: ["Tickets"],
    }),
    resolver: builder.mutation({
      query: ({ data }) => {
        const formData = new FormData();
        const ticketId = data._id;
        const ticketData = {
          _id: ticketId,
          Respuesta_cierre_reasignado: data.Respuesta_cierre_reasignado,
          vistoBueno: data.vistoBueno,
        };
        if (data.Files) {
          Object.entries(data).forEach(([key, value]) => {
            if (key === "Files" && Array.isArray(value)) {
              value.forEach((file) => {
                if (file instanceof File) {
                  formData.append("files", file);
                } else {
                  console.error(`El archivo no es válido:`, file);
                }
              });
            }
          });
        }
        formData.append("ticketData", JSON.stringify(ticketData));
        for (let [key, value] of formData.entries()) {
          console.log(`${key}: ${value}`);
        }
        return {
          url: `/tickets/resolver/${ticketId}`,
          method: "PUT",
          body: formData,
          formData: true,
        };
      },
      invalidatesTags: ["Tickets", "Ticket", "Dashboard"],
    }),
    asignar: builder.mutation({
      query: ({ data }) => {
        const formData = new FormData();
        const ticketId = data._id;
        const ticketData = {};
        const AuxData = {
          Asignado_a: data.Asignado_a,
          asignado_a: data.asignado_a ?? "",
          Prioridad: data.Prioridad,
          Files: data.Files,
        };
        if (data.Nota) {
          AuxData.Nota = data.Nota;
        }
        delete AuxData.Prioridad;
        const aux = AuxData.asignado_a;
        const [Asignado_a, Area_asignado] = aux.split("|");
        AuxData.Asignado_a = Asignado_a;
        delete AuxData.asignado_a;
        if (data.prioridad) {
          const aux = data.prioridad;
          const [Prioridad, tiempo] = aux.split("|");
          AuxData.Prioridad = Prioridad;
          AuxData.tiempo = tiempo;
        }
        Object.entries(AuxData).forEach(([key, value]) => {
          if (key === "Files" && Array.isArray(value)) {
            value.forEach((file) => {
              if (file instanceof File) {
                formData.append("files", file);
              } else {
                console.error(`El archivo no es válido:`, file);
              }
            });
          } else {
            ticketData[key] = value;
          }
        });
        formData.append("ticketData", JSON.stringify(ticketData));
        for (let pair of formData.entries()) {
          console.log(`${pair[0]}: ${pair[1]}`);
        }
        return {
          url: `tickets/asignar/${ticketId}`,
          method: "PUT",
          body: formData,
          formData: true,
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
      query: ({ data }) => {
        const formData = new FormData();
        const ticketId = data._id;
        const ticketData = {};
        const AuxData = {
          Asignado_a: data.Asignado_a,
          asignado_a: data.asignado_a ?? "",
          Prioridad: data.Prioridad,
          prioridad: data.prioridad ?? "",
          descripcionReabierto: data.Descripcion,
          Files: data.Files,
        };
        if (typeof AuxData.Asignado_a === "object") {
          delete AuxData.Asignado_a;
          delete AuxData.Prioridad;
          delete AuxData.asignado_a;
          delete AuxData.prioridad;
        } else {
          AuxData.Prioridad = "";
          const aux = AuxData.asignado_a;
          const auxPrioridad = AuxData.prioridad;
          const [Asignado_a, Area_asignado] = aux.split("|");
          const [Prioridad, tiempo] = auxPrioridad.split("|");
          AuxData.Asignado_a = Asignado_a;
          AuxData.Area_asignado = Area_asignado;
          AuxData.Prioridad = Prioridad;
          AuxData.tiempo = tiempo;
          delete AuxData.asignado_a;
          delete AuxData.prioridad;
        }
        Object.entries(AuxData).forEach(([key, value]) => {
          if (key === "Files" && Array.isArray(value)) {
            value.forEach((file) => {
              if (file instanceof File) {
                formData.append("files", file);
              } else {
                console.error(`El archivo no es válido:`, file);
              }
            });
          } else {
            ticketData[key] = value;
          }
        });
        formData.append("ticketData", JSON.stringify(ticketData));
        for (let pair of formData.entries()) {
          console.log(`${pair[0]}: ${pair[1]}`);
        }
        return {
          url: `tickets/reabrir/${ticketId}`,
          method: "PUT",
          body: formData,
          formData: true,
        };
      },
      invalidatesTags: ["Tickets", "Ticket", "Dashboard"],
    }),
    cerrar: builder.mutation({
      query: ({ data }) => {
        const formData = new FormData();
        const ticketId = data._id;
        const ticketData = {
          _id: ticketId,
          Numero_Oficio: data.Numero_Oficio,
          Descripcion_cierre: data.Respuesta_cierre_reasignado,
        };
        if (data.Files) {
          Object.entries(data).forEach(([key, value]) => {
            if (key === "Files" && Array.isArray(value)) {
              value.forEach((file) => {
                if (file instanceof File) {
                  formData.append("files", file);
                } else {
                  console.error(`El archivo no es válido:`, file);
                }
              });
            }
          });
        }
        formData.append("ticketData", JSON.stringify(ticketData));
        for (let [key, value] of formData.entries()) {
          console.log(`${key}: ${value}`);
        }
        return {
          url: `/tickets/cerrar/${ticketId}`,
          method: "PUT",
          body: formData,
          formData: true,
        };
      },
      invalidatesTags: ["Tickets", "Ticket", "Dashboard"],
    }),
    rechazarResolucion: builder.mutation({
      query: ({ data }) => {
        const formData = new FormData();
        const ticketId = data._id;
        const Nombre = data.Resuelto_por.Nombre;
        const ticketData = {
          feedback: data.feedback,
          Nombre,
        };
        if (data.Files) {
          Object.entries(data).forEach(([key, value]) => {
            if (key === "Files" && Array.isArray(value)) {
              value.forEach((file) => {
                if (file instanceof File) {
                  formData.append("files", file);
                } else {
                  console.error(`El archivo no es válido:`, file);
                }
              });
            }
          });
        }
        formData.append("ticketData", JSON.stringify(ticketData));
        return {
          url: `/tickets/resolver/rechazar/${ticketId}`,
          method: "PUT",
          body: formData,
          formData: true,
        };
      },
      invalidatesTags: ["Tickets", "Ticket", "Dashboard"],
    }),
    aceptarResolucion: builder.mutation({
      query: ({ data }) => {
        const ticketId = data._id;
        const Nombre = data.Resuelto_por.Nombre;
        return {
          url: `/tickets/resolver/aceptar/${ticketId}`,
          method: "PUT",
          body: { Nombre },
        };
      },
      invalidatesTags: ["Tickets", "Ticket", "Dashboard"],
    }),
    //Pendiente
    putPendiente: builder.mutation({
      query: ({ data }) => {
        const ticketId = data._id;
        const auxData = {
          Id: data.Id,
          cuerpo: data.cuerpo,
        };
        return {
          url: `tickets/pendiente/${ticketId}`,
          method: "PUT",
          body: auxData,
        };
      },
      invalidatesTags: ["Tickets"],
    }),
    putRegresarTicket: builder.mutation({
      query: ({ data }) => {
        const formData = new FormData();
        const ticketData = {
          Descripcion_respuesta_cliente: data.Descripcion_respuesta_cliente,
        };
        const ticketId = data._id;
        if (data.Files) {
          Object.entries(data).forEach(([key, value]) => {
            if (key === "Files" && Array.isArray(value)) {
              value.forEach((file) => {
                if (file instanceof File) {
                  formData.append("files", file);
                } else {
                  console.error(`El archivo no es válido:`, file);
                }
              });
            }
          });
        }
        formData.append("ticketData", JSON.stringify(ticketData));
        for (let pair of formData.entries()) {
          console.log(`${pair[0]}: ${pair[1]}`);
        }
        return {
          url: `/tickets/regresar/${ticketId}`,
          method: "PUT",
          body: formData,
          formData: true,
        };
      },
      invalidatesTags: ["Tickets"],
    }),
    getCorreos: builder.query({
      query: ({ ticketId }) => {
        const url = `tickets/correos/${ticketId}`;
        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["Tickets"],
    }),
    //obtener clientes
    getClientes: builder.query({
      query: () => {
        const url = `tickets/clientes/dependencias`;
        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["Clientes", "Tickets"],
    }),
    contactoCliente: builder.mutation({
      query: ({ data }) => {
        const formData = new FormData();
        const auxData = {
          cuerpo: data.cuerpo,
        };
        const ticketId = data._id;
        if (data.Files) {
          Object.entries(data).forEach(([key, value]) => {
            if (key === "Files" && Array.isArray(value)) {
              value.forEach((file) => {
                if (file instanceof File) {
                  formData.append("files", file);
                } else {
                  console.error(`El archivo no es válido:`, file);
                }
              });
            }
          });
        }
        formData.append("ticketData", JSON.stringify(auxData));
        for (let pair of formData.entries()) {
          console.log(`${pair[0]}: ${pair[1]}`);
        }
        return {
          url: `tickets/contactoCliente/${ticketId}`,
          method: "PUT",
          body: auxData,
        };
      },
      invalidatesTags: ["Tickets"],
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
  useReabrirFieldsQuery,
  usePutPendienteMutation,
  usePutRegresarTicketMutation,
  useGetCorreosQuery,
  useGetClientesQuery,
  useContactoClienteMutation,
  useRetornoMesaMutation,
} = ticketsApi;
