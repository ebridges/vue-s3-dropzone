/* eslint-env browser */
import axios from 'axios'
import config from './config'

export default {
  getSignedURL (file) {
    let endpoint = config.AWS_LAMBDA_GETSIGNEDURL_ENDPOINT
    let bodyFormData = new FormData()
    bodyFormData.set('mime_type', file.type)

    let csrfToken = document.cookie.split('=')[1]
    let headers = {
      'X-CSRFToken': csrfToken,
      'Content-Type': 'multipart/form-data'
    }

    return axios.post(endpoint, bodyFormData, {headers: headers})
      .then((res) => {
        return Promise.resolve(res.headers['Location'] || '/')
      })
      .catch((err) => {
        console.error(err)
        return Promise.reject('/')
      })
  }
}
