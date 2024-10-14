import { LoginResType } from '@/schemaValidations/auth.schema'
import { CustomOptions, HttpMethod } from '@/types/http.type'
// import { cookies } from 'next/headers'

class HttpError extends Error {
  status: number
  payload: any
  constructor({ status, payload }: { status: number; payload: any }) {
    super('Http Error')
    this.status = status
    this.payload = payload
  }
}

class SessionToken {
  private token = ''
  public get value(): string {
    return this.token
  }
  public set value(v: string) {
    // nếu gọi method này ở server thì sẽ lỗi
    if (typeof window === undefined) throw new Error('Canot set token on server side')

    this.token = v
  }
}

export const sessionToken = new SessionToken()

const request = async <Response>(method: HttpMethod, url: string, options?: CustomOptions | undefined) => {
  const body = options?.body ? JSON.stringify(options.body) : undefined
  const baseHeaders = {
    'Content-Type': 'application/json',
    Authorization: sessionToken ? `Bearer ${sessionToken.value}` : ''
  }

  const baseUrl = options?.baseUrl === undefined ? process.env.NEXT_PUBLIC_API_ENDPOINT : options.baseUrl

  const fullUrl = url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`

  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers
    },
    body: body,
    method: method
  })

  const payload: Response = await res.json()

  const data = {
    status: res.status,
    payload: payload
  }

  if (!res.ok) {
    throw new HttpError(data)
  }

  if (['/auth/login', '/auth/register'].includes(url)) {
    sessionToken.value = (payload as LoginResType).data.token
  }

  return data
}

const http = {
  get<Response>(url: string, options?: Omit<CustomOptions, 'body'> | undefined) {
    return request<Response>(HttpMethod.GET, url, options)
  },

  post<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
    return request<Response>(HttpMethod.POST, url, { ...options, body: body })
  },

  put<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
    return request<Response>(HttpMethod.PUT, url, { ...options, body: body })
  },

  delete<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined) {
    return request<Response>(HttpMethod.DELETE, url, { ...options, body: body })
  },

  patch<Response>(url: string, body: any, options: Omit<CustomOptions, 'body'> | undefined) {
    return request<Response>(HttpMethod.PATCH, url, { ...options, body: body })
  }
}

export default http
