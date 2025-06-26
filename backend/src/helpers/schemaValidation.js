import { z } from "zod";

const SchemaValidation = {
  studentSchema: z.object({
    name: z
      .string({ required_error: "name is required" })
      .min(3, { message: "Name must be atleast of 3 characters" })
      .max(255, { message: "Name must not be more than 255 characters" }),

    email: z
      .string({ required_error: "email is required" })
      .trim()
      .email({ message: "Invalid email address" })
      .min(3, { message: "Email must be atleast of 3 characters" })
      .max(255, { message: "Email must not be more than 255 characters" }),

    password: z
      .string({ required_error: "Password is required" })
      .min(3, { message: "Password must be atleast of 3 characters" })
      .max(255, { message: "Password must not be more than 255 characters" }),
  }),
  courseSchema: z.object({
    name: z
      .string({ required_error: "name is required" })
      .min(3, { message: "Name must be atleast of 3 characters" })
      .max(255, { message: "Name must not be more than 255 characters" }),

    price: z
      .number({ required_error: "price is required" })
      .min(0, { message: "Price must be a positive number" }),

    isRegistrationOpen: z.boolean().optional(),
  }),
};
export default SchemaValidation;
