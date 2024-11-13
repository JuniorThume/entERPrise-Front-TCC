import { z } from "zod";
import { UpdateEmployeeFormSchema } from "./schema";


type updateEmployeeFormData = z.infer<typeof UpdateEmployeeFormSchema>