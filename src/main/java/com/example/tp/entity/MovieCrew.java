package com.example.tp.entity;

public class MovieCrew {
    private Integer movieCrewId;
    private String movieCrewName;
    private String sex;
    private String img;

    public Integer getMovieCrewId() {
        return movieCrewId;
    }

    public void setMovieCrewId(Integer movieCrewId) {
        this.movieCrewId = movieCrewId;
    }

    public String getMovieCrewName() {
        return movieCrewName;
    }

    public void setMovieCrewName(String movieCrewName) {
        this.movieCrewName = movieCrewName;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    @Override
    public String toString() {
        return "MovieCrew{" +
                "movieCrewId=" + movieCrewId +
                ", movieCrewName='" + movieCrewName + '\'' +
                ", sex='" + sex + '\'' +
                ", img='" + img + '\'' +
                '}';
    }
}
