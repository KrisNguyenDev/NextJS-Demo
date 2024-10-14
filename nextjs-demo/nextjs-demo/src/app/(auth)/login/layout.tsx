import React, { Suspense } from 'react'
import Loading from './loading'

interface Props {
  children: React.ReactNode
}

export default function LoginLayout({ children }: Props) {
  return <Suspense fallback={<Loading />}>{children}</Suspense>
}
