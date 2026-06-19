import { z } from "zod";

export const CATEGORY_OPTIONS = ["Foods", "Drinks", "Desserts", "Snacks"];

export const productSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  description: z.string().optional(),
  price: z.coerce.number().positive("Price must be a positive number"),
  image_url: z.any().optional(),
  category: z.enum(CATEGORY_OPTIONS, {
  errorMap: () => ({ message: "Please select a valid category" }),
  }),
});