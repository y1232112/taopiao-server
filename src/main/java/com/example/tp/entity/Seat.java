package com.example.tp.entity;

public class Seat {
    private Integer id;
    private Integer seatId;

    private Integer hallId;
    private Integer row;
    private Integer column;
    private Integer active;

    public Integer getSeatId() {
        return seatId;
    }

    public void setSeatId(Integer seatId) {
        this.seatId = seatId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getHallId() {
        return hallId;
    }

    public void setHallId(Integer hallId) {
        this.hallId = hallId;
    }

    public Integer getRow() {
        return row;
    }

    public void setRow(Integer row) {
        this.row = row;
    }

    public Integer getColumn() {
        return column;
    }

    public void setColumn(Integer column) {
        this.column = column;
    }

    public Integer getActive() {
        return active;
    }

    public void setActive(Integer active) {
        this.active = active;
    }

    @Override
    public String toString() {
        return "Seat{" +
                "id=" + id +
                ", seatId=" + seatId +
                ", hallId=" + hallId +
                ", row=" + row +
                ", column=" + column +
                ", active=" + active +
                '}';
    }
}
