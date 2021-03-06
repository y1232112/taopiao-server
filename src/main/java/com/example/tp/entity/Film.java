package com.example.tp.entity;

public class Film {
    private Integer filmId;

    private String filmName;
    private String filmLength;
    private String productArea;
    private String director;

    private String brief;
    private String type;
    private String publicDate;
    private String endDate;
    private String actor;
    private String img;

    public Integer getFilmId() {
        return filmId;
    }

    public void setFilmId(Integer filmId) {
        this.filmId = filmId;
    }



    public String getFilmName() {
        return filmName;
    }

    public void setFilmName(String filmName) {
        this.filmName = filmName;
    }

    public String getFilmLength() {
        return filmLength;
    }

    public void setFilmLength(String filmLength) {
        this.filmLength = filmLength;
    }

    public String getProductArea() {
        return productArea;
    }

    public void setProductArea(String productArea) {
        this.productArea = productArea;
    }

    public String getDirector() {
        return director;
    }

    public void setDirector(String director) {
        this.director = director;
    }



    public String getBrief() {
        return brief;
    }

    public void setBrief(String brief) {
        this.brief = brief;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getPublicDate() {
        return publicDate;
    }

    public void setPublicDate(String publicDate) {
        this.publicDate = publicDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public String getActor() {
        return actor;
    }

    public void setActor(String actor) {
        this.actor = actor;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }



    @Override
    public String toString() {
        return "Film{" +
                "filmId=" + filmId +
                ", filmName='" + filmName + '\'' +
                ", filmLength='" + filmLength + '\'' +
                ", productArea='" + productArea + '\'' +
                ", director='" + director + '\'' +
                ", brief='" + brief + '\'' +
                ", type='" + type + '\'' +
                ", publicDate='" + publicDate + '\'' +
                ", endDate='" + endDate + '\'' +
                ", actor='" + actor + '\'' +
                ", img='" + img + '\'' +
                '}';
    }
}
