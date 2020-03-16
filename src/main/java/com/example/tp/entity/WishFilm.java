package com.example.tp.entity;

public class WishFilm {
    private Integer wishFilmId;
    private  Integer userId;
    private Integer filmId;

    public Integer getWishFilmId() {
        return wishFilmId;
    }

    public void setWishFilmId(Integer wishFilmId) {
        this.wishFilmId = wishFilmId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getFilmId() {
        return filmId;
    }

    public void setFilmId(Integer filmId) {
        this.filmId = filmId;
    }

    @Override
    public String toString() {
        return "WishFilm{" +
                "wishFilmId=" + wishFilmId +
                ", userId=" + userId +
                ", filmId=" + filmId +
                '}';
    }
}
