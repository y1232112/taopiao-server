package com.example.tp.service;

import com.example.tp.entity.Assign;
import com.example.tp.mapper.AssignMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AssignService {
    @Autowired
    AssignMapper assignMapper;
    public int addAssignInfo(Assign assign){
        return assignMapper.addAssignInfo(assign);
    }
    public List<Integer> selectAssignCinemaIds(){
        return assignMapper.selectAssignCinemaIds();
    }
    public List<Integer> selectAssignCinemaAdminIds(){
        return assignMapper.selectAssignCinemaAdminIds();
    }
    public List<Assign> selectAssignInfoByadmin(Integer cinemaAdminId){
        return assignMapper.selectAssignInfoByadmin(cinemaAdminId);
    };
}
