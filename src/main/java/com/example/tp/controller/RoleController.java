package com.example.tp.controller;

import com.example.tp.entity.Role;
import com.example.tp.service.RoleService;
import com.example.tp.utils.JsonUtils;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class RoleController {
    @Autowired
    private RoleService roleService;
    @RequestMapping(value = "/addRole",method = RequestMethod.POST,produces ="application/json;charset=UTF-8")
    @ResponseBody
    public String addRole(@RequestBody String receiveJson) throws JsonProcessingException{
        Role role=new Role();
        role.setFilmId(Integer.parseInt(JsonUtils.getFormJson(receiveJson,"film_id")));
        role.setMovieCrewId(Integer.parseInt(JsonUtils.getFormJson(receiveJson,"movie_crew_id")));
        role.setRole(JsonUtils.getFormJson(receiveJson,"role"));
        int num=roleService.addRole(role);
        if (num>0){
            return JsonUtils.delSuccess();
        }else return JsonUtils.delFailure();
    }
}
