package com.example.tp.mapper;
import com.example.tp.entity.CinemaAdmin;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Repository
public interface CinemaAdminMapper {
    CinemaAdmin getCinemaAdminById(Integer id);
    List<CinemaAdmin> getAllCinemaAdmin();
    List<CinemaAdmin> selectByNick(Map<String, String> map);
    int getCinemaAdminCount();
    List<CinemaAdmin> getCinemaAdminPage(Integer start,Integer pageSize);
   int addCinemaAdmin(CinemaAdmin cinemaAdmin);
   int modifyCinemaAdmin(CinemaAdmin cinemaAdmin);
   int deleteCinemaAdminById(@Param("id") Integer id);
   int deleteCinemaAdminByIds(ArrayList<Integer> ids);
   List<CinemaAdmin> searchCinemaAdmin(String nick_name,String phone,String real_name);
   List<CinemaAdmin> selectAdminNoAss();
   List<CinemaAdmin> selectCinemaAdminByNP(String nickName,String password);
   Integer updateSomenInfo(CinemaAdmin cinemaAdmin);
}
