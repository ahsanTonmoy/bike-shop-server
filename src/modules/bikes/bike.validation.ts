import { z } from 'zod';

 const updateBikeValidationSchema = z.object({
  body: z.object({
  image: z.string().optional(),
  name: z.string().optional(),
  brand: z.string().optional(),
  price: z.number().min(0).optional(),
  category: z.enum(['Mountain', 'Road', 'Hybrid', 'Electric']).optional(),
  model:z.string().trim().optional(),
  description: z.string().optional(),
  quantity: z.number().int().min(0).optional(),
  inStock: z.boolean().optional()
})
});

const bikeValidationSchema = z.object({
body: z.object({
  image: z.string().optional(),
  name: z.string(),
  brand: z.string(),
  price: z.number().min(0),
  category: z.enum(['Mountain', 'Road', 'Hybrid', 'Electric']),
  model:z.string().trim(),
  description: z.string(),
  quantity: z.number().int().min(0),
  // inStock: z.boolean()
})
});

export const bikeValidation={
  bikeValidationSchema,
  updateBikeValidationSchema

};
