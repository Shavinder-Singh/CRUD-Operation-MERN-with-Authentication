import { useState, useEffect, createContext } from "react";
import api from "../utils/axios";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  //Create Order
  const createOrder = async (orderData) => {
    try {
      const order = await api.post(`/orders/createorder`, orderData);
      console.log("Order Created Successfully");
      return order;
    } catch (err) {
      console.log("Creating Order Error : ", err.response?.data);
    }
  };

  // See all orders created ByUSER to user
  const viewOrders = async () => {
    try {
      const response = await api.get(`/orders/vieworders`);
      console.log("Orders Fetched Successfully By User");
      return response.data;
    } catch (err) {
      console.log("Viewing Orders Error : ", err.response?.data);
      throw err;
    }
  };

  //Edit Order By User
  const updateOrder = async (id, orderData) => {
    try {
      const { data } = await api.put(`/orders/updateorder/${id}`, orderData);
      console.log("Order Edited Successfully By User");
      return data;
    } catch (err) {
      console.log("Edit Order Error : ", err.response?.data);
      throw err;
    }
  };

  //single user order showing page for editing
  const viewSingleOrder = async (id) => {
    try {
      const response = await api.get(`/orders/vieworder/${id}`);
      return response.data;
    } catch (err) {
      console.log("Viewing single Order Error : ", err.response?.data);
      throw err;
    }
  };

  //Delete Order
  const deleteOrder = async (id) => {
    try {
      await api.delete(`/orders/deleteorder/${id}`);
      console.log("Delete order by user");
    } catch (err) {
      console.log("Viewing single Order Error : ", err.response?.data);
      throw err;
    }
  };

  //admin viewing orders of users in dashboard

  const adminViewOrders = async () => {
    try {
      const { data } = await api.get(`/orders/viewordersadmin`);
      return data;
    } catch (err) {
      console.log(
        "getting Orders of users to admin Error : ",
        err.response?.data,
      );
      throw err;
    }
  };

  //Status updation by admin of user Orders in dashboard
  const adminStatus = async (id, updatedStatus) => {
    try {
      const response = await api.put(`/orders/adminStatus/${id}`, {
        status: updatedStatus,
      });
      return response.data.order;
    } catch (err) {
      console.log("Status updation Error : ", err.response?.data);
      throw err;
    }
  };
  return (
    <OrderContext.Provider
      value={{
        createOrder,
        viewOrders,
        updateOrder,
        viewSingleOrder,
        deleteOrder,
        adminViewOrders,
        adminStatus,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
