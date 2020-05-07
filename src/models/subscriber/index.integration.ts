import * as dotenv from 'dotenv'
dotenv.config()
import axios from 'axios'
import get from 'lodash/get'
import parseInt from 'lodash/parseInt'
import { addSubscriber, getSubscriber, removeSubscriber } from './index'

describe('addSubscriber', () => {
  it('works as expected with minimal input', async () => {
    expect.assertions(7)
    const apiKey = get(process, 'env.CONVERTKIT_API_KEY')
    const apiSecret = get(process, 'env.CONVERTKIT_API_SECRET')
    const emailToTest = get(process, 'env.CONVERTKIT_TESTING_EMAIL')
    const formId = parseInt(get(process, 'env.CONVERTKIT_TESTING_FORM_ID'))
    const tagId = parseInt(get(process, 'env.CONVERTKIT_TESTING_TAG_ID'))

    const res = await addSubscriber({
      context: {
        axios,
        api: {
          key: apiKey,
          secret: apiSecret,
          url: `https://api.convertkit.com/v3`,
        },
      },
      input: {
        email: emailToTest,
        tags: [tagId],
      },
      formId,
    })
    expect(res.subscription.state).toEqual('active')
    expect(res.subscription.subscribable_type).toEqual('form')
    expect(res.subscription.subscribable_id).toEqual(formId)
    expect(res.subscription.subscriber.id).toBeDefined()

    const subscriberId = res.subscription.subscriber.id
    const afterSubscribe = await getSubscriber({
      context: {
        axios,
        api: {
          key: apiKey,
          secret: apiSecret,
          url: `https://api.convertkit.com/v3`,
        },
      },
      input: {
        subscriberId,
      },
    })
    expect(afterSubscribe.subscriber.state).toEqual('active')

    const resRemove = await removeSubscriber({
      context: {
        axios,
        api: {
          key: apiKey,
          secret: apiSecret,
          url: `https://api.convertkit.com/v3`,
        },
      },
      input: {
        email: emailToTest,
      },
    })
    expect(resRemove.subscriber.state).toEqual('cancelled')

    const afterUnsubscribe = await getSubscriber({
      context: {
        axios,
        api: {
          key: apiKey,
          secret: apiSecret,
          url: `https://api.convertkit.com/v3`,
        },
      },
      input: {
        subscriberId,
      },
    })
    expect(afterUnsubscribe.subscriber.state).toEqual('cancelled')
  })
})
