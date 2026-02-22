import { z } from "zod";

export const updateProfileSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(30)
    .regex(/^[a-zA-Z0-9_-]+$/, "Only letters, numbers, hyphens, and underscores")
    .optional(),
  profession: z.string().max(100).optional(),
  company: z.string().max(100).optional(),
  phone: z.string().max(20).optional(),
  whatsapp: z.string().max(20).optional(),
  address: z.string().max(500).optional(),
  socialLinks: z.record(z.string()).optional(),
  profileEnabled: z.boolean().optional(),
  paymentEnabled: z.boolean().optional(),
  paymentType: z.enum(["fixed", "flexible"]).optional(),
  fixedAmount: z.number().int().positive().optional().nullable(),
  interacEmail: z.string().email().optional().nullable(),
  theme: z.string().optional(),
  country: z.string().length(2).optional(),
  currency: z.string().length(3).optional(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;

export const updateCardSettingsSchema = z.object({
  cardType: z.enum(["business", "wedding", "engagement", "anniversary"]).optional(),
  collection: z.string().optional().nullable(),
  selectedTemplateId: z.string().optional().nullable(),
  orientation: z.enum(["horizontal", "vertical"]).optional(),
  cardSize: z.enum(["standard", "large"]).optional(),
  weddingDate: z.string().optional().nullable(),
  venue: z.string().optional().nullable(),
  brideName: z.string().optional().nullable(),
  groomName: z.string().optional().nullable(),
  brideParentNames: z.string().optional().nullable(),
  groomParentNames: z.string().optional().nullable(),
  deceasedElders: z.string().optional().nullable(),
});

export type UpdateCardSettingsInput = z.infer<typeof updateCardSettingsSchema>;

export const createWeddingInviteSchema = z.object({
  slug: z
    .string()
    .min(3)
    .max(60)
    .regex(/^[a-z0-9-]+$/, "Only lowercase letters, numbers, and hyphens"),
  templateId: z.string(),
  groomName: z.string().optional(),
  brideName: z.string().optional(),
  weddingDate: z.string().optional(),
  receptionDate: z.string().optional(),
  venue: z.string().optional(),
  venueAddress: z.string().optional(),
  story: z.string().max(2000).optional(),
  couplePhoto: z.string().optional(),
  backgroundImage: z.string().optional(),
  weddingTime: z.string().optional(),
  groomFatherName: z.string().max(100).optional(),
  groomMotherName: z.string().max(100).optional(),
  brideFatherName: z.string().max(100).optional(),
  brideMotherName: z.string().max(100).optional(),
  coupleMessage: z.string().max(2000).optional(),
  events: z
    .array(
      z.object({
        name: z.string(),
        date: z.string(),
        venue: z.string(),
        time: z.string(),
      }),
    )
    .optional(),
  extraData: z.record(z.unknown()).optional(),
});

export type CreateWeddingInviteInput = z.infer<typeof createWeddingInviteSchema>;

export const submitRsvpSchema = z.object({
  inviteSlug: z.string(),
  guestName: z.string().min(1).max(100),
  guestEmail: z.string().email().optional(),
  phone: z.string().max(20).optional(),
  attending: z.enum(["yes", "no", "maybe"]),
  numberOfGuests: z.number().int().min(1).max(10).default(1),
  dietaryRestrictions: z.string().max(500).optional(),
  message: z.string().max(1000).optional(),
});

export type SubmitRsvpInput = z.infer<typeof submitRsvpSchema>;

export const signupSchema = z
  .object({
    name: z.string().min(2).max(50),
    username: z
      .string()
      .min(3)
      .max(30)
      .regex(/^[a-zA-Z0-9_-]+$/, "Only letters, numbers, hyphens, and underscores"),
    email: z.string().email(),
    password: z.string().min(8).max(100),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type SignupInput = z.infer<typeof signupSchema>;
