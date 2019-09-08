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
        let location = this.getPropValue(res.headers, 'Location')
        return Promise.resolve(location || '/')
      })
      .catch((err) => {
        console.error(err)
        return Promise.reject('/')
      })
  },

  // case insensitive lookup
  getPropValue (obj, prop) {
    var theKeys = Object.getOwnPropertyNames(obj).toString()
    var match = new RegExp(prop, 'i').exec(theKeys)
    return match && (match.length > 0 ? obj[match[0]] : '')
  }
}
