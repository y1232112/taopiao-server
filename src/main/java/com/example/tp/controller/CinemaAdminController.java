package com.example.tp.controller;

import com.example.tp.entity.Cinema;
import com.example.tp.entity.CinemaAdmin;
import com.example.tp.entity.MovieCrew;
import com.example.tp.entity.PageManager;
import com.example.tp.service.AssignService;
import com.example.tp.service.CinemaAdminService;
import com.example.tp.service.CinemaService;
import com.example.tp.service.FilmService;
import com.example.tp.utils.JsonUtils;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;

@RestController
public class CinemaAdminController {
    @Autowired
    private CinemaAdminService cinemaAdminService;
    @Autowired
    private AssignService assignService;
    /**
     *
     * 根据id查询影院管理员信息
     * @param id
     * @return
     * @throws JsonProcessingException
     */
    @RequestMapping(value = "/cinemaAdminList/{id}",method = RequestMethod.GET)
    public String getByAdmin(@PathVariable Integer id) throws JsonProcessingException {
        ObjectMapper mapper=new ObjectMapper();
        String json=mapper.writeValueAsString(cinemaAdminService.getCinemaAdminByid(id));
        return json;
    }

    /**
     *
     * 加载所有影院管理员信息
     * @return
     * @throws JsonProcessingException
     */
    @RequestMapping(value = "/cinemaAdminList",method = RequestMethod.GET)
    public String getAllCinemaAdmin() throws JsonProcessingException {
        ObjectMapper mapper=new ObjectMapper();
        String json;
        json=mapper.writeValueAsString(cinemaAdminService.getAllCinemaAdmin());
        return json;
    }
    @RequestMapping(value = "/cinemaAdmin",method = RequestMethod.GET)
    public String pageForMovieCrew(@RequestParam("page")Integer page,@RequestParam("pageSize")Integer pageSize) throws JsonProcessingException {
        System.out.println("--page and  pageSize--"+page+"---"+pageSize);
        System.out.println("----------get  ------------------");
        int count=cinemaAdminService.getCinemaAdminCount();
        PageManager pageManager=new PageManager(page,pageSize,count);
        int start=(page-1)*pageSize;
        ObjectMapper mapper=new ObjectMapper();

        String j1=mapper.writeValueAsString(pageManager);
        String j2=mapper.writeValueAsString(cinemaAdminService.getCinemaAdminPage(start,pageSize));
        System.out.println("----"+j1+"---"+j2);
        if (pageManager.isOutPage()){
            return JsonUtils.delFailure();
        }
        else return JsonUtils.pageJson(mapper.readTree(j1),mapper.readTree(j2));
    }
    @RequestMapping(value = "/addCinemaAdmin",method = RequestMethod.POST,produces ="application/json;charset=UTF-8")
    @ResponseBody
    public String addCinema(@RequestBody String receiveJson) throws JsonProcessingException {
        CinemaAdmin cinemaAdmin=new CinemaAdmin();
        cinemaAdmin.setNickName(JsonUtils.getFormJson(receiveJson,"nick_name"));
//        cinemaAdmin.setPassword(JsonUtils.getFormJson(receiveJson,"password"));
        cinemaAdmin.setPhone(JsonUtils.getFormJson(receiveJson,"phone"));
        cinemaAdmin.setBirth(JsonUtils.getFormJson(receiveJson,"birth"));
        cinemaAdmin.setRealName(JsonUtils.getFormJson(receiveJson,"real_name"));
        cinemaAdmin.setSex(JsonUtils.getFormJson(receiveJson,"sex"));
        cinemaAdmin.setAvatar(JsonUtils.getFormJson(receiveJson,"avatar"));
        System.out.println(cinemaAdmin.toString());
        int num=cinemaAdminService.addCinemaAdmin(cinemaAdmin);
        if (num>0){
            return JsonUtils.delSuccess();
        }else return JsonUtils.delFailure();
    }
    @RequestMapping(value = "/modifyCinemaAdmin",method = RequestMethod.POST,produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String modifyCinemaAdmin(@RequestBody String receiveJson) throws JsonProcessingException {
        System.out.println("---receiveJson---"+receiveJson);

        CinemaAdmin cinemaAdmin=new CinemaAdmin();
       cinemaAdmin.setCinemaAdminId(Integer.parseInt(JsonUtils.getFormJson(receiveJson,"cinema_admin_id")));
       cinemaAdmin.setNickName(JsonUtils.getFormJson(receiveJson,"nick_name"));
        cinemaAdmin.setPhone(JsonUtils.getFormJson(receiveJson,"phone"));
        cinemaAdmin.setSex(JsonUtils.getFormJson(receiveJson,"sex"));
        cinemaAdmin.setBirth(JsonUtils.getFormJson(receiveJson,"birth"));
        cinemaAdmin.setRealName(JsonUtils.getFormJson(receiveJson,"real_name"));
        cinemaAdmin.setAvatar(JsonUtils.getFormJson(receiveJson,"avatar"));
//
        int num= cinemaAdminService.modifyCinemaAdmin(cinemaAdmin);
        if (num>0){
            return JsonUtils.delSuccess();
        }
        else return JsonUtils.delFailure();
    }
    @RequestMapping(value = "/deleteCinemaAdmin/{id}",method = RequestMethod.GET)
    public String deleteMovieCrew(@PathVariable("id") Integer id) throws JsonProcessingException {
        System.out.println("---id---"+id);
        int num=cinemaAdminService.deleteCinemaAdminById(id);
        if(num>0){
            return JsonUtils.delSuccess();
        }else return JsonUtils.delFailure();
    }
    @RequestMapping(value = "/deleteCinemaAdmins",method = RequestMethod.POST,produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String deleteCinemaAdmins(@RequestBody String receiveJson) throws JsonProcessingException {
        System.out.println("---receiveJson---"+receiveJson);
        ObjectMapper mapper=new ObjectMapper();
        ArrayList<Integer> ids=mapper.readValue(JsonUtils.getFormJson(receiveJson,"ids"), ArrayList.class);

        System.out.println("---  ArrayList  from  json  ---"+ids);
        int num= cinemaAdminService.deleteCinemaAdminByIds(ids);
        if (num==ids.size()){
            return JsonUtils.delSuccess();
        }
        else return JsonUtils.delFailure();
    }
    @RequestMapping(value = "/cinemaAdmin/search",method = RequestMethod.GET)
    public String searchCinema(@RequestParam("nick_name")String nick_name,
                               @RequestParam("phone")String phone,@RequestParam("real_name")String real_name) throws JsonProcessingException {
        ObjectMapper mapper=new ObjectMapper();

        return mapper.writeValueAsString(cinemaAdminService.searchCinemaAdmin(nick_name,phone,real_name));
    }
    @RequestMapping(value = "/cinemaAdmin/assignAdminIds",method = RequestMethod.GET)
    public String selectAssignCinemaAdminIds() throws IOException {

        return JsonUtils.assignIdsJson(assignService.selectAssignCinemaAdminIds());
    }
   @RequestMapping(value = "/cinemaAdmin/receiveOne",method = RequestMethod.POST)
    @ResponseBody
    public String receiveOneAdmin(@RequestBody String receiveJson) throws JsonProcessingException {
        ObjectMapper mapper=new ObjectMapper();
        String nickName=JsonUtils.getFormJson(receiveJson,"nick_name");
        String password=JsonUtils.getFormJson(receiveJson,"password");
        return mapper.writeValueAsString(cinemaAdminService.selectCinemaAdminByNP(nickName,password));
   }

   //
   @RequestMapping(value = "/selectCinemaAdminOne/{id}",method = RequestMethod.GET)
   public String selectAdmin(@PathVariable Integer id) throws JsonProcessingException {
       ObjectMapper mapper=new ObjectMapper();
       String json=mapper.writeValueAsString(cinemaAdminService.getCinemaAdminByid(id));
       return json;
   }
    @RequestMapping(value = "/cinemaAdmin/up.do",method = RequestMethod.POST)
    @ResponseBody
    public String  updateSomenInfo(@RequestBody String receiveJson) throws JsonProcessingException {
        ObjectMapper mapper=new ObjectMapper();
        Integer id=Integer.parseInt(JsonUtils.getFormJson(receiveJson,"cinema_admin_id"));
        String nickName=JsonUtils.getFormJson(receiveJson,"nick_name");
        String password=JsonUtils.getFormJson(receiveJson,"password");
        String birth=JsonUtils.getFormJson(receiveJson,"birth");
        String phone=JsonUtils.getFormJson(receiveJson,"phone");
        String sex=JsonUtils.getFormJson(receiveJson,"sex");
        String realname=JsonUtils.getFormJson(receiveJson,"real_name");
       CinemaAdmin cinemaAdmin=new CinemaAdmin();
       cinemaAdmin.setRealName(realname);
       cinemaAdmin.setNickName(nickName);
       cinemaAdmin.setCinemaAdminId(id);
       cinemaAdmin.setBirth(birth);
       cinemaAdmin.setPassword(password);
       cinemaAdmin.setPhone(phone);
       cinemaAdmin.setSex(sex);
       System.out.println(cinemaAdmin);
       Integer r=cinemaAdminService.updateSomenInfo(cinemaAdmin);
        System.out.println("受影响的："+r);
       if (r==null){
           return JsonUtils.delFailure();
       }else {
           if (r>0){
               return JsonUtils.delSuccess();
           }else {
               return JsonUtils.delFailure();
           }
       }


    }
}
