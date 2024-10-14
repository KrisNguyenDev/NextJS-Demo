import apiAccount from '@/apis/account'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AccountResType } from '@/schemaValidations/account.schema'
import { cookies } from 'next/headers'
import { useEffect, useState } from 'react'

export default async function Profile() {
  const cookieStore = cookies()
  const sessionToken = cookieStore.get('sessionToken')

  const result = await apiAccount.meFromServer(sessionToken?.value ?? '')

  return (
    <Card className='w-3/4 mx-auto mt-4'>
      <CardHeader>
        <CardTitle>Xin chào {result?.payload?.data?.name}</CardTitle>
        <CardDescription>Chào mừng bạn nhé</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col space-y-3'>
          <div>
            <Label>Id</Label>
            <Input className='mt-2' value={result?.payload?.data?.id} disabled />
          </div>
          <div>
            <Label>Họ và tên</Label>
            <Input className='mt-2' value={result?.payload?.data?.name} disabled />
          </div>
          <div>
            <Label>Email</Label>
            <Input className='mt-2' value={result?.payload?.data?.email} disabled />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
