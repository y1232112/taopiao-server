package com.example.tp.service;

import com.example.tp.entity.Film;
import com.example.tp.mapper.FilmMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class FilmService {
    Film film=new Film();
    @Autowired
    FilmMapper filmMapper;

    /**
     * 获得所有影片
     * @return
     */
    public List<Film> getAllFilm(){
        return filmMapper.getAllFilm();
    }

    /**
     * 添加一个影片
     * @param film
     * @return
     */
    public int addFilm(Film film){

       return filmMapper.addFilm(film);
    }

    /**
     * 根据id删除单个影片
     * @param id
     * @return
     */
    public int deleteFilmById(Integer id){
        return filmMapper.deleteFilmById(id);
    }

    /**
     * 根据电影id号集合进行批量删除
     * @param ids
     * @return
     */
    public int deleteFilmByIds(ArrayList<Integer> ids){
        return filmMapper.deleteFilmByIds(ids);
    }

    /**
     * 修改影片
     * @param film
     * @return
     */
    public int modifyFilm(Film film){
        return filmMapper.modifyFilm(film);
    }
   public int getFilmCount(){
        return filmMapper.getFilmCount();
   }
   public List<Film> getFilmPage(Integer start,Integer pageSize){
        return filmMapper.getFilmPage(start,pageSize);
   }
   public List<Film> searchFilm(String film_name,String director,String product_area,String type){
        return filmMapper.searchFilm(film_name,director,product_area,type);
    }
    public List<Film> getHotFilms(String date,String city){
        return filmMapper.getHotFilms(date,city);
    };
    public List<Object> getWillFilms(String date,Integer user_id){
        return filmMapper.getWillFilms(date,user_id);
    };
   public int countWishNum(Integer film_id,Integer wish_num,Integer version){
        return filmMapper.countWishNum(film_id,wish_num,version);
    }
    public Map<String, Long> selectWishById(Integer id){
        return filmMapper.selectWishById(id);
    }
   public List<Film> getFilmById(Integer id){
       return filmMapper.getFilmById(id);
    }
    public   List<Object> getBuyAboutFilm(Integer id){
       return filmMapper.getBuyAboutFilm(id);
    };
}
