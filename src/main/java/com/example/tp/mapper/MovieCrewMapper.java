package com.example.tp.mapper;

import com.example.tp.entity.MovieCrew;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
@Repository
public interface MovieCrewMapper {
    /**
     *
     * @return
     */
    List<MovieCrew> getAllMovieCrew();

    /**
     *
     * @param movieCrew
     * @return
     */
    int addMovieCrew(MovieCrew movieCrew);

    /**
     *
     * @param id
     * @return
     */
    int deleteMovieCrewById(@Param("id") Integer id);

    /**
     *
     * @param ids
     * @return
     */
    int deleteMovieCrewByIds(ArrayList<Integer> ids);

    /**
     *
     * @param movieCrew
     * @return
     */
    int modifyMovieCrew(MovieCrew movieCrew);
    int getMovieCrewCount();
    List<MovieCrew> getMovieCrewPage(Integer start,Integer pageSize);
     List<MovieCrew> searchMovieCrew(String movie_crew_name);


}
