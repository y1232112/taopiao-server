package com.example.tp.service;

import com.example.tp.entity.Comment;
import com.example.tp.mapper.CommentMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {
    @Autowired
    CommentMapper commentMapper;
    public  int addComment(Comment comment){
        return commentMapper.addComment(comment);
    }
   public List<Comment> selectComent(Integer t_id, Integer type,Integer user_id){
       return commentMapper.selectComent(t_id,type,user_id);
    }
    public     List<Object> selectZandReply(Integer o_id,Integer type,Integer u_id){
        return commentMapper.selectZandReply(o_id,type,u_id);
    }
    public int[] selectHasMyFilmComment(Comment comment){
        return commentMapper.selectHasMyFilmComment(comment);
    }
    public  List<Comment> selectMyCommentInfoForOneFilm(Comment comment){
        return commentMapper.selectMyCommentInfoForOneFilm(comment);
    }

    public int upMycomment(Comment comment) {
        return commentMapper.upMycomment(comment);
    }

    public int deleteMycomment(Comment comment) {
        return commentMapper.deleteMycomment(comment);
    }
}
