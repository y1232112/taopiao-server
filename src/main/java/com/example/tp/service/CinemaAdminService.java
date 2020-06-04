package com.example.tp.service;

import com.example.tp.entity.CinemaAdmin;
import com.example.tp.mapper.CinemaAdminMapper;
import com.example.tp.mapper.CinemaMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

    public int getCinemaAdminCount() {
        return cinemaAdminMapper.getCinemaAdminCount();
    }
   public List<CinemaAdmin> getCinemaAdminPage(Integer start,Integer pageSize){
       return cinemaAdminMapper.getCinemaAdminPage(start,pageSize);
    };
   public int addCinemaAdmin(CinemaAdmin cinemaAdmin){
       return cinemaAdminMapper.addCinemaAdmin(cinemaAdmin);
   };
   public int modifyCinemaAdmin(CinemaAdmin cinemaAdmin){
       return cinemaAdminMapper.modifyCinemaAdmin(cinemaAdmin);
   };
   public int deleteCinemaAdminById(Integer id){
       return cinemaAdminMapper.deleteCinemaAdminById(id);
   }
   public int deleteCinemaAdminByIds(ArrayList<Integer> ids){
       return cinemaAdminMapper.deleteCinemaAdminByIds(ids);
   }
   public List<CinemaAdmin> searchCinemaAdmin(String nick_name,String phone,String real_name){
       return cinemaAdminMapper.searchCinemaAdmin(nick_name,phone,real_name);
   };
   public List<CinemaAdmin> selectAdminNoAss(){
       return cinemaAdminMapper.selectAdminNoAss();
   };
   public List<CinemaAdmin> selectCinemaAdminByNP(String nickName,String password){
       return cinemaAdminMapper.selectCinemaAdminByNP(nickName,password);
   }
   public  Integer updateSomenInfo(CinemaAdmin cinemaAdmin){
       return cinemaAdminMapper.updateSomenInfo(cinemaAdmin);
   }
}
