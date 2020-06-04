package com.example.tp.controller;

import com.example.tp.entity.MovieCrew;
import com.example.tp.entity.PageManager;
import com.example.tp.service.MovieCrewService;
import com.example.tp.utils.JsonUtils;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class MovieCrewController {
    @Autowired
    private MovieCrewService movieCrewService;

    /**
     * 获取所有影员
     * @return
     * @throws JsonProcessingException
     */
    @RequestMapping(value = "/MovieCrewList",method = RequestMethod.GET)

    public String getAllMovieCrew() throws JsonProcessingException {
        ObjectMapper mapper=new ObjectMapper();
        String json;
        json=mapper.writeValueAsString(movieCrewService.getAllMovieCrew());
        return json;
    }

    /**
     * 添加单个影员
     * @param receiveJson
     * @return
     * @throws JsonProcessingException
     */
    @RequestMapping(value = "/addMovieCrew",method = RequestMethod.POST,produces ="application/json;charset=UTF-8")
    @ResponseBody
    public String addMovieCrew(@RequestBody String receiveJson) throws JsonProcessingException {
        MovieCrew movieCrew=new MovieCrew();
        movieCrew.setMovieCrewName(JsonUtils.getFormJson(receiveJson,"movie_crew_name"));
        movieCrew.setSex(JsonUtils.getFormJson(receiveJson,"sex"));
        movieCrew.setImg(JsonUtils.getFormJson(receiveJson,"img"));
        int num=movieCrewService.addMovieCrew(movieCrew);
        if (num>0){
            return JsonUtils.delSuccess();
        }
        else return JsonUtils.delFailure();
    }

    /**
     * 删除单个影员
     * @param id
     * @return
     * @throws JsonProcessingException
     */
    @RequestMapping(value = "/deleteMovieCrew/{id}",method = RequestMethod.GET)
    public String deleteMovieCrew(@PathVariable("id") Integer id) throws JsonProcessingException {
        System.out.println("---id---"+id);
        int num=movieCrewService.deleteMovieCrewById(id);
        if(num>0){
            return JsonUtils.delSuccess();
        }else return JsonUtils.delFailure();
    }

    /**
     * ]根据id集合批量删除影员
     * @param receiveJson
     * @return
     * @throws JsonProcessingException
     */
    @RequestMapping(value = "/deleteMovieCrews",method = RequestMethod.POST,produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String deleteMovieCrews(@RequestBody String receiveJson) throws JsonProcessingException {
        System.out.println("---receiveJson---"+receiveJson);
        ObjectMapper mapper=new ObjectMapper();
        ArrayList<Integer> ids=mapper.readValue(JsonUtils.getFormJson(receiveJson,"ids"), ArrayList.class);

        System.out.println("---  ArrayList  from  json  ---"+ids);
       int num= movieCrewService.deleteMovieCrewByIds(ids);
       if (num==ids.size()){
           return JsonUtils.delSuccess();
       }
    else return JsonUtils.delFailure();
    }

    /**
     * 修改影员
     * @param receiveJson
     * @return
     * @throws JsonProcessingException
     */
    @RequestMapping(value = "/modifyMovieCrew",method = RequestMethod.POST,produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String modifyMovieCrew(@RequestBody String receiveJson) throws JsonProcessingException {
        System.out.println("---receiveJson---"+receiveJson);

        MovieCrew movieCrew=new MovieCrew();
       movieCrew.setMovieCrewId(Integer.parseInt(JsonUtils.getFormJson(receiveJson,"movie_crew_id")));
       movieCrew.setMovieCrewName(JsonUtils.getFormJson(receiveJson,"movie_crew_name"));

        movieCrew.setSex(JsonUtils.getFormJson(receiveJson,"sex"));
        if (!JsonUtils.getFormJson(receiveJson,"img").equals("")){
            movieCrew.setImg(JsonUtils.getFormJson(receiveJson,"img"));
        }
//
        int num= movieCrewService.modifyMovieCrew(movieCrew);
        if (num>0){
            return JsonUtils.delSuccess();
        }
        else return JsonUtils.delFailure();
    }
    @RequestMapping(value = "/movieCrew",method = RequestMethod.GET)
    public String pageForMovieCrew(@RequestParam("page")Integer page,@RequestParam("pageSize")Integer pageSize) throws JsonProcessingException {
        System.out.println("--page and  pageSize--"+page+"---"+pageSize);
        System.out.println("----------get  ------------------");
        int count=movieCrewService.getMovieCrewCount();
        PageManager pageManager=new PageManager(page,pageSize,count);
        int start=(page-1)*pageSize;
        ObjectMapper mapper=new ObjectMapper();

        String j1=mapper.writeValueAsString(pageManager);
        String j2=mapper.writeValueAsString(movieCrewService.getMovieCrewPage(start,pageSize));
        System.out.println("----"+j1+"---"+j2);
        if (pageManager.isOutPage()){
            return JsonUtils.delFailure();
        }
       else return JsonUtils.pageJson(mapper.readTree(j1),mapper.readTree(j2));
    }
    @RequestMapping(value = "/movieCrew/search",method = RequestMethod.GET,produces = "application/json;charset=UTF-8")
    public String searchMovieCrew(@RequestParam("movie_crew_name") String movie_crew_name) throws JsonProcessingException {
        ObjectMapper mapper=new ObjectMapper();
        return mapper.writeValueAsString(movieCrewService.searchMovieCrew(movie_crew_name));
    }

}
