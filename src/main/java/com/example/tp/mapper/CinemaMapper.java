package com.example.tp.mapper;

import com.example.tp.entity.Assign;
import com.example.tp.entity.Cinema;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Repository
public interface CinemaMapper {
  /**
   *
   * @return
   */
  List<Cinema> getAllCinema();

  /**
   *
   * @param id
   * @return
   */
  int deleteCinemaById(@Param("id") Integer id);

  /**
   *
   * @param cinema
   * @return
   */
  int addCinema(Cinema cinema);

  /**
   *
   * @param ids
   * @return
   */
  int deleteCinemaByIds(ArrayList<Integer> ids);
  int modifyCinema(Cinema cinema);
  int getCinemaCount();
  List<Cinema> getCinemaPage(Integer start,Integer pageSize);
  List<Cinema> searchCinema(String cinema_name,String province,String city);
  List<Cinema> selectCinemaNoAssign();
  List<Cinema> selectCinemaByAdminId(@Param("id")Integer id);
  String getNotice(@Param("id")Integer id);
  int updateNotice(Integer id,String notice);
  List<Object> selectCinemasAndServeByCity(String city);
  List<Object> selectCinemasAndServeById(Integer id);
  List<Object> havefilmScheduleCinemas(Integer film_id,String city,String date);
  List<Object> searchCinemaBycityCount(String county,String city);
}