package com.example.tp.controller;

import com.example.tp.entity.User;
import com.example.tp.service.UserService;
import com.example.tp.token.ObjectToken;
import com.example.tp.utils.JsonUtils;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.sun.javafx.collections.MappingChange;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import sun.security.util.Password;

import java.security.NoSuchAlgorithmException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@Controller
@RequestMapping(value = "/user")
public class UserController {
    @Autowired
    private UserService userService;


    /**
     * 根据id获得单个用户
     * @param id
     * @return
     * @throws JsonProcessingException
     */
    @RequestMapping(value = "/getUser/{id}",method = RequestMethod.GET)
    public String getUserById(@PathVariable Integer id/*,@RequestBody String User, HttpServletRequest request*/) throws JsonProcessingException {
//jackson将对象实体转换为json数据字符串
      ObjectMapper mapper=new ObjectMapper();
      String jsonstr=mapper.writeValueAsString(userService.getUserById(id));
        return jsonstr;
    }


    /**
     * 获得所有用户
     * @return
     * @throws JsonProcessingException
     */
    @RequestMapping(value = "/getAllUser",method = RequestMethod.GET)
    public String getAllUser() throws JsonProcessingException {
        ObjectMapper  mapper=new ObjectMapper();

        String jsonstr=mapper.writeValueAsString(userService.getAllUser());

        System.out.println(userService.getAllUser());
        return jsonstr;
    }

    /**
     * 登录功能
     * @param json
     * @return
     */
    @RequestMapping(value = "/doLogin",method = RequestMethod.POST,produces ="application/json;charset=UTF-8")
   @ResponseBody
    public String login(@RequestBody String json) throws JsonProcessingException, NoSuchAlgorithmException {
        System.out.println(json);
        System.out.println("--------------------------");
//        创建mapper对象
        ObjectMapper mapper = new ObjectMapper();
//        读取获得的，客户端传来的json
        JsonNode node = mapper.readTree(json);
//        读取token的节点
        JsonNode tokenNode=node.path("token");
//        将读取的node节点转换为字符串得到token
        String readtoken=mapper.writeValueAsString(tokenNode);
//        处理双引号
        String token=readtoken.replace("\"","");
//        如果客户端传来的登录信息中token值为空,判定为第一次登录，或的登录过期。或为重新登录
        //            读取params节点
        String nickname=JsonUtils.getFormJson(json,"nickname");
        String password=JsonUtils.getFormJson(json,"password");
        ObjectToken objectToken=new ObjectToken.Builder().setNikeName(nickname).setPassWord(password).build();

        System.out.println("user:"+nickname);
        System.out.println("user:"+password);
//            执行数据库查询操作
            Map<String,String> map=new HashMap<>();
            map.put("nickname",nickname);
            List<User> list=userService.getByName(map);


            if(list.size()==1){/*数据有值*/
//                吧token插入Redis,返回

//
                User user=list.get(0);
                System.out.println("user:"+user);
                String db_pwd=user.getPassWord();
                System.out.println("----pwd---"+db_pwd);
//                判断String是否相等用equals方法
                if(password.equals(db_pwd)){
                    System.out.println("--------if------");
                    return JsonUtils.tokenInJson(objectToken.token);
                }else {
                    System.out.println("--------else------");
                    return JsonUtils.doOtherCode(800,"不存在该用户请注册");
                }
            }else {
                System.out.println("--------end------");
                return JsonUtils.doOtherCode(800,"不存在该用户请注册");
            }









    }

    /**
     * 注册功能
     * @param json
     * @return
     * @throws JsonProcessingException
     */
    @RequestMapping(value = "/doRegist",method = RequestMethod.POST,produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String doRegist(@RequestBody String json ) throws JsonProcessingException {
//        创建mapper对象
        ObjectMapper mapper = new ObjectMapper();
//        读取获得的，客户端传来的json
        JsonNode node = mapper.readTree(json);
        JsonNode nickNameNode = node.path("nickname");
        JsonNode passwordNode = node.path("password");
        JsonNode sexNode = node.path("sex");
        JsonNode phoneNode = node.path("phone");
        String nickname = mapper.writeValueAsString(nickNameNode).replace("\"", "");
        String password = mapper.writeValueAsString(passwordNode).replace("\"", "");
        String sex = mapper.writeValueAsString(sexNode).replace("\"", "");
        String phone = mapper.writeValueAsString(phoneNode).replace("\"", "");
//        进行数据库查询操作,说明;数据库字段，昵称唯一，手机号码唯一
        Map<String, String> map = new HashMap<>();
        map.put("nickname", nickname);
        List<User> list = userService.getByName(map);

        if(!list.isEmpty()){
//             User user= list.get(0);

               return JsonUtils.doOtherCode(800,"此昵称已存在，请重新输入");

          }else {
            Map<String,String> map1=new HashMap<>();
            map1.put("phone",phone);
            List<User> list2=userService.getByPhone(map1);
            if(list2.isEmpty()){
//                如果数据库中没有相同的昵称和手机号则写入数据
//         long createtime=System.currentTimeMillis();
                String createtime=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(Calendar.getInstance().getTime());
               System.out.println(createtime);
               System.out.println("---------------------");
             int num=  userService.insertRegist(nickname,password,sex,phone,createtime);
                System.out.println("-----------插入个数---------"+num);
                return JsonUtils.doOtherCode(200,"亲！！您已注册成功，请前往登录");
            }else return JsonUtils.doOtherCode(800,"此手机号码已经被人注册");
        }
    }



}
