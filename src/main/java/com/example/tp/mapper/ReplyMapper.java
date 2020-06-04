package com.example.tp.mapper;

import com.example.tp.entity.Reply;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReplyMapper {
 int addReply(Reply reply);
 List<Object> selectReply(Integer comment_id,Integer user_id);
}
