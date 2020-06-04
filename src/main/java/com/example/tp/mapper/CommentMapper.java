package com.example.tp.mapper;

import com.example.tp.entity.Comment;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentMapper {
    int addComment(Comment comment);
    List<Comment> selectComent(Integer t_id,Integer type,Integer user_id);
    List<Object> selectZandReply(Integer o_id,Integer type,Integer u_id);
    int[] selectHasMyFilmComment(Comment comment);
    List<Comment> selectMyCommentInfoForOneFilm(Comment comment);
    int upMycomment(Comment comment);
    int deleteMycomment(Comment comment);
}
