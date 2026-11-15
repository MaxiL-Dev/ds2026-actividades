import { z } from "zod";

export const autorCreateSchema = z.object({
  nombre: z.string().trim().min(1, "El nombre es obligatorio"),
  nacionalidad: z.string().trim().min(1, "La nacionalidad es obligatoria"),
});

export const autorUpdateSchema = autorCreateSchema.partial();