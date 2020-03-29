package com.example.tp.controller;

import com.example.tp.entity.Cinema;
import com.example.tp.entity.MovieCrew;
import com.example.tp.entity.PageManager;
import com.example.tp.service.CinemaService;
import com.example.tp.utils.JsonUtils;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
public class CinemaController {
    @Autowired
    private CinemaService cinemaService;
    @RequestMapping(value = "/CinemaList",method = RequestMethod.GET)
    public String cinemalist() throws JsonProcessingException {
        ObjectMapper mapper=new ObjectMapper();
        String json;
        try {
            json=mapper.writeValueAsString(cinemaService.getAllCinema());

        } catch (JsonProcessingException e) {
            return JsonUtils.delFailure();
        }
        return  json;

    }
    @RequestMapping(value = "/deleteCinema/{id}",method = RequestMethod.GET)
    public String deleteCinemaById(@PathVariable Integer id) throws JsonProcessingException {
        System.out.println("---id---"+id);
        int num=cinemaService.deleteCinemaById(id);
        if (num>0){
            return JsonUtils.delSuccess();
        }else return JsonUtils.delFailure();
    }
    @RequestMapping(value = "/addCinema",method = RequestMethod.POST,produces ="application/json;charset=UTF-8")
    @ResponseBody
    public String addCinema(@RequestBody String receiveJson) throws JsonProcessingException {
        Cinema cinema=new Cinema();
        cinema.setCinemaName(JsonUtils.getFormJson(receiveJson,"cinema_name"));
        cinema.setProvince(JsonUtils.getFormJson(receiveJson,"province"));
        cinema.setCity(JsonUtils.getFormJson(receiveJson,"city"));
        cinema.setCounty(JsonUtils.getFormJson(receiveJson,"county"));
        cinema.setAddress(JsonUtils.getFormJson(receiveJson,"address"));
        int num=cinemaService.addCinema(cinema);
        if (num>0){
            return JsonUtils.delSuccess();
        }else return JsonUtils.delFailure();
    }
    @RequestMapping(value = "/deleteCinemas",method = RequestMethod.POST,produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String deleteMovieCrews(@RequestBody String receiveJson) throws JsonProcessingException {
        System.out.println("---receiveJson---"+receiveJson);
        ObjectMapper mapper=new ObjectMapper();
        ArrayList<Integer> ids=mapper.readValue(JsonUtils.getFormJson(receiveJson,"ids"), ArrayList.class);

        System.out.println("---  ArrayList  from  json  ---"+ids);
        int num= cinemaService.deleteCinemaByIds(ids);
        if (num==ids.size()){
            return JsonUtils.delSuccess();
        }
        else return JsonUtils.delFailure();
    }
    @RequestMapping(value = "/modifyCinema",method = RequestMethod.POST,produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String modifyMovieCrew(@RequestBody String receiveJson) throws JsonProcessingException {
        System.out.println("---receiveJson---"+receiveJson);

        Cinema cinema=new Cinema();
       cinema.setCinemaId(Integer.parseInt(JsonUtils.getFormJson(receiveJson,"cinema_id")));
        cinema.setCinemaName(JsonUtils.getFormJson(receiveJson,"cinema_name"));
        cinema.setProvince(JsonUtils.getFormJson(receiveJson,"province"));
        cinema.setCity(JsonUtils.getFormJson(receiveJson,"city"));
        cinema.setCounty(JsonUtils.getFormJson(receiveJson,"county"));
        cinema.setAddress(JsonUtils.getFormJson(receiveJson,"address"));
//
        int num= cinemaService.modifyCinema(cinema);
        if (num>0){
            return JsonUtils.delSuccess();
        }
        else return JsonUtils.delFailure();
    }
    @RequestMapping(value = "/cinema",method = RequestMethod.GET)
    public String pageForMovieCrew(@RequestParam("page")Integer page,@RequestParam("pageSize")Integer pageSize) throws JsonProcessingException {
        System.out.println("--page and  pageSize--"+page+"---"+pageSize);
        System.out.println("----------get  ------------------");
        int count=cinemaService.getCinemaCount();
        PageManager pageManager=new PageManager(page,pageSize,count);
        int start=(page-1)*pageSize;
        ObjectMapper mapper=new ObjectMapper();

        String j1=mapper.writeValueAsString(pageManager);
        String j2=mapper.writeValueAsString(cinemaService.getCinemaPage(start,pageSize));
        if (pageManager.isOutPage()){
            return JsonUtils.delFailure();
        }
        else return JsonUtils.pageJson(mapper.readTree(j1),mapper.readTree(j2));
    }
    @RequestMapping(value = "/cinema/search",method = RequestMethod.GET)
    public String searchCinema(@RequestParam("cinema_name")String cinema_name,
                               @RequestParam("province")String province,@RequestParam("city")String city) throws JsonProcessingException {
        ObjectMapper mapper=new ObjectMapper();
    System.out.println("-----"+cinema_name+"---"+province+"----"+city);
        return mapper.writeValueAsString(cinemaService.searchCinema(cinema_name,province,city));
    }
}
