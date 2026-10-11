const express = require("express");
const Router = express.Router();
const { createOrder, viewOrders, viewOrdersAdmin, updateOrder, adminStatus, singleOrderView, deleteorder } = require('../controller/orderController.js');
const { protect, admin } = require('../middleware/auth.js');


Router.post('/createorder', protect, createOrder);
Router.get('/vieworders', protect, viewOrders);//single user view our orders 
Router.put('/updateorder/:id', protect, updateOrder);//Update Order by user
Router.get('/viewordersadmin', protect, admin, viewOrdersAdmin);//Admin view User orders 
Router.put('/adminStatus/:id', protect, admin, adminStatus);
Router.get('/vieworder/:id', protect, singleOrderView);//single booked order view by user
Router.delete('/deleteorder/:id', protect, deleteorder);//delete order

module.exports = Router;