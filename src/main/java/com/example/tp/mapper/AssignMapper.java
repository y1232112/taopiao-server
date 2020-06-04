package com.example.tp.mapper;

import com.example.tp.entity.Assign;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssignMapper {
    int addAssignInfo(Assign assign);
    List<Integer> selectAssignCinemaIds();
    List<Integer> selectAssignCinemaAdminIds();
    List<Assign> selectAssignInfoByadmin(Integer cinemaAdminId);
}
