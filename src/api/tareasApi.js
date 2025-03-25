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
    //Creación de una tarea
    crearTarea: builder.mutation({
      query: ({ data }) => {
        const formData = new FormData();
        const tareaState = {
          Asignado_a: data.Asignado_a,
          Descripcion_tarea: data.Descripcion_tarea,
        };
        console.log("tareaState", tareaState);
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
            tareaState[key] = value;
          }
        });
        formData.append("tareaState", JSON.stringify(tareaState));
        for (let [key, value] of formData.entries()) {
          console.log(`${key}: ${value}`);
        }
        return {
          url: "tareas/crear/tarea",
          method: "POST",
          body: formData,
          formData: true,
        };
      },
      invalidatesTags: ["Tareas", "tarea"],
    }),
  }),
});

export const { useTareasQuery, useCrearTareaMutation } = tareasApi;
