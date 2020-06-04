package com.example.tp.controller;

import com.example.tp.entity.Serve;
import com.example.tp.service.ServeService;
import com.example.tp.utils.JsonUtils;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class ServeController {
    @Autowired
    private ServeService serveService;

    /**
     * 影院添加服务
     * @param receiveJson
     * @return
     * @throws JsonProcessingException
     */
    @RequestMapping(value = "/addServe",method = RequestMethod.POST,produces ="application/json;charset=UTF-8")
    @ResponseBody
    public String addServe(@RequestBody String receiveJson) throws JsonProcessingException{
        Serve serve=new Serve();
        serve.setCinemaId(Integer.parseInt(JsonUtils.getFormJson(receiveJson,"cinema_id")));
        serve.setServeType(JsonUtils.getFormJson(receiveJson,"serve_type"));
        serve.setDescription(JsonUtils.getFormJson(receiveJson,"description"));
        int num=serveService.addServe(serve);
        if (num>0){
            return JsonUtils.delSuccess();
        }else return JsonUtils.delFailure();
    }

    /**
     * 查询对应影院的服务
     * @param id
     * @return
     * @throws JsonProcessingException
     */
    @RequestMapping(value = "/myServe/{id}",method = RequestMethod.GET)
    public String myServe(@PathVariable Integer id) throws JsonProcessingException {
        ObjectMapper mapper=new ObjectMapper();
        return mapper.writeValueAsString(serveService.myServe(id));
    }


    @RequestMapping(value = "/updateMyServe",method = RequestMethod.POST,produces ="application/json;charset=UTF-8")
    @ResponseBody
    public String updateMyServe(@RequestBody String receiveJson) throws JsonProcessingException{
        Serve serve=new Serve();
        serve.setCinemaId(Integer.parseInt(JsonUtils.getFormJson(receiveJson,"cinema_id")));
        serve.setServeType(JsonUtils.getFormJson(receiveJson,"serve_type"));
        serve.setDescription(JsonUtils.getFormJson(receiveJson,"description"));
        int num=serveService.updateMyServe(serve);
        if (num>0){
            return JsonUtils.delSuccess();
        }else return JsonUtils.delFailure();
    }
    @RequestMapping(value = "/deleteMyServe",method = RequestMethod.POST,produces ="application/json;charset=UTF-8")
    @ResponseBody
    public String deleteMyServe(@RequestBody String receiveJson) throws JsonProcessingException{
        Serve serve=new Serve();
        serve.setCinemaId(Integer.parseInt(JsonUtils.getFormJson(receiveJson,"cinema_id")));
        serve.setServeType(JsonUtils.getFormJson(receiveJson,"serve_type"));

        int num=serveService.deleteMyServe(serve);
        if (num>0){
            return JsonUtils.delSuccess();
        }else return JsonUtils.delFailure();
    }
}
