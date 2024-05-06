'use client'

import { useForm } from "react-hook-form"
import { useSession } from "next-auth/react"
import { useState, useTransition } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { settings } from "@/actions/settings"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { SettingsSchema, settingsSchema } from "@/schemas"
import { Input } from "@/components/ui/input"
import { useCurrentUser } from "@/hooks/use-current-user"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
  const user = useCurrentUser()
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  const [pending, startTransition] = useTransition()
  const { update } = useSession()

  const form = useForm<SettingsSchema>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      name: user?.name ?? undefined,
      email: user?.email ?? undefined,
      password: undefined,
      newPassword: undefined,
      role: user?.role ?? undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled ?? undefined
    }
  })

  function onSubmit(values: SettingsSchema) {
    setError('')
    setSuccess('')

    startTransition(() => {
      settings(values)
        .then((data) => {
          if (data.error) {
            setError(data.error)
          }

          if (data.success) {
            update()
            setSuccess(data.success)
          }
        })
        .catch(() => setError('Something went wrong!'))
    })
  }

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">
          ⚙ Settings
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField 
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input  
                        type="text"
                        placeholder="John Doe"
                        disabled={pending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {user?.isOAuth === false && (
                <>
                  <FormField 
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input  
                            type="text"
                            placeholder="johndoe@example.com"
                            disabled={pending}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField 
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input  
                            type="password"
                            placeholder="******"
                            disabled={pending}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField 
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input  
                            type="password"
                            placeholder="******"
                            disabled={pending}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              <FormField 
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      disabled={pending}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ADMIN">
                          Admin
                        </SelectItem>
                        <SelectItem value="USER">
                          User
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {user?.isOAuth === false && (
                <FormField 
                  control={form.control}
                  name="isTwoFactorEnabled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Two Factor Authentication</FormLabel>
                        <FormDescription>
                          Enable two factor authentication for you account. <br />
                          A code will arrive in your email on Log In.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch disabled={pending} checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
              />
              )}
              
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button type="submit" disabled={pending}>Save</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}