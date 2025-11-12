// const loginModel = require('../models/Customer');


// // Login a customer
// exports.loginCustomer = (req, res) => {
//     const {email, password} = req.body;
//     loginModel.findOne({email : email})
//     .then(user => {
//         if(user) {
//             if(user.password === password){
//                 res.json("Success")
//             }else{
//                 res.json("The password is incorrect")
//             }
//         }else{
//             res.json("No record existed")
//         }
//     })
// };


const loginModel = require('../models/Customer');

// Login a customer
exports.loginCustomer = (req, res) => {
    const { email, password } = req.body;

    loginModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    // Include user ID and name in the response if login is successful
                    res.json({
                        status: "Success",
                        user: {
                            userId: user._id,
                            name: user.name
                        }
                    });
                } else {
                    res.json({ status: "Error", message: "The password is incorrect" });
                }
            } else {
                res.json({ status: "Error", message: "No record existed" });
            }
        })
        .catch(err => {
            console.error("Login error:", err);
            res.status(500).json({ status: "Error", message: "Server error" });
        });
};
