package com.example.tp.service;

import com.example.tp.entity.Cinema;
import com.example.tp.entity.CinemaAdmin;
import com.example.tp.mapper.CinemaMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class CinemaService {
    @Autowired
    CinemaMapper cinemaMapper;

    /**
     * 获得所有影院
     * @return
     */

    public List<Cinema> getAllCinema(){
        return cinemaMapper.getAllCinema();
    };

    /**
     * 根据id删除单个影院
     * @param id
     * @return
     */
    public int deleteCinemaById(Integer id){
        return cinemaMapper.deleteCinemaById(id);
    }

    /**
     * 添加单个影院
     * @param cinema
     * @return
     */
    public int addCinema(Cinema cinema){
        return cinemaMapper.addCinema(cinema);
    }

    /**
     * 根据id集合批量删除影院信息
     * @param ids
     * @return
     */
    public int deleteCinemaByIds(ArrayList<Integer> ids){
        return cinemaMapper.deleteCinemaByIds(ids);
    }

    /**
     * 修改影院
     * @param cinema
     * @return
     */
    public int modifyCinema(Cinema cinema){
        return cinemaMapper.modifyCinema(cinema);
    }
    public List<Cinema> getCinemaPage(Integer start, Integer pageSize){
        return cinemaMapper.getCinemaPage(start,pageSize);
    }

    /**
     * 获取数据表的长度
     * @return
     */
    public int getCinemaCount(){
        return cinemaMapper.getCinemaCount();
    }

    /**
     * 模糊查询
     * @param cinema_name
     * @param province
     * @param city
     * @return
     */
    public List<Cinema> searchCinema(String cinema_name,String province,String city){
        return cinemaMapper.searchCinema(cinema_name,province,city);
    }
    public List<Cinema> selectCinemaNoAssign(){
        return cinemaMapper.selectCinemaNoAssign();
    }
    public List<Cinema> selectCinemaByAdminId(Integer id){
        return cinemaMapper.selectCinemaByAdminId(id);
    }
    public  int updateNotice(Integer id,String notice){
        return cinemaMapper.updateNotice(id,notice);
    };
    public String getNotice(Integer id){
        return cinemaMapper.getNotice(id);
    }
    public List<Object> selectCinemasAndServe(String city){
        return cinemaMapper.selectCinemasAndServeByCity(city);
    };
    public List<Object> selectCinemasAndServeById(Integer id){
        return cinemaMapper.selectCinemasAndServeById(id);
    }
    public  List<Object> havefilmScheduleCinemas(Integer film_id,String city,String date){
        return cinemaMapper.havefilmScheduleCinemas(film_id,city,date);

    }
    public  List<Object> searchCinemaBycityCounty(String county,String city){
        return cinemaMapper.searchCinemaBycityCount(county,city);
    };
}
