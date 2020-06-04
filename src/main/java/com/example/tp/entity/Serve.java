package com.example.tp.entity;

public class Serve {
    private Integer cinemaId;
    private String serveType;
    private String description;

    public Integer getCinemaId() {
        return cinemaId;
    }

    public void setCinemaId(Integer cinemaId) {
        this.cinemaId = cinemaId;
    }

    public String getServeType() {
        return serveType;
    }

    public void setServeType(String serveType) {
        this.serveType = serveType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "Serve{" +
                "cinemaId=" + cinemaId +
                ", serveType='" + serveType + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}
