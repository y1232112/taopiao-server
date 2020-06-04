package com.example.tp.entity;

public class Role {
    private Integer movieCrewId;
    private Integer filmId;
    private String role;

    public Integer getMovieCrewId() {
        return movieCrewId;
    }

    public void setMovieCrewId(Integer movieCrewId) {
        this.movieCrewId = movieCrewId;
    }

    public Integer getFilmId() {
        return filmId;
    }

    public void setFilmId(Integer filmId) {
        this.filmId = filmId;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return "role{" +
                "movieCrewId=" + movieCrewId +
                ", filmId=" + filmId +
                ", role='" + role + '\'' +
                '}';
    }
}
