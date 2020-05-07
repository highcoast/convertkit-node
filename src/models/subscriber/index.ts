import * as types from './types'

export const addSubscriber = async ({
  context,
  input,
  formId,
}: types.AddSubscriber): Promise<types.AddSubscriberResponse> => {
  const { axios, api } = context
  if (!api.key || !api.url || !input.email || !input.tags || !formId) {
    throw new Error('Mandatory values missing')
  }
  const data: types.AddSubscriberRequestBody = {
    api_key: api.key,
    email: input.email,
    tags: input.tags,
  }
  if (input.fields && Object.keys(input.fields).length > 0) {
    data.tags = input.tags
  }
  if (input.first_name) {
    data.first_name = input.first_name
  }
  const res = await axios.post<types.AddSubscriberResponse>(`${api.url}/forms/${formId}/subscribe`, data)
  return res.data
}

export const getSubscriber = async ({ context, input }: types.GetSubscriber): Promise<types.GetSubscriberResponse> => {
  const { axios, api } = context
  if (!api.secret || !api.url || !input.subscriberId) {
    throw new Error('Mandatory values missing')
  }
  const res = await axios
    .get<types.GetSubscriberResponse>(`${api.url}/subscribers/${input.subscriberId}`, {
      params: {
        api_secret: api.secret,
      },
    })
    .catch((error) => {
      console.log('getSubscriber error', error)
      throw error
    })
  return res.data
}

export const removeSubscriber = async ({
  context,
  input,
}: types.RemoveSubscriber): Promise<types.RemoveSubscriberResponse> => {
  const { axios, api } = context
  if (!api.secret || !api.url || !input.email) {
    throw new Error('Mandatory values missing')
  }
  const data: types.RemoveSubscriberRequestBody = {
    api_secret: api.secret,
    email: input.email,
  }
  const res = await axios.put<types.RemoveSubscriberResponse>(`${api.url}/unsubscribe`, data).catch((error) => {
    console.log('removeSubscriber error', error)
    throw error
  })
  return res.data
}
