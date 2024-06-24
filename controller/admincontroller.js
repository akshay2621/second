const storage = require('node-persist');
storage.init();
var admin = require('../model/adminmodel');
exports.admin_register = async (req, res) => {
   
    var data = await admin.create(req.body);
    res.status(200).json({
        status: "add admin success",
        data
    })
}

exports.get_data = async (req, res) => {
    var data = await admin.find(req.body);

    res.status(200).json({
        status: "data selected",
        data,
    })
}

// admin login
exports.admin_login = async (req, res) => {
    var data = await admin.find({ "email": req.body.email });
    var user_id1 = await storage.getItem('user_id1');
    
    if (user_id1 == undefined) {
            if (data.length == 1) {
                    if (data[0].password == req.body.password) {
                        await storage.setItem('user_id1', data[0].id)
                        res.status(200).json({
                            status: "login admin success",
                            data
                        })
                    } else {
                        res.status(200).json({
                            status: "check password of admin"
                        })
                    }
            } else {
                res.status(200).json({
                    status: "password incorrect of admin"
                })
            }
    } else {
        res.status(200).json({
            status: "already admin login"
        })
    }
}
// staff logout
exports.admin_logout = async (req, res) => {
    await storage.removeItem('user_id1');
    res.status(200).json({
        status: "admin logout"
    })
}
 
// je user  login thyo a jova
exports.view_login_data = async (req, res) => {
    var user_id1 = await storage.getItem('user_id1');
    var data = await admin.findById(user_id1);
    // console.log('user',user);
    res.status(200).json({
        status: "watch admin login detail",
        data
    })
}