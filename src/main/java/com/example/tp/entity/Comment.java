package com.example.tp.entity;

public class Comment {
   private Integer id;
   private Integer tId;
   private Integer type;
   private Integer score;
   private String content;
   private Integer fromUid;
   private String commentDate;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer gettId() {
        return tId;
    }

    public void settId(Integer tId) {
        this.tId = tId;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Integer getFromUid() {
        return fromUid;
    }

    public void setFromUid(Integer fromUid) {
        this.fromUid = fromUid;
    }

    public String getCommentDate() {
        return commentDate;
    }

    public void setCommentDate(String commentDate) {
        this.commentDate = commentDate;
    }

    @Override
    public String toString() {
        return "Comment{" +
                "id=" + id +
                ", tId=" + tId +
                ", type=" + type +
                ", score=" + score +
                ", content='" + content + '\'' +
                ", fromUid=" + fromUid +
                ", commentDate='" + commentDate + '\'' +
                '}';
    }
}
