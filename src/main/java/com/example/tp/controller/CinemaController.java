package com.example.tp.controller;

import com.example.tp.entity.Assign;
import com.example.tp.entity.Cinema;
import com.example.tp.entity.MovieCrew;
import com.example.tp.entity.PageManager;
import com.example.tp.service.AssignService;
import com.example.tp.service.CinemaAdminService;
import com.example.tp.service.CinemaService;
import com.example.tp.utils.JsonUtils;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

@RestController
public class CinemaController {
    @Autowired
    private CinemaService cinemaService;
    @Autowired
    private CinemaAdminService cinemaAdminService;
    @Autowired
    private AssignService assignService;
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
    @RequestMapping(value = "/cinema/assign/noAS",method = RequestMethod.GET)
    public String receiveNoAssCinemas() throws JsonProcessingException {
        ObjectMapper mapper=new ObjectMapper();
          System.out.println(cinemaService.selectCinemaNoAssign());
        return mapper.writeValueAsString(cinemaService.selectCinemaNoAssign());
    }
    @RequestMapping(value = "/cinema/noAssAdmin",method = RequestMethod.GET)
    public String getNoAssAdmin() throws JsonProcessingException {
       ObjectMapper mapper=new ObjectMapper();
        try {
            String json=mapper.writeValueAsString(cinemaAdminService.selectAdminNoAss());
            return json;
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return JsonUtils.delFailure();
        }

    }
    @RequestMapping(value = "/cinema/addAssignInfo",method = RequestMethod.POST)
    @ResponseBody
    public String addAssignInfo(@RequestBody String receiveJson) throws JsonProcessingException {
        Assign assign=new Assign();
        try {
            SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
            assign.setCinemaId(Integer.parseInt(JsonUtils.getFormJson(receiveJson,"cinema_id")));
            assign.setCinemaAdminId(Integer.parseInt(JsonUtils.getFormJson(receiveJson,"cinema_admin_id")));
            assign.setAssignTime(df.format(new Date()));
            int num=assignService.addAssignInfo(assign);
            if (num>0){
                return JsonUtils.delSuccess();
            }else return JsonUtils.delFailure();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return JsonUtils.delFailure();
        }
    }
    @RequestMapping(value = "/cinema/assignCinemaIds",method = RequestMethod.GET)
    public String selectAssignCinemaIds() throws IOException {

        return JsonUtils.assignIdsJson(assignService.selectAssignCinemaIds());
    }
    @RequestMapping(value = "/cinema/byAdminId/{id}",method = RequestMethod.GET)
    public String selectCinemaByAdminId(@PathVariable Integer id) throws JsonProcessingException {
       ObjectMapper mapper=new ObjectMapper();
       return mapper.writeValueAsString(cinemaService.selectCinemaByAdminId(id));
    }
    @RequestMapping(value = "/cinema/getNotice/{id}",method = RequestMethod.GET)
    public String getNotice(@PathVariable Integer id) throws JsonProcessingException {
        System.out.println("---id---"+id);
        return cinemaService.getNotice(id);

    }
    @RequestMapping(value = "/cinema/modifyNotice",method = RequestMethod.POST,produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String modifyNotice(@RequestBody String receiveJson) throws JsonProcessingException{
        int id=Integer.parseInt(JsonUtils.getFormJson(receiveJson,"cinema_id"));
        String notice=JsonUtils.getFormJson(receiveJson,"notice");
        int num=cinemaService.updateNotice(id,notice);
        if (num>0){
            return JsonUtils.delSuccess();
        }else return JsonUtils.delFailure();
    }

}
