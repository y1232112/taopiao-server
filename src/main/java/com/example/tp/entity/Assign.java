package com.example.tp.entity;

public class Assign {
    private Integer cinemaId;
    private Integer cinemaAdminId;
    private String assignTime;

    public Integer getCinemaId() {
        return cinemaId;
    }

    public void setCinemaId(Integer cinemaId) {
        this.cinemaId = cinemaId;
    }

    public Integer getCinemaAdminId() {
        return cinemaAdminId;
    }

    public void setCinemaAdminId(Integer cinemaAdminId) {
        this.cinemaAdminId = cinemaAdminId;
    }

    public String getAssignTime() {
        return assignTime;
    }

    public void setAssignTime(String assignTime) {
        this.assignTime = assignTime;
    }

    @Override
    public String toString() {
        return "Assign{" +
                "cinemaId=" + cinemaId +
                ", cinemaAdminId=" + cinemaAdminId +
                ", assignTime='" + assignTime + '\'' +
                '}';
    }
}
