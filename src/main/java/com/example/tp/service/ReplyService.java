package com.example.tp.service;

import com.example.tp.entity.Reply;
import com.example.tp.mapper.ReplyMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReplyService {
    @Autowired
    ReplyMapper replyMapper;
    public  int addReply(Reply reply){
        return replyMapper.addReply(reply);
    }
    public List<Object> selectReply(Integer comment_id,Integer user_id){
        return replyMapper.selectReply(comment_id,user_id);
    }
}
