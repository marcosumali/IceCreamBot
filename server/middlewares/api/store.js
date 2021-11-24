const Store = require('../../models/api/store');

const isStoreExists = async (req, res, next) => {
  let store
  try {
    store = await Store.findById(req.params.id)
    if (!store) return res.status(404).json({message: `Store doesn't exists`})
  } catch (err) {
    console.log('ERROR:', err.stack)
    res.status(500).json({message: err.message})
  }

  res.store = store
  next()
};


module.exports = {
  isStoreExists,
}
