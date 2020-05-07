import * as rootTypes from '../../types'

type SubscriptionState = 'active' | 'inactive' | 'cancelled'

type CustomFields = {
  [key: string]: unknown
}
export type AddSubscriberInput = {
  email: string
  tags: number[]
  first_name?: string
  fields?: CustomFields
}
export type AddSubscriberRequestBody = AddSubscriberInput & {
  api_key: string
}
export type AddSubscriber = {
  context: rootTypes.Context
  input: AddSubscriberInput
  formId: number
}

export type AddSubscriberResponse = {
  subscription: {
    id: number
    state: SubscriptionState
    created_at: string
    source: string
    referrer: string | null
    subscribable_id: number
    subscribable_type: string
    subscriber: {
      id: number
    }
  }
}

export type GetSubscriberInput = {
  subscriberId: number
}
export type GetSubscriber = {
  context: rootTypes.Context
  input: GetSubscriberInput
}
export type GetSubscriberResponse = {
  subscriber: {
    id: number
    first_name: string | null
    email_address: string
    state: SubscriptionState
    created_at: string
    fields: CustomFields
  }
}

export type RemoveSubscriberInput = {
  email: string
}
export type RemoveSubscriberRequestBody = RemoveSubscriberInput & {
  api_secret: string
}
export type RemoveSubscriber = {
  context: rootTypes.Context
  input: RemoveSubscriberInput
}
export type RemoveSubscriberResponse = {
  subscriber: {
    id: number
    first_name: string | null
    email_address: string
    state: SubscriptionState
    created_at: string
    fields: CustomFields
  }
}
