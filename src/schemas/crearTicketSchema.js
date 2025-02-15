import { object, string, number, date, InferType, mixed, bool } from "yup";

export const crearTicketSchema = object().shape({
  Tipo_incidencia: string().required(),
  Area_asignado: string().required(),
  Asignado_a: string().required(),
  Categoria: string().required(),
  Servicio: string().required(),
  Subcategoria: string().required(),
  //Cliente: string().required(),
  //Descripcion: string().required(),
  //Prioridad: string().required(),
  Incidencia_grave: string(),
  Fecha_limite_respuesta_SLA: string(),
  NumeroRec_Oficio: string().nullable(),
  Files: mixed().nullable(),
  standby: bool().required(),
  isNuevoCliente: bool(),
});
