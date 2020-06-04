package com.example.tp.entity;

public class Hall {
    private Integer hallId;

    private Integer cinemaId;
    private String hallName;
    private Integer rowCount;
    private Integer columnCount;
    private String hallType;

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

    public Integer getRowCount() {
        return rowCount;
    }

    public void setRowCount(Integer rowCount) {
        this.rowCount = rowCount;
    }

    public Integer getColumnCount() {
        return columnCount;
    }

    public void setColumnCount(Integer columnCount) {
        this.columnCount = columnCount;
    }

    public String getHallType() {
        return hallType;
    }

    public void setHallType(String hallType) {
        this.hallType = hallType;
    }

    @Override
    public String toString() {
        return "Hall{" +
                "hallId=" + hallId +
                ", cinemaId=" + cinemaId +
                ", hallName='" + hallName + '\'' +
                ", rowCount=" + rowCount +
                ", columnCount=" + columnCount +
                ", hallType='" + hallType + '\'' +
                '}';
    }
}
