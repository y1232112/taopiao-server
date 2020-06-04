package com.example.tp.mapper;

import com.example.tp.entity.Film;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Repository
public interface FilmMapper {
    //获取所有的电影信息
    List<Film> getAllFilm();

    //添加电影

    /**
     *
     * @param film
     * @return
     */
    int addFilm(Film film) ;

    /**
     *
     * @param id
     * @return
     */
    int deleteFilmById(@Param("id") Integer id);

    /**
     * 根据id集合批量删除影片信息
     * @param ids
     * @return
     */
    int deleteFilmByIds(ArrayList<Integer> ids);
    int modifyFilm(Film film);
    int getFilmCount();
    List<Film> getFilmPage(Integer start,Integer pageSize);
    List<Film> searchFilm(String film_name,String director,String product_area,String type);
    List<Film> getHotFilms(String date,String city);
    List<Object> getWillFilms(String date,Integer user_id);
    int countWishNum(Integer film_id,Integer wish_num,Integer version);
    Map<String, Long> selectWishById(Integer id);
    List<Film> getFilmById(@Param("id") Integer id);
    List<Object> getBuyAboutFilm(Integer id);
}