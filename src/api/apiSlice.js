import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    //baseUrl: `http://172.16.1.13:4000/api/v1/`,
    baseUrl: "http://localhost:4000/api/v1/",
    credentials: "include",
  }),
  tagTypes: [
    "Tickets",
    "Ticket",
    "Usuarios",
    "Usuario",
    "Dashboard",
    "Historico",
    "Coordinacion",
    "Clientes",
    "Cliente",
    "SelectsCrearTicket",
    "SelectsCliente",
    "Roles",
    "TicketsArea",
    "ResolutoresPorModerador",
    "TicketsResolutor",
  ],
  endpoints: () => ({}), // Se dejan vacíos para inyectarlos en otros archivos
});
