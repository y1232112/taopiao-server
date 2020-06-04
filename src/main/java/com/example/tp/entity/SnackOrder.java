package com.example.tp.entity;

public class SnackOrder {
    private Integer orderId;
    private Integer snackId;
    private Integer userId;
    private String orderPhone;
    private int goodsNum;
    private String orderDate;
    private Double totalPrice;
    private String payType;
    private String phoneCode;

    public Integer getOrderId() {
        return orderId;
    }

    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    public Integer getSnackId() {
        return snackId;
    }

    public void setSnackId(Integer snackId) {
        this.snackId = snackId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getOrderPhone() {
        return orderPhone;
    }

    public void setOrderPhone(String orderPhone) {
        this.orderPhone = orderPhone;
    }

    public int getGoodsNum() {
        return goodsNum;
    }

    public void setGoodsNum(int goodsNum) {
        this.goodsNum = goodsNum;
    }

    public String getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(String orderDate) {
        this.orderDate = orderDate;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
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
        return "SnackOrder{" +
                "orderId=" + orderId +
                ", snackId=" + snackId +
                ", userId=" + userId +
                ", orderPhone='" + orderPhone + '\'' +
                ", goodsNum=" + goodsNum +
                ", orderDate='" + orderDate + '\'' +
                ", totalPrice=" + totalPrice +
                ", payType='" + payType + '\'' +
                ", phoneCode='" + phoneCode + '\'' +
                '}';
    }
}
