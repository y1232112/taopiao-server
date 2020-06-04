package com.example.tp.service;

import com.example.tp.entity.Serve;
import com.example.tp.mapper.ServeMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServeService {
    @Autowired
    ServeMapper serveMapper;
    public  int addServe(Serve serve){
        return serveMapper.addServe(serve);
    }
    public List<Object> myServe(Integer id){
        return serveMapper.myServe(id);
    }

    public int updateMyServe(Serve serve){
        return serveMapper.updateMyServe(serve);
    }
    public  int deleteMyServe(Serve serve){
        return serveMapper.deleteMyServe(serve);
    }

}
