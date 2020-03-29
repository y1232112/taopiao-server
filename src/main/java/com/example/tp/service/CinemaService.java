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
}
