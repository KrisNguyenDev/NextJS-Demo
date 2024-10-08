import { cookies } from 'next/headers'

export default async function ProfilePage() {
  const cookieStore = cookies()
  const sessionToken = cookieStore.get('sessionToken')

  const result = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/account/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bear ${sessionToken?.value}`
    }
  }).then(async (res) => {
    const payload = await res.json()
    const data = { status: res.status, payload }
    if (res.ok) {
      return data
    }
  })
  console.log(result)
  return <div>page</div>
}
