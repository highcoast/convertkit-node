import axios from 'axios'
import * as types from './types'
import * as modelFunctions from './models'

export class Convertkit {
  private apiSecret: string = ''
  private apiKey: string
  private baseApiUrl: string = 'https://api.convertkit.com/v3'
  constructor(config: types.Config) {
    if (!config.apiKey) {
      throw new Error('Missing mandatory "apiKey" in configuration')
    }
    this.apiKey = config.apiKey

    if (config.apiSecret) {
      this.apiSecret = config.apiSecret
    }
    if (config.baseApiUrl) {
      this.baseApiUrl = config.baseApiUrl
    }
  }

  public async addSubscriber(props: types.AddSubscriber): Promise<void> {
    await modelFunctions.addSubscriber({
      context: {
        axios,
        api: {
          key: this.apiKey,
          secret: this.apiSecret,
          url: this.baseApiUrl,
        },
      },
      input: {
        email: props.email,
        tags: props.tags,
      },
      formId: props.formId,
    })
  }
}

export default Convertkit
