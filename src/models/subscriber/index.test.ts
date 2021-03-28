import axios, { AxiosResponse } from 'axios'
import { mocked } from 'ts-jest/dist/util/testing'
import { addSubscriber, getSubscriber, getSubscriberTags, removeSubscriber } from './index'
import * as types from './types'

jest.mock('axios')

describe('addSubscriber', () => {
  it('works as expected with minimal input', async () => {
    expect.assertions(2)

    const formId = 1111
    const axiosResponse: AxiosResponse<types.AddSubscriberResponse> = {
      data: {
        subscription: {
          id: 6423165,
          state: 'active',
          created_at: '2020-05-05T07:02:45.000Z',
          source: 'API::V3::SubscriptionsController (external)',
          referrer: null,
          subscribable_id: formId,
          subscribable_type: 'form',
          subscriber: {
            id: 1234,
          },
        },
      },
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    }
    mocked(axios.post).mockResolvedValue(axiosResponse)

    const context: types.AddSubscriber['context'] = {
      axios,
      api: {
        key: '123',
        secret: '456',
        url: `https://api.convertkit.com/v3`,
      },
    }
    const input: types.AddSubscriber['input'] = {
      email: 'test@test.com',
      tags: [1, 2, 3, 4],
    }
    const res = await addSubscriber({
      context,
      input,
      formId,
    })
    expect(axios.post).toHaveBeenCalledTimes(1)
    expect(res).toBe(axiosResponse.data)
    mocked(axios.post).mockReset()
  })
  it('works as expected with custom fields', async () => {
    expect.assertions(2)
    const formId = 1111
    const axiosResponse: AxiosResponse<types.AddSubscriberResponse> = {
      data: {
        subscription: {
          id: 6423165,
          state: 'active',
          created_at: '2020-05-05T07:02:45.000Z',
          source: 'API::V3::SubscriptionsController (external)',
          referrer: null,
          subscribable_id: formId,
          subscribable_type: 'form',
          subscriber: {
            id: 1234,
          },
        },
      },
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    }
    mocked(axios.post).mockResolvedValue(axiosResponse)

    const context: types.AddSubscriber['context'] = {
      axios,
      api: {
        key: '123',
        secret: '456',
        url: `https://api.convertkit.com/v3`,
      },
    }
    const input: types.AddSubscriber['input'] = {
      email: 'test@test.com',
      tags: [1, 2, 3, 4],
      fields: {
        a: '1',
        b: 2,
        c: 'c',
      },
    }
    const res = await addSubscriber({
      context,
      input,
      formId,
    })
    expect(axios.post).toHaveBeenCalledTimes(1)
    expect(res).toBe(axiosResponse.data)
    mocked(axios.post).mockReset()
  })
  it('works as expected with first name', async () => {
    expect.assertions(2)
    const formId = 1111
    const axiosResponse: AxiosResponse<types.AddSubscriberResponse> = {
      data: {
        subscription: {
          id: 6423165,
          state: 'active',
          created_at: '2020-05-05T07:02:45.000Z',
          source: 'API::V3::SubscriptionsController (external)',
          referrer: null,
          subscribable_id: formId,
          subscribable_type: 'form',
          subscriber: {
            id: 1234,
          },
        },
      },
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    }
    mocked(axios.post).mockResolvedValue(axiosResponse)

    const context: types.AddSubscriber['context'] = {
      axios,
      api: {
        key: '123',
        secret: '456',
        url: `https://api.convertkit.com/v3/forms/1111/subscribe`,
      },
    }
    const input: types.AddSubscriber['input'] = {
      email: 'test@test.com',
      first_name: 'awesome',
      tags: [1, 2, 3, 4],
    }
    const res = await addSubscriber({
      context,
      input,
      formId,
    })
    expect(axios.post).toHaveBeenCalledTimes(1)
    expect(res).toBe(axiosResponse.data)
    mocked(axios.post).mockReset()
  })
  it('works as expected with everything', async () => {
    expect.assertions(2)
    const formId = 1111
    const axiosResponse: AxiosResponse<types.AddSubscriberResponse> = {
      data: {
        subscription: {
          id: 6423165,
          state: 'active',
          created_at: '2020-05-05T07:02:45.000Z',
          source: 'API::V3::SubscriptionsController (external)',
          referrer: null,
          subscribable_id: formId,
          subscribable_type: 'form',
          subscriber: {
            id: 1234,
          },
        },
      },
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    }
    mocked(axios.post).mockResolvedValue(axiosResponse)

    const context: types.AddSubscriber['context'] = {
      axios,
      api: {
        key: '123',
        secret: '456',
        url: `https://api.convertkit.com/v3/forms/1111/subscribe`,
      },
    }
    const input: types.AddSubscriber['input'] = {
      email: 'test@test.com',
      first_name: 'awesome',
      fields: {
        a: '1',
        b: 2,
        c: 'c',
      },
      tags: [1, 2, 3, 4],
    }
    const res = await addSubscriber({
      context,
      input,
      formId,
    })
    expect(axios.post).toHaveBeenCalledTimes(1)
    expect(res).toBe(axiosResponse.data)
    mocked(axios.post).mockReset()
  })
})

