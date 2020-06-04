package com.example.tp.entity;

public class Order {
    private String orderId;
    private Integer userId;
    private Integer scheduleId;
    private String orderPhone;
    private String orderDate;
    private Integer ticketNum;
    private double ticketTotalPrice;
    private String payType;
    private String phoneCode;
    private Integer status;



    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getScheduleId() {
        return scheduleId;
    }

    public void setScheduleId(Integer scheduleId) {
        this.scheduleId = scheduleId;
    }

    public String getOrderPhone() {
        return orderPhone;
    }

    public void setOrderPhone(String orderPhone) {
        this.orderPhone = orderPhone;
    }

    public String getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(String orderDate) {
        this.orderDate = orderDate;
    }

    public Integer getTicketNum() {
        return ticketNum;
    }

    public void setTicketNum(Integer ticketNum) {
        this.ticketNum = ticketNum;
    }

    public double getTicketTotalPrice() {
        return ticketTotalPrice;
    }

    public void setTicketTotalPrice(double ticketTotalPrice) {
        this.ticketTotalPrice = ticketTotalPrice;
    }


    public String getPayType() {
        return payType;
    }

    public void setPayType(String payType) {
        this.payType = payType;
    }

    public String getPhoneCode() {
        return phoneCode;
    }

    public void setPhoneCode(String phoneCode) {
        this.phoneCode = phoneCode;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Order{" +
                "orderId=" + orderId +
                ", userId=" + userId +
                ", scheduleId=" + scheduleId +
                ", orderPhone='" + orderPhone + '\'' +
                ", orderDate='" + orderDate + '\'' +
                ", ticketNum=" + ticketNum +
                ", ticketTotalPrice=" + ticketTotalPrice +
                ", payType='" + payType + '\'' +
                ", phoneCode='" + phoneCode + '\'' +
                ", status=" + status +
                '}';
    }
}
