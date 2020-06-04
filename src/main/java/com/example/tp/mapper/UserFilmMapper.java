package com.example.tp.mapper;

import com.example.tp.entity.UserFilm;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserFilmMapper {
    List<Integer> getWishFilmByUser(@Param("id") Integer id);
    int addWishFilm(UserFilm userFilm);
    int updateWishFilm(UserFilm film);
    int selectCountById(UserFilm userFilm);
    int addLookedFilm(UserFilm userFilm);
    int updateLookedFilm(UserFilm userFilm);
    List<Object> selectAboutUserFilm(Integer film_id,Integer user_id);
   List<Object> myWishFilm(Integer user_id);
    List<Object> myLookedFilm(Integer user_id);

}
