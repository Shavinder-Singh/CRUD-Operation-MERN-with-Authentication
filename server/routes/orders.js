const express = require("express");
const Router = express.Router();
const { createOrder, viewOrders, viewOrdersAdmin, updateOrder, adminStatus } = require('../controller/orderController.js');
const { protect, admin } = require('../middleware/auth.js');


Router.post('/createorder', protect, createOrder);
Router.get('/vieworders', protect, viewOrders);//single user view our orders 
Router.get('/viewordersadmin', protect, admin, viewOrdersAdmin);//Admin view User orders 
Router.put('/updateorder/:id', protect, updateOrder);
Router.post('/adminStatus/:id', protect, admin, adminStatus);
module.exports = Router;