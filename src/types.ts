import { AxiosStatic } from 'axios'
import { AddSubscriberInput } from './models/subscriber/types'

export type Config = {
  apiKey: string
  apiSecret?: string
  baseApiUrl?: string
}

export type Context = {
  axios: AxiosStatic
  api: {
    url: string
    key: string
    secret: string
  }
}

export type AddSubscriber = AddSubscriberInput & {
  formId: number
}
