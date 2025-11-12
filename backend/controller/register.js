const CustomerModel = require('../models/Customer');

// Register a new customer
exports.registerCustomer = async (req, res) => {
    CustomerModel.create(req.body)
    .then(employees => res.json(employees))
    .catch(err => res.json(err))

};

// Delete a customer by ID
exports.deleteCustomer = async (req, res) => {
    try {
        const customerId = req.params.id;
        const deletedCustomer = await CustomerModel.findByIdAndDelete(customerId);

        if (!deletedCustomer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        res.json({ message: 'Customer deleted successfully' });
    } catch (error) {
        console.error('Error deleting customer:', error);
        res.status(500).json({ message: 'Failed to delete customer' });
    }
};