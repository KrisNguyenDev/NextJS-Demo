import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import LoginForm from './login-form'
import { Suspense } from 'react'
import Loading from './loading'

export default function LoginPage() {
  return (
    <div className='flex justify-center mt-4'>
      <Card className='w-[350px] '>
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  )
}
