import { z } from 'zod'

export const settingsSchema = z.object({
  name: z.string().optional(),
  isTwoFactorEnabled: z.boolean().optional(),
  role: z.enum(['ADMIN', 'USER']),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  newPassword: z.string().min(6).optional(),
})
  .refine((data) => {
    if (data.password && !data.newPassword) {
      return false
    }

    return true
  }, {
    message: 'New password is required!',
    path: ['newPassword']
  })
  .refine((data) => {
    if (data.newPassword && !data.password) {
      return false
    }

    return true
  }, {
    message: 'Password is required!',
    path: ['password']
  })

export type SettingsSchema = z.infer<typeof settingsSchema>

export const loginSchema = z.object({
  email: z.string().email('Email is required'),
  password: z.string().min(1, 'Password is required'),
  code: z.string().optional(),
})

export type LoginSchema = z.infer<typeof loginSchema>

export const registerSchema = z.object({
  email: z.string().email('Email is required'),
  password: z.string().min(6, 'Mininum of 6 characters required'),
  name: z.string().min(1, 'Name is required')
})

export type RegisterSchema = z.infer<typeof registerSchema>

export const resetSchema = z.object({
  email: z.string().email('Email is required'),
})

export type ResetSchema = z.infer<typeof resetSchema>

export const newPasswordSchema = z.object({
  password: z.string().min(6, 'Mininum of 6 characters required'),
})

export type NewPasswordSchema = z.infer<typeof newPasswordSchema>