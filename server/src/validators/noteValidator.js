import {z} from 'zod';

export const noteSchema = z.object({
    //TODO: Do we require a user in the schema?
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
})