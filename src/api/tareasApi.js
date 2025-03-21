import { apiSlice } from "./apiSlice";

export const tareasApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    tareas: builder.query({
      query: ({ collection }) => {
        const url = `tareas/estado/${collection.toUpperCase()}`;
        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["Tareas"],
    }),
  }),
});

export const { useTareasQuery } = tareasApi;
