package com.example.tp.service;

import com.example.tp.entity.CinemaAdmin;
import com.example.tp.mapper.CinemaAdminMapper;
import com.example.tp.mapper.CinemaMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class CinemaAdminService {
    @Autowired
    CinemaAdminMapper cinemaAdminMapper;
   public CinemaAdmin getCinemaAdminByid(Integer id){
       return cinemaAdminMapper.getCinemaAdminById(id);
   }
  public List<CinemaAdmin> getAllCinemaAdmin(){
        return cinemaAdminMapper.getAllCinemaAdmin();
   }
   public List<CinemaAdmin> selectByNick(Map<String,String> map){return cinemaAdminMapper.selectByNick(map);}
}
