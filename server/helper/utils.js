const axios = require('axios');

const generateError = (code, errorMessage) => {
  return {
    code,
    error: new Error(errorMessage)
  }
}

const apiCall = (url, method, data) => {
  return Promise.resolve()
    .then(() => {
      return axios({
        method,
        url,
        data,
      })
      .then(res => res.data)
      .catch(error => {
        const err = error.response.data
        // If error message is an object
        if (err && err.constructor === Object && !Array.isArray(err)) {
          // Unknown error message
          if (!err.message) return `ERROR #${res.status}: Unknown`
          // Identified error message
          if (err.message) return err.message
        }
      })
    })
}


module.exports = {
  generateError,
  apiCall,
}