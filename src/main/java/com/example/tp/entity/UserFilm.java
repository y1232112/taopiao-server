package com.example.tp.entity;

public class UserFilm {
  private Integer userId;
  private Integer filmId;
  private Integer wishStatus;
  private Integer looked;
  private String wishTime;
  private String lookedTime;


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

  public Integer getWishStatus() {
    return wishStatus;
  }

  public void setWishStatus(Integer wishStatus) {
    this.wishStatus = wishStatus;
  }

  public Integer getLooked() {
    return looked;
  }

  public void setLooked(Integer looked) {
    this.looked = looked;
  }

  public String getWishTime() {
    return wishTime;
  }

  public void setWishTime(String wishTime) {
    this.wishTime = wishTime;
  }

  public String getLookedTime() {
    return lookedTime;
  }

  public void setLookedTime(String lookedTime) {
    this.lookedTime = lookedTime;
  }

  @Override
  public String toString() {
    return "UserFilm{" +
            "userId=" + userId +
            ", filmId=" + filmId +
            ", wishStatus=" + wishStatus +
            ", looked=" + looked +
            ", wishTime='" + wishTime + '\'' +
            ", lookedTime='" + lookedTime + '\'' +
            '}';
  }
}
