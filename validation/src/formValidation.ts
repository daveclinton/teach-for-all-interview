import { z } from 'zod';
import { ZodError } from 'zod';

export const nameSchema = z.string().min(1, { message: 'Name is required' });

export const emailSchema = z
  .string()
  .email({ message: 'Invalid email address' });

export const phoneSchema = z
  .string()
  .regex(/^\d{10}$/, { message: 'Phone must be 10 digits' });

export const messageSchema = z
  .string()
  .min(1, { message: 'Message is required' });

export const formSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  message: messageSchema,
});

export type FormData = z.infer<typeof formSchema>;
export const errors: Partial<Record<keyof FormData, string>> = {};

export const validateForm = (data: Partial<FormData>) => {
  try {
    formSchema.parse(data);
    return { success: true, errors: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.reduce((acc, curr) => {
        const key = curr.path[0] as keyof FormData;
        acc[key] = curr.message;
        return acc;
      }, {} as Partial<Record<keyof FormData, string>>);
      return { success: false, errors };
    }
    return { success: false, errors: { form: 'An unexpected error occurred' } };
  }
};

export const validateField = (key: keyof FormData, value: string) => {
  try {
    formSchema.shape[key].parse(value);
    return { success: true, error: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0].message };
    }
    return { success: false, error: 'An unexpected error occurred' };
  }
};
