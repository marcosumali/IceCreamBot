const Customer = require('../../models/api/customer');

const isCustomerExists = async (req, res, next) => {
  let customer
  try {
    customer = await Customer.findById(req.params.id)
    if (!customer) return res.status(404).json({message: `Customer doesn't exists`})
  } catch (err) {
    console.log('ERROR:', err.stack)
    res.status(500).json({message: err.message})
  }

  res.customer = customer
  next()
};


module.exports = {
  isCustomerExists,
}
