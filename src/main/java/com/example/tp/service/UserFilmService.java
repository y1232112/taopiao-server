package com.example.tp.service;

import com.example.tp.entity.UserFilm;
import com.example.tp.mapper.UserFilmMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserFilmService {
    @Autowired
    UserFilmMapper userFilmMapper;
   public List<Integer> getWishFilmByUser(Integer id){
        return userFilmMapper.getWishFilmByUser(id);
    }
    public int addWishFilm(UserFilm userFilm){
       return userFilmMapper.addWishFilm(userFilm);
    };
   public int updateWishFilm(UserFilm userFilm){
       return userFilmMapper.updateWishFilm(userFilm);
   };
   public int selectCountById(UserFilm userFilm){
       return userFilmMapper.selectCountById(userFilm);
    }
   public int addLookedFilm(UserFilm userFilm){
       return userFilmMapper.addLookedFilm(userFilm);
   };
   public int updateLookedFilm(UserFilm userFilm){
       return userFilmMapper.updateLookedFilm(userFilm);
   };
   public  List<Object> selectAboutUserFilm(Integer film_id,Integer user_id){
       return userFilmMapper.selectAboutUserFilm(film_id,user_id);
   }
  public    List<Object> myWishFilm(Integer user_id){
       return userFilmMapper.myWishFilm(user_id);
  };
   public List<Object> myLookedFilm(Integer user_id){
       return userFilmMapper.myLookedFilm(user_id);
   };
}
