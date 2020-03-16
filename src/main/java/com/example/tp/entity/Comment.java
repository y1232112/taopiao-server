package com.example.tp.entity;

public class Comment {
    private Integer commentId;
    private Integer filmId;
    private Integer userId;
    private String userScore;
    private String commentContent;
    private String commentDate;
    private Integer supportNum;
    private String supportUser;
    private Integer isPass;

    public Integer getCommentId() {
        return commentId;
    }

    public void setCommentId(Integer commentId) {
        this.commentId = commentId;
    }

    public Integer getFilmId() {
        return filmId;
    }

    public void setFilmId(Integer filmId) {
        this.filmId = filmId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getUserScore() {
        return userScore;
    }

    public void setUserScore(String userScore) {
        this.userScore = userScore;
    }

    public String getCommentContent() {
        return commentContent;
    }

    public void setCommentContent(String commentContent) {
        this.commentContent = commentContent;
    }

    public String getCommentDate() {
        return commentDate;
    }

    public void setCommentDate(String commentDate) {
        this.commentDate = commentDate;
    }

    public Integer getSupportNum() {
        return supportNum;
    }

    public void setSupportNum(Integer supportNum) {
        this.supportNum = supportNum;
    }

    public String getSupportUser() {
        return supportUser;
    }

    public void setSupportUser(String supportUser) {
        this.supportUser = supportUser;
    }

    public Integer getIsPass() {
        return isPass;
    }

    public void setIsPass(Integer isPass) {
        this.isPass = isPass;
    }

    @Override
    public String toString() {
        return "Comment{" +
                "commentId=" + commentId +
                ", filmId=" + filmId +
                ", userId=" + userId +
                ", userScore='" + userScore + '\'' +
                ", commentContent='" + commentContent + '\'' +
                ", commentDate='" + commentDate + '\'' +
                ", supportNum=" + supportNum +
                ", supportUser='" + supportUser + '\'' +
                ", isPass=" + isPass +
                '}';
    }
}
