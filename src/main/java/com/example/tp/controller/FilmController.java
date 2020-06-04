package com.example.tp.controller;

import com.example.tp.entity.Film;
import com.example.tp.entity.MovieCrew;
import com.example.tp.entity.PageManager;
import com.example.tp.service.FilmService;
import com.example.tp.utils.DataUtils;
import com.example.tp.utils.JsonUtils;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.thymeleaf.util.DateUtils;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

@RestController
public class FilmController {
    @Autowired
    private FilmService filmService;
    @RequestMapping(value = "/FilmList",method = RequestMethod.GET)
    public String filmlist() throws JsonProcessingException {
        ObjectMapper mapper=new ObjectMapper();
        String json;
        try {
        json=mapper.writeValueAsString(filmService.getAllFilm());

        } catch (JsonProcessingException e) {
            return JsonUtils.delFailure();
        }
        return  json;

    }
    @RequestMapping(value = "/addFilm",method = RequestMethod.POST,produces ="application/json;charset=UTF-8")
    @ResponseBody
    public String addFilm(@RequestBody String receiveJson) throws JsonProcessingException {

        System.out.println("--sssssssssssssssssssssss-json--"+JsonUtils.getFormJson(receiveJson,"img"));
        Film film=new Film();

        film.setFilmName(JsonUtils.getFormJson(receiveJson,"film_name"));
        film.setFilmLength(JsonUtils.getFormJson(receiveJson,"film_length"));
        film.setProductArea(JsonUtils.getFormJson(receiveJson,"product_area"));
        film.setDirector(JsonUtils.getFormJson(receiveJson,"director"));
        film.setBrief(JsonUtils.getFormJson(receiveJson,"brief"));
        film.setType(JsonUtils.getFormJson(receiveJson,"type"));
        film.setPublicDate(JsonUtils.getFormJson(receiveJson,"public_date"));
       film.setEndDate(JsonUtils.getFormJson(receiveJson,"end_date"));
        film.setActor(JsonUtils.getFormJson(receiveJson,"actor"));
        film.setImg(JsonUtils.getFormJson(receiveJson,"img"));
        int num= filmService.addFilm(film);
     System.out.println("-----num---"+num);
      if(num>0){
          return JsonUtils.delSuccess();
      }
     else return JsonUtils.delFailure();



    }

    @RequestMapping(value = "/deleteFilm/{id}",method = RequestMethod.GET)
    public String deleteFilmById(@PathVariable Integer id) throws JsonProcessingException {
        System.out.println("---id---"+id);
        int num= filmService.deleteFilmById(id);
        if (num>0){
            return JsonUtils.delSuccess();
        }else return JsonUtils.delFailure();
    }
    @RequestMapping(value = "/deleteFilms",method = RequestMethod.POST)
    @ResponseBody
    public String deleteMovieCrews(@RequestBody String receiveJson) throws JsonProcessingException {
        System.out.println("---receiveJson---"+receiveJson);
        ObjectMapper mapper=new ObjectMapper();
        ArrayList<Integer> ids=mapper.readValue(JsonUtils.getFormJson(receiveJson,"ids"), ArrayList.class);

        System.out.println("---  ArrayList  from  json  ---"+ids);
        int num= filmService.deleteFilmByIds( ids);
        if (num==ids.size()){
            return JsonUtils.delSuccess();
        }
        else return JsonUtils.delFailure();
    }
    @RequestMapping(value = "/modifyFilm",method = RequestMethod.POST,produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String modifyMovieCrew(@RequestBody String receiveJson) throws JsonProcessingException {
        System.out.println("---receiveJson---"+receiveJson);

        Film film=new Film();
        film.setFilmId(Integer.parseInt(JsonUtils.getFormJson(receiveJson,"film_id")));
        film.setFilmName(JsonUtils.getFormJson(receiveJson,"film_name"));
        film.setFilmLength(JsonUtils.getFormJson(receiveJson,"film_length"));
        film.setProductArea(JsonUtils.getFormJson(receiveJson,"product_area"));

        film.setBrief(JsonUtils.getFormJson(receiveJson,"brief"));
        film.setDirector(JsonUtils.getFormJson(receiveJson,"director"));
        film.setPublicDate(JsonUtils.getFormJson(receiveJson,"public_date"));
        film.setEndDate(JsonUtils.getFormJson(receiveJson,"end_date"));
        film.setType(JsonUtils.getFormJson(receiveJson,"type"));
        film.setActor(JsonUtils.getFormJson(receiveJson,"actor"));
        if (JsonUtils.getFormJson(receiveJson,"img")!=""){
            film.setImg(JsonUtils.getFormJson(receiveJson,"img"));
        }

        System.out.println("----Film---"+film);
//
        int num= filmService.modifyFilm(film);
        if (num>0){
            return JsonUtils.delSuccess();
        }
        else return JsonUtils.delFailure();
    }
    @RequestMapping(value = "/film",method = RequestMethod.GET)
    public String pageForMovieCrew(@RequestParam("page")Integer page,@RequestParam("pageSize")Integer pageSize) throws JsonProcessingException {
        System.out.println("--page and  pageSize--"+page+"---"+pageSize);
        System.out.println("----------get  ------------------");
        int count=filmService.getFilmCount();
        PageManager pageManager=new PageManager(page,pageSize,count);
        int start=(page-1)*pageSize;
        ObjectMapper mapper=new ObjectMapper();

        String j1=mapper.writeValueAsString(pageManager);
        String j2=mapper.writeValueAsString(filmService.getFilmPage(start,pageSize));
        if (pageManager.isOutPage()){
            return JsonUtils.delFailure();
        }
        else return JsonUtils.pageJson(mapper.readTree(j1),mapper.readTree(j2));
    }
    @RequestMapping(value = "/film/search",method = RequestMethod.GET)
    public String searchFilm(@RequestParam("film_name")String film_name, @RequestParam("director")String director,
                            @RequestParam("product_area")String product_area,
                            @RequestParam("type")String type) throws JsonProcessingException {
        System.out.println("film search---");
        ObjectMapper mapper=new ObjectMapper();
        return mapper.writeValueAsString(filmService.searchFilm(film_name, director, product_area, type));
    }

}
