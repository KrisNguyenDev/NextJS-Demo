'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LoginBody, LoginBodyType } from '@/schemaValidations/auth.schema'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { useAppContext } from '@/context/AppProvider'

export default function LoginForm() {
  const { toast } = useToast()
  const { setSessionToken } = useAppContext()

  // 1. Define your form.
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  // 2. Define a submit handler.
  async function onSubmit(values: LoginBodyType) {
    try {
      const result = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      }).then(async (res) => {
        const payload = await res.json()
        const data = { status: res.status, payload }
        if (!res.ok) {
          throw data
        }
        return data
      })

      toast({
        description: result.payload?.message
      })

      console.log(result)

      // lưu token vào cookie
      const resultFromNextServer = await fetch('/api/auth', {
        method: 'POST',
        body: JSON.stringify(result),
        headers: { 'Content-Type': 'application/json' }
      }).then(async (res) => {
        const data = await res.json()
        if (!res.ok) {
          throw data
        }
        return data
      })

      console.log(resultFromNextServer)

      // set token vào context
      setSessionToken(resultFromNextServer?.data?.token)
    } catch (error: any) {
      const errors = error.payload?.errors

      if (error.status === 422) {
        errors.forEach((error: any) => {
          form.setError(error.field as 'email' | 'password', {
            type: 'server',
            message: error.message
          })
        })
      } else {
        toast({
          variant: 'destructive',
          title: 'Lỗi',
          description: error.payload?.message
        })
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <Label>Email</Label>
              <FormControl>
                <Input placeholder='email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <Label>Mật khẩu</Label>
              <FormControl>
                <Input placeholder='password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  )
}
