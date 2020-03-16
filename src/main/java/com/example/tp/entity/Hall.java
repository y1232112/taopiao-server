package com.example.tp.entity;

public class Hall {
    private Integer hallId;
    private Integer cinemaId;
    private String hallName;

    public Integer getHallId() {
        return hallId;
    }

    public void setHallId(Integer hallId) {
        this.hallId = hallId;
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

    @Override
    public String toString() {
        return "Hall{" +
                "hallId=" + hallId +
                ", cinemaId=" + cinemaId +
                ", hallName='" + hallName + '\'' +
                '}';
    }
}
