package com.example.tp.entity;

public class FilmAbout {
    private Integer id;
    private Integer movieCrewId;
    private Integer filmId;
    private String role;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

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
        return "FilmAbout{" +
                "id=" + id +
                ", movieCrewId=" + movieCrewId +
                ", filmId=" + filmId +
                ", role='" + role + '\'' +
                '}';
    }
}
