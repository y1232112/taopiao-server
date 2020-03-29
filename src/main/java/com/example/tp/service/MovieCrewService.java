package com.example.tp.service;

import com.example.tp.entity.MovieCrew;
import com.example.tp.mapper.MovieCrewMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MovieCrewService {
    @Autowired
    MovieCrewMapper movieCrewMapper;

    /**
     *获得所有影员
     * @return
     */
    public List<MovieCrew> getAllMovieCrew() {
        return movieCrewMapper.getAllMovieCrew();
    }

    /**
     *添加单个影员
     * @param movieCrew
     * @return
     */
    public int addMovieCrew(MovieCrew movieCrew){
        return movieCrewMapper.addMovieCrew(movieCrew);
    }

    /**
     *根据影员id删除
     * @param id
     * @return
     */
    public int deleteMovieCrewById(Integer id){
        return movieCrewMapper.deleteMovieCrewById(id);
    }

    /**
     * 根据影院数组批量删除
     * @param ids
     * @return
     */
    public int deleteMovieCrewByIds(ArrayList<Integer> ids){
      return movieCrewMapper.deleteMovieCrewByIds(ids);
    }

    /**
     * 修改影员
     * @param movieCrew
     * @return
     */
    public int modifyMovieCrew(MovieCrew movieCrew){
        return movieCrewMapper.modifyMovieCrew(movieCrew);
    }
    public int getMovieCrewCount(){
        return movieCrewMapper.getMovieCrewCount();
    };
    public List<MovieCrew> getMovieCrewPage(Integer start,Integer pageSize){
        return movieCrewMapper.getMovieCrewPage(start,pageSize);
    }
    public  List<MovieCrew> searchMovieCrew(String movie_crew_name){
        return movieCrewMapper.searchMovieCrew(movie_crew_name);
    }
}
