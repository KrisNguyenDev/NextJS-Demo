import http from '@/lib/http'
import { AccountResType } from '@/schemaValidations/account.schema'

const apiAccount = {
  me: () => http.get<AccountResType>('/account/me'),
  meFromServer: (sessionToken: string) =>
    http.get<AccountResType>('account/me', {
      headers: {
        Authorization: `Bearer ${sessionToken}`
      }
    })
}

export default apiAccount
