const Customer = require('../../models/api/customer');

const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find()
    res.status(200).json(customers)
  } catch (err) {
    console.log('ERROR:', err.stack)
    res.status(500).json({message: err.message})
  }
}

const getCustomer = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id)
    res.status(200).json(customer)
  } catch (err) {
    console.log('ERROR:', err.stack)
    res.status(500).json({message: err.message})
  }
}

const createCustomer = async (req, res) => {
  try {
    const {first_name, last_name, gender, date_of_birth, phone, email} = req.body
    const customer = new Customer({first_name, last_name, gender, date_of_birth, phone, email})
    const newCustomer = await customer.save()
    res.status(201).json(newCustomer)
  } catch (err) {
    console.log('ERROR:', err.stack)
    res.status(400).json({message: err.message})
  }
}

const updateCustomer = async (req, res) => {
  try {
    const {first_name, last_name, gender, date_of_birth, phone, email} = req.body
    if (first_name) res.customer.first_name = first_name
    if (last_name) res.customer.last_name = last_name
    if (gender) res.customer.gender = gender
    if (date_of_birth) res.customer.date_of_birth = date_of_birth
    if (phone) res.customer.phone = phone
    if (email) res.customer.email = email
    const newCustomer = await res.customer.save()
    res.status(200).json(newCustomer)
  } catch (err) {
    console.log('ERROR:', err.stack)
    res.status(400).json({message: err.message})
  }
}

const deleteCustomer = async (req, res) => {
  try {
    const deletedCustomer = await res.customer.remove()
    res.status(200).json(deletedCustomer)
  } catch (err) {
    console.log('ERROR:', err.stack)
    res.status(400).json({message: err.message})
  }
}


module.exports = {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
}