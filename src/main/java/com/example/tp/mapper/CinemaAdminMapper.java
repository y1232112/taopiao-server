package com.example.tp.mapper;
import com.example.tp.entity.CinemaAdmin;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface CinemaAdminMapper {
    CinemaAdmin getCinemaAdminById(Integer id);
    List<CinemaAdmin> getAllCinemaAdmin();
    List<CinemaAdmin> selectByNick(Map<String, String> map);
}
