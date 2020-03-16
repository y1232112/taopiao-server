package com.example.tp.entity;

public class Order {
    private Integer orderId;
    private Integer userId;
    private Integer scheduleId;
    private String orderPhone;
    private String orderDate;
    private Integer ticketNum;
    private double ticketTotalPrice;
    private String seatInfo;
    private String payType;
    private String phoneCode;

    public Integer getOrderId() {
        return orderId;
    }

    public void setOrderId(Integer orderId) {
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

    public String getSeatInfo() {
        return seatInfo;
    }

    public void setSeatInfo(String seatInfo) {
        this.seatInfo = seatInfo;
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
                ", seatInfo='" + seatInfo + '\'' +
                ", payType='" + payType + '\'' +
                ", phoneCode='" + phoneCode + '\'' +
                '}';
    }
}
