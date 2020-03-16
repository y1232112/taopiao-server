package com.example.tp.entity;

public class Schedule {
    private Integer scheduleId;
    private Integer filmId;
    private Integer cinemaId;
    private String hallName;
    private String showDate;
    private double price;
    private String seatInfo;

    public Integer getScheduleId() {
        return scheduleId;
    }

    public void setScheduleId(Integer scheduleId) {
        this.scheduleId = scheduleId;
    }

    public Integer getFilmId() {
        return filmId;
    }

    public void setFilmId(Integer filmId) {
        this.filmId = filmId;
    }

    public Integer getCinemaId() {
        return cinemaId;
    }

    public void setCinemaId(Integer cinemaId) {
        this.cinemaId = cinemaId;
    }

    public String getHallName() {
        return hallName;
    }

    public void setHallName(String hallName) {
        this.hallName = hallName;
    }

    public String getShowDate() {
        return showDate;
    }

    public void setShowDate(String showDate) {
        this.showDate = showDate;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getSeatInfo() {
        return seatInfo;
    }

    public void setSeatInfo(String seatInfo) {
        this.seatInfo = seatInfo;
    }

    @Override
    public String toString() {
        return "Schedule{" +
                "scheduleId=" + scheduleId +
                ", filmId=" + filmId +
                ", cinemaId=" + cinemaId +
                ", hallName='" + hallName + '\'' +
                ", showDate='" + showDate + '\'' +
                ", price=" + price +
                ", seatInfo='" + seatInfo + '\'' +
                '}';
    }
}
