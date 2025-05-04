import { z } from 'zod';


const orderValidationSchema = z.object({
  body: z.object({
   
    products: z.array(
      z.object({
        _id: z.string().min(1, "Product ID is required"),
        quantity: z.number().int().min(1, "Quantity must be at least 1"),
      })
    ).min(1, "At least one product is required"),

  }),
});


export const orderValidation = {
  orderValidationSchema,
};
