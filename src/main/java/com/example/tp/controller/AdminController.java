package com.example.tp.controller;

import com.example.tp.entity.Admin;
import com.example.tp.service.AdminService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import sun.rmi.runtime.Log;

import java.io.Console;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RequestMapping(value = "welcome/admin")
//@Controller
@RestController
public class AdminController {
 @Autowired
 private AdminService adminService;

    /**
     * 根据id查找
     * @param id
     * @return
     */
    @RequestMapping(value = "getAdmin/{id}",method = RequestMethod.GET )
    public String getAdminByid(@PathVariable Integer id) throws JsonProcessingException {

        ObjectMapper mapper=new ObjectMapper();
        String jstr=mapper.writeValueAsString(adminService.getAdminById(id));
        return jstr;
    }


}