describe('getSubscriber', () => {
  it('works as expected with minimal input', async () => {
    expect.assertions(2)
    const axiosResponse: AxiosResponse<types.GetSubscriberResponse> = {
      data: {
        subscriber: {
          id: 1234,
          first_name: null,
          email_address: 'test@test.com',
          state: 'active',
          created_at: '2020-04-21T15:00:57.000Z',
          fields: {},
        },
      },
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    }
    mocked(axios.get).mockResolvedValue(axiosResponse)

    const context: types.GetSubscriber['context'] = {
      axios,
      api: {
        key: '123',
        secret: '456',
        url: `https://api.convertkit.com/v3`,
      },
    }
    const input: types.GetSubscriber['input'] = {
      subscriberId: 1234,
    }
    const res = await getSubscriber({
      context,
      input,
    })
    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(res).toBe(axiosResponse.data)
    mocked(axios.get).mockReset()
  })
})

describe('getSubscriberTags', () => {
  it('works as expected with minimal input', async () => {
    expect.assertions(2)
    const axiosResponse: AxiosResponse<types.GetSubscriberTagsResponse> = {
      data: {
        tags: [
          {
            id: 1234,
            name: 'test_tag_1',
            created_at: '2021-03-19T00:54:50.000Z',
          },
          {
            id: 5678,
            name: 'test_tag_2',
            created_at: '2021-03-28T15:27:48.000Z',
          },
        ],
      },
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    }
    mocked(axios.get).mockResolvedValue(axiosResponse)

    const context: types.GetSubscriberTags['context'] = {
      axios,
      api: {
        key: '123',
        secret: '456',
        url: `https://api.convertkit.com/v3`,
      },
    }
    const input: types.GetSubscriberTags['input'] = {
      subscriberId: 1234,
    }
    const res = await getSubscriberTags({
      context,
      input,
    })
    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(res).toBe(axiosResponse.data)
    mocked(axios.get).mockReset()
  })
})

describe('removeSubscriber', () => {
  it('works as expected with minimal input', async () => {
    expect.assertions(2)
    const emailToUnsubscribe = 'test@test.com'
    const axiosResponse: AxiosResponse<types.RemoveSubscriberResponse> = {
      data: {
        subscriber: {
          id: 1234,
          first_name: null,
          email_address: emailToUnsubscribe,
          state: 'cancelled',
          created_at: '2020-04-21T15:00:57.000Z',
          fields: {},
        },
      },
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    }
    mocked(axios.put).mockResolvedValue(axiosResponse)

    const context: types.RemoveSubscriber['context'] = {
      axios,
      api: {
        key: '123',
        secret: '456',
        url: `https://api.convertkit.com/v3`,
      },
    }
    const input: types.RemoveSubscriber['input'] = {
      email: emailToUnsubscribe,
    }
    const res = await removeSubscriber({
      context,
      input,
    })
    expect(axios.put).toHaveBeenCalledTimes(1)
    expect(res).toBe(axiosResponse.data)
    mocked(axios.put).mockReset()
  })
})
