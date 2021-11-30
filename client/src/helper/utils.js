const getOptions = (type = 'GET', data) => {
  let options = {
    method: type,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  if (data) options.body = data;
  // Content type has been set automatically on browser with required boundary
  if (data instanceof FormData) delete options.headers['Content-Type']

  return options;
};

export const apiCall = (path, type, data) => {
  return Promise.resolve()
    .then(() => {
      const options = getOptions(
        type,
        data ? data instanceof FormData? data : JSON.stringify(data) : null,
      );
      return fetch(path, options);
    })
    .then(async res => {
      // Success Status
      if (res.status >= 200 && res.status < 300) {
        const text = await res.text()
        return text;
      }

      // Error Status
      throw res
    })
    .then(async text => {
      const res = JSON.parse(text)
      return res
    })
    .catch(async res => {
      let err = {}
      const text = await res.text()

      if (text.length > 0) err = JSON.parse(text)

      // If error message is an object
      if (err && err.constructor === Object && !Array.isArray(err)) {
        // Unknown error message
        if (!err.message) throw `ERROR #${res.status}: Unknown`
        // Identified error message
        if (err.message) throw err.message
      }
    });
}