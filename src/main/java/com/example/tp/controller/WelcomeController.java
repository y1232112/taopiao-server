package com.example.tp.controller;

import com.example.tp.entity.Admin;
import com.example.tp.entity.CinemaAdmin;
import com.example.tp.service.AdminService;
import com.example.tp.service.CinemaAdminService;
import com.example.tp.utils.JsonUtils;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class WelcomeController {
    @Autowired
    private AdminService adminService;
    @Autowired
    private CinemaAdminService cinemaAdminService;

    /**
     * 处理系统管理员后台登录
     * @param json
     * @return
     * @throws JsonProcessingException
     */
    @RequestMapping(value = "sysadmin/doLogin",method = RequestMethod.POST,produces ="application/json;charset=UTF-8")
    @ResponseBody
    public String doLogin(@RequestBody String json) throws JsonProcessingException {
        System.out.println("------jjj-------"+json);
        ObjectMapper mapper=new ObjectMapper();
        JsonNode node=mapper.readTree(json);
        JsonNode adminNode=node.path("admin");
        JsonNode passwordNode=node.path("password");
        String admin=mapper.writeValueAsString(adminNode).replace("\"","");
        String pwd=mapper.writeValueAsString(passwordNode).replace("\"","");
        System.out.println("------name and pwd-------"+admin+"--"+pwd);
        Map<String,String> map=new HashMap<>();
        map.put("admin",admin);
        List<Admin> admins=adminService.getByAdmin(map);
        if (admins.size()!=0){
            Admin db_data=admins.get(0);
            if(admin.equals(db_data.getAdmin())&&db_data.getPassword().equals(pwd)){

                return JsonUtils.delSuccess();
            }else return  JsonUtils.delFailure();
        }else
            return JsonUtils.delFailure();
    }

    /**
     * 影城模块，管理员登录
     *
     * @param json
     * @return
     * @throws JsonProcessingException
     */
    @RequestMapping(value = "cinemaAdmin/doLogin",method = RequestMethod.POST,produces ="application/json;charset=UTF-8")
    @ResponseBody
    public String cinemaAdminDoLogin(@RequestBody String json) throws JsonProcessingException {
        System.out.println("------jjj-------"+json);
        ObjectMapper mapper=new ObjectMapper();
        JsonNode node=mapper.readTree(json);
        JsonNode adminNode=node.path("admin");
        JsonNode passwordNode=node.path("password");
        String admin=mapper.writeValueAsString(adminNode).replace("\"","");
        String pwd=mapper.writeValueAsString(passwordNode).replace("\"","");
        System.out.println("------name and pwd-------"+admin+"--"+pwd);
        Map<String,String> map=new HashMap<>();
        map.put("nickname",admin);
        List<CinemaAdmin> admins=cinemaAdminService.selectByNick(map);

        if (admins.size()!=0){
            CinemaAdmin db_data=admins.get(0);
            System.out.println("--cinemaAdmin--"+db_data.getNickName());
            if(admin.equals(db_data.getNickName())&&db_data.getPassword().equals(pwd)){

                return JsonUtils.delSuccess();
            }else return  JsonUtils.delFailure();
        }else
            return JsonUtils.delFailure();
    }
}
