package com.example.tp.controller;

import com.example.tp.entity.Snacks;
import com.example.tp.service.SnacksService;
import com.example.tp.utils.JsonUtils;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import netscape.javascript.JSUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class SnacksController {
    @Autowired
    private SnacksService snacksService;
    @RequestMapping(value = "/addSnack",method = RequestMethod.POST,produces ="application/json;charset=UTF-8")
    @ResponseBody
    public String addSnack(@RequestBody String receiveJson) throws JsonProcessingException{
        Snacks snacks=new Snacks();
        snacks.setCinemaId(Integer.parseInt(JsonUtils.getFormJson(receiveJson,"cinema_id")));
        snacks.setSnackId(Integer.parseInt(JsonUtils.getFormJson(receiveJson,"snack_id")));
        snacks.setName(JsonUtils.getFormJson(receiveJson,"name"));
        snacks.setNumType(JsonUtils.getFormJson(receiveJson,"num_type"));
        snacks.setOriginPrice(Double.parseDouble(JsonUtils.getFormJson(receiveJson,"origin_price")));
        snacks.setDiscount(JsonUtils.getFormJson(receiveJson,"discount"));
        snacks.setDiscountPrice(Double.parseDouble(JsonUtils.getFormJson(receiveJson,"discount_price")));
        snacks.setImg(JsonUtils.getFormJson(receiveJson,"img"));
        snacks.setItem1(JsonUtils.getFormJson(receiveJson,"item1"));
        snacks.setItem2(JsonUtils.getFormJson(receiveJson,"item2"));
        snacks.setItem3(JsonUtils.getFormJson(receiveJson,"item3"));
        snacks.setItem4(JsonUtils.getFormJson(receiveJson,"item4"));
        snacks.setItSize1(JsonUtils.getFormJson(receiveJson,"it_size1"));
        snacks.setItSize2(JsonUtils.getFormJson(receiveJson,"it_size2"));
        snacks.setItSize3(JsonUtils.getFormJson(receiveJson,"it_size3"));
        snacks.setItSize4(JsonUtils.getFormJson(receiveJson,"it_size4"));
        snacks.setItNum1(JsonUtils.getFormJson(receiveJson,"it_num1"));
        snacks.setItNum2(JsonUtils.getFormJson(receiveJson,"it_num2"));
        snacks.setItNum3(JsonUtils.getFormJson(receiveJson,"it_num3"));
        snacks.setItNum4(JsonUtils.getFormJson(receiveJson,"it_num4"));
        int num=snacksService.addSnack(snacks);
        if (num>0){
            return JsonUtils.delSuccess();
        }else return JsonUtils.delFailure();
    }
    @RequestMapping(value = "/mySnacks/{id}",method = RequestMethod.GET)
    public String mySnacks(@PathVariable Integer id) throws JsonProcessingException {
        ObjectMapper mapper=new ObjectMapper();
        return mapper.writeValueAsString(snacksService.mySnacks(id));
    }
    @RequestMapping(value = "/deleteSnack",method = RequestMethod.POST,produces ="application/json;charset=UTF-8")
    @ResponseBody
    public String deleteSnack(@RequestBody String receiveJson) throws JsonProcessingException{
        int c_id=Integer.parseInt(JsonUtils.getFormJson(receiveJson,"cinema_id"));
        int s_id=Integer.parseInt(JsonUtils.getFormJson(receiveJson,"snack_id"));
        int num=snacksService.deleteSnack(c_id,s_id);
        if (num>0){
            return JsonUtils.delSuccess();
        }else return JsonUtils.delFailure();
    }
}
