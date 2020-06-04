package com.example.tp.controller;

import com.example.tp.entity.*;
import com.example.tp.service.*;
import com.example.tp.token.ObjectToken;
import com.example.tp.utils.JsonUtils;
import com.example.tp.utils.MD5Utils;
import com.example.tp.utils.SaltUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import netscape.javascript.JSUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@Controller
@RequestMapping(value = "/user")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private RedisService redisService;
    @Autowired
    private FilmService filmService;
    @Autowired
    private UserFilmService userFilmService;
    @Autowired
    private RoleService roleService;
    @Autowired
    private CommentService commentService;
    @Autowired
    private ReplyService replyService;
    @Autowired
    private ZanService zanService;
  @Autowired
  private CinemaService cinemaService;
  @Autowired
   private SnacksService snacksService;
  @Autowired
  private ServeService serveService;
  @Autowired
  private ScheduleService scheduleService;
  @Autowired
  private SeatService seatService;
  @Autowired
  private HallService hallService;
  @Autowired
  OrderService orderService;
  @Autowired
  ItemService itemService;
  @Autowired
  OrderSnackService orderSnackService;

    /**
     * 根据id获得单个用户
     *
     * @param id
     * @return
     * @throws JsonProcessingException
     */
    @RequestMapping(value = "/getUser/{id}", method = RequestMethod.GET)
    public String getUserById(@PathVariable Integer id/*,@RequestBody String User, HttpServletRequest request*/) throws JsonProcessingException {
//jackson将对象实体转换为json数据字符串
        ObjectMapper mapper = new ObjectMapper();
        String jsonstr = mapper.writeValueAsString(userService.getUserById(id));
        if (jsonstr != null) {
            return JsonUtils.doRequestDataList("success", 200, mapper.readTree(jsonstr));
        } else {
            return JsonUtils.delFailure();
        }
    }


    /**
     * 获得所有用户
     *
     * @return
     * @throws JsonProcessingException
     */
    @RequestMapping(value = "/getAllUser", method = RequestMethod.GET)
    public String getAllUser() throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();

        String jsonstr = mapper.writeValueAsString(userService.getAllUser());
        if (jsonstr != null) {
            return JsonUtils.doRequestDataList("success", 200, mapper.readTree(jsonstr));
        } else {
            return JsonUtils.delFailure();
        }


    }

    /**
     * 登录功能
     *
     * @param json
     * @return
     */
    @RequestMapping(value = "/doLogin", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String login(@RequestBody String json) throws JsonProcessingException, NoSuchAlgorithmException {
        System.out.println(json);
        System.out.println("--------------------------");
//        创建mapper对象
        ObjectMapper mapper = new ObjectMapper();
//        读取获得的，客户端传来的json
        JsonNode node = mapper.readTree(json);
//        读取token的节点
//        JsonNode tokenNode=node.path("token");
//        将读取的node节点转换为字符串得到token
//        String readtoken=mapper.writeValueAsString(tokenNode);
//        处理双引号
//        String token=readtoken.replace("\"","");
//        如果客户端传来的登录信息中token值为空,判定为第一次登录，或的登录过期。或为重新登录
        //            读取params节点
        String nickname = JsonUtils.getFormJson(json, "nickname");
        String password = JsonUtils.getFormJson(json, "password");
        System.out.println(nickname + "------" + password);


        System.out.println("user:" + nickname);
        System.out.println("user:" + password);
//            执行数据库查询操作
        Map<String, String> map = new HashMap<>();
        map.put("nickname", nickname);
        List<User> list = userService.getByName(map);


        if (list.size() == 1) {/*数据有值*/
//                吧token插入Redis,返回

//
            User user = list.get(0);
            System.out.println("user:" + user);
            String db_pwd = user.getPassWord();
            Integer userID = user.getUserId();
            String salt = user.getSalt();

            System.out.println("----pwd---" + db_pwd);

            String match = MD5Utils.MD5Build(salt + password, "UTF-8");
            System.out.println("---match-pwd---" + match);
//                判断String是否相等用equals方法
            if (match.equals(db_pwd)) {
                System.out.println("--------if------");
//                    存在该用户则创建token
                ObjectToken objectToken = new ObjectToken.Builder().setUserId(userID).build();
//                    将token写入redis
                redisService.delToken(userID.toString(), objectToken.token);
                return JsonUtils.tokenInJson(userID, objectToken.token);
            } else {
                System.out.println("--------else------");
                return JsonUtils.doOtherCode(800, "登录失败", "不存在该用户请注册");
            }
        } else {
            System.out.println("--------end------");
            return JsonUtils.doOtherCode(800, "登录失败", "不存在该用户请注册");
        }


    }

    /**
     * 注册功能
     *
     * @param json
     * @return
     * @throws JsonProcessingException
     */
    @RequestMapping(value = "/doRegister", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String doRegist(@RequestBody String json) throws JsonProcessingException, NoSuchAlgorithmException {
        System.out.println("--- path ---/doRegister");
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

        if (!list.isEmpty()) {
//             User user= list.get(0);

            return JsonUtils.doOtherCode(800, "操作失败", "此昵称已存在，请重新输入");

        } else {
            Map<String, String> map1 = new HashMap<>();
            map1.put("phone", phone);
            List<User> list2 = userService.getByPhone(map1);
            if (list2.isEmpty()) {
//                如果数据库中没有相同的昵称和手机号则写入数据
//         long createtime=System.currentTimeMillis();
                String createtime = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(Calendar.getInstance().getTime());
                System.out.println(createtime);
                System.out.println("---------------------");
                //                加盐，获取8位的随机字符串（字母或数字)
                String salt = SaltUtil.getSalt();
                System.out.println("加盐" + salt);

                password = MD5Utils.MD5Build(salt + password, "UTF-8");

                int num = userService.insertRegist(nickname, password, sex, phone, createtime, salt);
                System.out.println("-----------插入个数---------" + num);
                return JsonUtils.doOtherCode(200, "注册成功", "亲！！您已注册成功，请前往登录");
            } else return JsonUtils.doOtherCode(800, "注册失败", "此手机号码已经被人注册");
        }
    }

    @RequestMapping(value = "/hotFilms/{city}", method = RequestMethod.GET)
    @ResponseBody
    public String getHotFilms(@PathVariable String city) throws JsonProcessingException {
        System.out.println("user-1111--hotFilms method");
        ObjectMapper mapper = new ObjectMapper();
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        String date = df.format(new Date());
        String json = mapper.writeValueAsString(filmService.getHotFilms(date,city));
        return JsonUtils.doRequestDataList("success", 200, mapper.readTree(json));
    }

    ;

    @RequestMapping(value = "/willFilms/{user_id}", method = RequestMethod.GET)
    @ResponseBody
    public String getWillFilms(@PathVariable String user_id) throws JsonProcessingException {
        System.out.println("user---willFilms method");
        ObjectMapper mapper = new ObjectMapper();

        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String date = df.format(new Date());
        String json = mapper.writeValueAsString(filmService.getWillFilms(date,Integer.parseInt(user_id)));
        return JsonUtils.doRequestDataList("success", 200, mapper.readTree(json));
    }



    @RequestMapping(value = "/myWishInfo/{id}", method = RequestMethod.GET)
    public String getWishFilmByUser(@PathVariable Integer id) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(userFilmService.getWishFilmByUser(id));
        return JsonUtils.doRequestDataList("success", 200, mapper.readTree(json));
    }

    @RequestMapping(value = "/dowish", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String doWish(@RequestBody String json) throws JsonProcessingException, NoSuchAlgorithmException {
        System.out.println("----------------s----------");
//        创建mapper对象
        ObjectMapper mapper = new ObjectMapper();
        JsonNode node = mapper.readTree(json);
        JsonNode Node1 = node.path("user_id");
        JsonNode Node2 = node.path("film_id");
        JsonNode Node3 = node.path("wish_status");
        String p1= mapper.writeValueAsString(Node1).replace("\"","");
        String p2= mapper.writeValueAsString(Node2).replace("\"","");
        String p3= mapper.writeValueAsString(Node3).replace("\"","");
        Integer user_id=Integer.parseInt(p1);
       Integer film_id=Integer.parseInt(p2);

       Integer wish_status=Integer.parseInt(p3);
        UserFilm userFilm=new UserFilm();
        userFilm.setFilmId(film_id);
        userFilm.setUserId(user_id);
        userFilm.setWishStatus(wish_status);
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String date = df.format(new Date());
        userFilm.setWishTime(date);
        System.out.println("你的;"+wish_status);
        System.out.println("user film"+userFilm);
       if (wish_status==0){

           int t=userFilmService.selectCountById(userFilm);
           userFilm.setWishStatus(1);
           if (t==0){
               System.out.println("---------------step1-------");
              int r= userFilmService.addWishFilm(userFilm);
               System.out.println("你查到的status是;"+t+"大小："+t);
               if (r>0){
                   System.out.println("---------------step3-------");
                   return JsonUtils.doMessage(200,"已想看");
               }else {
                   return JsonUtils.doMessage(800,"失败的操作");
               }
           }else {
               System.out.println("---------------step4-------");
              int r= userFilmService.updateWishFilm(userFilm);
              if (r>0){
                  System.out.println("---------------step5-------");
                  return JsonUtils.doMessage(200,"已想看");
              }else {
                  return JsonUtils.doMessage(800,"失败的操作");
              }
           }

       }else {
           System.out.println("---------------step2-------");
           userFilm.setWishStatus(0);
           int t=userFilmService.selectCountById(userFilm);
           if (t==0){
               int r= userFilmService.addWishFilm(userFilm);
//               System.out.println("你查到的status是;"+t+"大小："+t.length);
               if (r>0){
                   return JsonUtils.doMessage(200,"已取消");
               }else {
                   return JsonUtils.doMessage(800,"失败的操作");
               }
           }else {
               int r= userFilmService.updateWishFilm(userFilm);
               if (r>0){
                   return JsonUtils.doMessage(200,"已取消");
               }else {
                   return JsonUtils.doMessage(800,"失败的操作");
               }
           }

       }

    }

    //

    @RequestMapping(value = "/doLooked", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String doLooked(@RequestBody String json) throws JsonProcessingException, NoSuchAlgorithmException {
        System.out.println("----------------s----------");
//        创建mapper对象
        ObjectMapper mapper = new ObjectMapper();
        JsonNode node = mapper.readTree(json);
        JsonNode Node1 = node.path("user_id");
        JsonNode Node2 = node.path("film_id");

        String p1= mapper.writeValueAsString(Node1).replace("\"","");
        String p2= mapper.writeValueAsString(Node2).replace("\"","");

        Integer user_id=Integer.parseInt(p1);
        Integer film_id=Integer.parseInt(p2);

        Integer looked=1;
        UserFilm userFilm=new UserFilm();
        userFilm.setFilmId(film_id);
        userFilm.setUserId(user_id);
        userFilm.setLooked(looked);
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String date = df.format(new Date());
        userFilm.setLookedTime(date);

        System.out.println("user film"+userFilm);


            int t=userFilmService.selectCountById(userFilm);
              System.out.println("-----"+t);
            if (t==0){
                System.out.println("---------------step1-------");
                int r= userFilmService.addLookedFilm(userFilm);

                if (r>0){
                    System.out.println("---------------step3-------");
                    return JsonUtils.doMessage(200,"已看过去评分");
                }else {
                    return JsonUtils.doMessage(800,"失败的操作");
                }
            }else{
                System.out.println("---------------step4-------");
                int r= userFilmService.updateLookedFilm(userFilm);
                if (r>0){
                    System.out.println("---------------step5-------");
                    return JsonUtils.doMessage(200,"已看过去评分");
                }else {
                    return JsonUtils.doMessage(800,"失败的操作");
                }
            }



    }
    @RequestMapping(value = "/filmabout", method = RequestMethod.GET)
    public String getFilm(@RequestParam("film_id")Integer film_id,@RequestParam("user_id")Integer user_id) throws JsonProcessingException {
        System.out.println("-----film about---");
        ObjectMapper mapper=new ObjectMapper();
        String result=mapper.writeValueAsString(userFilmService.selectAboutUserFilm(film_id,user_id));
        return JsonUtils.doRequestDataList("success", 200, mapper.readTree(result));
    }



    @RequestMapping(value = "/film/{id}", method = RequestMethod.GET)
    public String getFilm(@PathVariable Integer id) throws JsonProcessingException {
        System.out.println("--------");
        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(filmService.getFilmById(id));
        System.out.println("-----------" + json);
        return JsonUtils.doRequestDataList("success", 200, mapper.readTree(json));
    }

    @RequestMapping(value = "/roles/{id}", method = RequestMethod.GET)
    public String getRoleByFilm(@PathVariable Integer id) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(roleService.selectRoleByFilm(id));
        return JsonUtils.doRequestDataList("success", 200, mapper.readTree(json));
    }

    @RequestMapping(value = "/film/addcomment", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String doComment(@RequestBody String json) throws JsonProcessingException, NoSuchAlgorithmException {
        System.out.println("--------");
        System.out.println(json);
        ObjectMapper mapper = new ObjectMapper();
        Comment comment = new Comment();

        comment.settId(Integer.parseInt(JsonUtils.getStringInJson(json, "t_id")));
        comment.setType(Integer.parseInt(JsonUtils.getStringInJson(json, "type")));
        comment.setScore(Integer.parseInt(JsonUtils.getStringInJson(json, "score")));
        comment.setFromUid(Integer.parseInt(JsonUtils.getStringInJson(json, "from_uid")));
        comment.setContent(JsonUtils.getStringInJson(json, "content"));
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String date = df.format(new Date());
        comment.setCommentDate(date);
        System.out.println("comment" + comment);
        List<Comment> list=commentService.selectMyCommentInfoForOneFilm(comment);
        if (list==null){
            int num = commentService.addComment(comment);

            if (num > 0) {
                return JsonUtils.delSuccess();
            } else return JsonUtils.delFailure();
        }else {
            if (list.size()>0){
                int c1=commentService.upMycomment(comment);
                if (c1>0){
                    return JsonUtils.delSuccess();
                }else {
                return JsonUtils.delFailure();
                }
            }else {
                int num = commentService.addComment(comment);

                if (num > 0) {
                    return JsonUtils.delSuccess();
                } else return JsonUtils.delFailure();
            }
        }


    }
    @RequestMapping(value = "/film/hascomment", method = RequestMethod.GET)

    public String selectHasMyFilmComment(@RequestParam("film_id")Integer film_id,@RequestParam("type")Integer type
            ,@RequestParam("user_id")Integer user_id) throws JsonProcessingException {
         Comment comment=new Comment();
         comment.setId(film_id);
         comment.setFromUid(user_id);
         comment.setType(type);
         int[] temp=commentService.selectHasMyFilmComment(comment);
         if (temp.length==0){
             return JsonUtils.doMessage(200,"has");
         }else {
             return JsonUtils.doMessage(200,"no");
         }
    }
    @RequestMapping(value = "/film/scomment", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String selectComment(@RequestBody String json) throws JsonProcessingException, NoSuchAlgorithmException {
        System.out.println("--------");
        System.out.println(json);
        ObjectMapper mapper = new ObjectMapper();
        int t_id = Integer.parseInt(JsonUtils.getStringInJson(json, "t_id"));
        int type = Integer.parseInt(JsonUtils.getStringInJson(json, "type"));
       int user_id=Integer.parseInt(JsonUtils.getStringInJson(json,"user_id"));
        String result = mapper.writeValueAsString(commentService.selectComent(t_id, type,user_id));
        return JsonUtils.doRequestDataList("success", 200, mapper.readTree(result));
    }

    @RequestMapping(value = "avatar.json", method = RequestMethod.POST)
    @ResponseBody
    public String upLoadUsersImg(HttpServletRequest request, @RequestParam("file") MultipartFile uploadFile) throws JsonProcessingException {
        System.out.println("-------upload____" + uploadFile);
        String sp = request.getServletPath();
        System.out.println("我请求的路径为" + sp);
        String user_id = request.getHeader("user_id");
        System.out.println("文件上传用户的id是：" + user_id);
        if (uploadFile.isEmpty()) {
            return "文件为空";
        } else {
            // 获取文件名
            String fileName = uploadFile.getOriginalFilename();
            System.out.println("上传的文件名为:" + fileName);
            // 获取文件的后缀名
            String suffixName = fileName.substring(fileName.lastIndexOf("."));
            System.out.println("上传的文件后缀名为:" + suffixName);
            System.out.println(uploadFile.getSize());
            System.out.println(uploadFile.getContentType());
//              判断格式和大小
            String fType = uploadFile.getContentType();
            System.out.println("上传的文件格式为:" + fType);
            long size = uploadFile.getSize();
            if (!fType.equals("image/jpeg") && !fType.equals("image/jpg") && !fType.equals("image/gif") && !fType.equals("image/png") && !fType.equals("image/svg")) {
                return JsonUtils.doMessage(800, "图片格式不正确");
            }
            if (size > 204800) {
                return JsonUtils.doMessage(800, "图片大小不能超过200k");
            }
            // 文件上传路径
            String filePath = "F:/TaopiaoServerProjects/taopiao/react-app/public/usersimg/";
            Random random = new Random();
            int num = random.nextInt(999999);
//              重新命名
            SimpleDateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");

            fileName = user_id + "-" + "u_avartar" + suffixName;
            File dest = new File(filePath + fileName);
            // 检测是否存在目录
            if (!dest.getParentFile().exists()) {
                dest.getParentFile().mkdirs();
            }
            try {
                uploadFile.transferTo(dest);
                Integer u_id = Integer.parseInt(user_id);
                int num1 = userService.updateAvartar("usersimg/" + fileName, u_id);
                if (num1 > 0) {
                    return JsonUtils.doMessage(200, "上传成功");
                } else {
                    return JsonUtils.doMessage(800, "上传失败");

                }

            } catch (IllegalStateException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
            return JsonUtils.doMessage(800, "上传失败");
        }

    }
    @RequestMapping(value = "qrcode.do", method = RequestMethod.POST)
    @ResponseBody
    public String upLoadQR(HttpServletRequest request, @RequestParam("file") MultipartFile uploadFile) throws JsonProcessingException {
        System.out.println("-------upload____" + uploadFile);
        String sp = request.getServletPath();
        System.out.println("我请求的路径为" + sp);
        String user_id = request.getHeader("user_id");
        System.out.println("文件上传用户的id是：" + user_id);
        if (uploadFile.isEmpty()) {
            return "文件为空";
        } else {
            // 获取文件名
            String fileName = uploadFile.getOriginalFilename();
            System.out.println("上传的文件名为:" + fileName);
            // 获取文件的后缀名
            String suffixName = fileName.substring(fileName.lastIndexOf("."));
            System.out.println("上传的文件后缀名为:" + suffixName);
            System.out.println(uploadFile.getSize());
            System.out.println(uploadFile.getContentType());
//              判断格式和大小
            String fType = uploadFile.getContentType();
            System.out.println("上传的文件格式为:" + fType);
            long size = uploadFile.getSize();
            if (!fType.equals("image/jpeg") && !fType.equals("image/jpg") && !fType.equals("image/gif") && !fType.equals("image/png") && !fType.equals("image/svg")) {
                return JsonUtils.doMessage(800, "图片格式不正确");
            }
            if (size > 204800) {
                return JsonUtils.doMessage(800, "图片大小不能超过200k");
            }
            // 文件上传路径
            String filePath = "F:/TaopiaoServerProjects/taopiao/react-app/public/qr/";
            Random random = new Random();
            int num = random.nextInt(999999);
//              重新命名
            SimpleDateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");
            String date = df.format(new Date());
            fileName = user_id + "-" + "uqr"+date + suffixName;
            File dest = new File(filePath + fileName);
            // 检测是否存在目录
            if (!dest.getParentFile().exists()) {
                dest.getParentFile().mkdirs();
            }
            try {
                uploadFile.transferTo(dest);
                  return JsonUtils.doMessage(200,"qr/"+fileName);

            } catch (IllegalStateException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
            return JsonUtils.doMessage(800, "上传失败");
        }

    }


    @RequestMapping(value = "/film/addReply", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String doReply(@RequestBody String json) throws JsonProcessingException, NoSuchAlgorithmException {
        Reply reply = new Reply();
        reply.setCommentId(Integer.parseInt(JsonUtils.getStringInJson(json, "comment_id")));
        reply.setReplyType(Integer.parseInt(JsonUtils.getStringInJson(json, "reply_type")));

        reply.setFromUid(Integer.parseInt(JsonUtils.getStringInJson(json, "from_uid")));


        if (JsonUtils.getStringInJson(json, "to_uid") != null && !JsonUtils.getStringInJson(json, "to_uid").equals("null")) {
            reply.setToUid(Integer.parseInt(JsonUtils.getStringInJson(json, "to_uid")));
        }


        reply.setContent(JsonUtils.getStringInJson(json, "content"));
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String date = df.format(new Date());
        reply.setReplyDate(date);
        System.out.println("reply+++++++++++++++" + reply);
        int num = replyService.addReply(reply);
        if (num > 0) {
            return JsonUtils.doMessage(200, "回复成功");
        } else return JsonUtils.delFailure();
    }

    @RequestMapping(value = "/film/reply", method = RequestMethod.GET)
    public String getReply(@RequestParam("id") Integer id ,@RequestParam("user_id")Integer user_id)throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        System.out.println("reply+++++++++++++++" + id);
        String result = mapper.writeValueAsString(replyService.selectReply(id,user_id));
        System.out.println("reply+++++++++++++++" + result);
        return JsonUtils.doRequestDataList("success", 200, mapper.readTree(result));
    }

    //    @RequestMapping(value = "/film/commentzan/{id}",method = RequestMethod.GET)
//    public String getCommentZan(@PathVariable Integer id) throws JsonProcessingException {
//
//    }
    @RequestMapping(value = "/film/comment/zan.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String doZan(@RequestBody String json) throws JsonProcessingException, NoSuchAlgorithmException {
        ObjectMapper mapper = new ObjectMapper();
        Zan zan = new Zan();
        zan.setType(Integer.parseInt(JsonUtils.getStringInJson(json, "type")));
        zan.setTypeId(Integer.parseInt(JsonUtils.getStringInJson(json, "type_id")));
        zan.setuId(Integer.parseInt(JsonUtils.getStringInJson(json, "u_id")));
            zan.setoId(Integer.parseInt(JsonUtils.getStringInJson(json, "o_id")));
       zan.setStatus(Integer.parseInt(JsonUtils.getStringInJson(json,"status")));

      System.out.println("++++++++++++++id++++"+zan);
        List<Zan> q = zanService.selectMyZan(zan);
        if (q != null) {
         {
             System.out.println("zan++++++++++++++"+zan.toString());
             if (q.size()==0){
                 int z=  zanService.insertZan(zan);
                 if (z>0){
                     System.out.println("-----------7--------");
                     return JsonUtils.doMessage(200, "点赞成功");
                 }else return JsonUtils.doMessage(800, "操作失败");
             }else {
                 Zan r = q.get(0);
                 if (zan.getStatus() == 0) {
                     System.out.println("----------3---------");

                     int n = zanService.updateZan(zan.getoId(),zan.getTypeId(),zan.getType(),zan.getStatus(),zan.getuId());
                     if (n > 0) {
                         return JsonUtils.doMessage(200, "已取消点赞");
                     }
                     else return JsonUtils.doMessage(800, "操作失败");
                 } else {
                     System.out.println("---------4----------");


                     int n = zanService.updateZan(zan.getoId(),zan.getTypeId(),zan.getType(),zan.getStatus(),zan.getuId());
                     if (n > 0) {
                         System.out.println("----------5---------"+zan.getStatus());
                         return JsonUtils.doMessage(200, "点赞成功");
                     }else return JsonUtils.doMessage(800, "操作失败");
                 }
             }


         }
        }else {
            System.out.println("-----------6--------");
          int z=  zanService.insertZan(zan);
                    if (z>0){
                        System.out.println("-----------7--------");
                        return JsonUtils.doMessage(200, "点赞成功");
                    }else return JsonUtils.doMessage(800, "操作失败");
        }

    }
    @RequestMapping(value = "/film/comment/one.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String selectZanReply(@RequestBody String json) throws JsonProcessingException, NoSuchAlgorithmException {
        int o_id=Integer.parseInt(JsonUtils.getStringInJson(json,"o_id"));
        int u_id=Integer.parseInt(JsonUtils.getStringInJson(json,"u_id"));
        int type=Integer.parseInt(JsonUtils.getStringInJson(json,"type"));
        ObjectMapper mapper=new ObjectMapper();
        String result=mapper.writeValueAsString(commentService.selectZandReply(o_id,type,u_id));
        return JsonUtils.doRequestDataList("success", 200, mapper.readTree(result));
    }
    @RequestMapping(value = "/film/comment/mycomment.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String selectMyCommentInfoForOneFilm(@RequestBody String json) throws JsonProcessingException {
         int film_id=Integer.parseInt(JsonUtils.getStringInJson(json,"film_id"));
        int user_id=Integer.parseInt(JsonUtils.getStringInJson(json,"user_id"));
        int type=Integer.parseInt(JsonUtils.getStringInJson(json,"type"));
        Comment comment=new Comment();
        comment.setType(type);
        comment.setFromUid(user_id);
        comment.settId(film_id);
        ObjectMapper mapper=new ObjectMapper();
        String result=mapper.writeValueAsString(commentService.selectMyCommentInfoForOneFilm(comment));
        return JsonUtils.doRequestDataList("success", 200, mapper.readTree(result));
    }
    @RequestMapping(value = "/film/comment/deleteMycomment.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String deleteMycomment(@RequestBody String json) throws JsonProcessingException {
        int film_id=Integer.parseInt(JsonUtils.getStringInJson(json,"film_id"));
        int user_id=Integer.parseInt(JsonUtils.getStringInJson(json,"user_id"));
        int type=Integer.parseInt(JsonUtils.getStringInJson(json,"type"));

        Comment comment=new Comment();
        comment.setType(type);
        comment.setFromUid(user_id);
        comment.settId(film_id);
        ObjectMapper mapper=new ObjectMapper();
        int num= commentService.deleteMycomment(comment);
        if (num>0){
            return JsonUtils.doMessage(200,"评论删除成功");
        }else {
            return JsonUtils.doMessage(200,"评论删除失败");
        }

    }
    @RequestMapping(value = "/cinemas/cinemasandserve", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String selectCinemaBycity(@RequestBody String json) throws JsonProcessingException {
       String city=JsonUtils.getStringInJson(json,"city");
           ObjectMapper mapper=new ObjectMapper();
          System.out.println("city"+city);
           String result=mapper.writeValueAsString(cinemaService.selectCinemasAndServe(city));
           return JsonUtils.doRequestDataList("success", 200, mapper.readTree(result));

    }
    @RequestMapping(value = "/cinemas//dellmoreoption.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String dellMoreOption(HttpServletRequest request) throws JsonProcessingException {
        String sp = request.getServletPath();
        System.out.println("我请求的路径为" + sp);
        String user_id = request.getHeader("user_id");

        System.out.println("用户的id是：" + user_id);
        if (request.getHeader("user_id")==null||request.getHeader("token")==null){
            return JsonUtils.doMessage(800,"请登录体验更加的服务");
        }else {
            return JsonUtils.doMessage(800,"请求失败");
        }
    }
    @RequestMapping(value = "/mySnacks/{id}",method = RequestMethod.GET)
    public String mySnacks(@PathVariable Integer id) throws JsonProcessingException {
        System.out.println("_________________________");
        ObjectMapper mapper=new ObjectMapper();
        String result=mapper.writeValueAsString(snacksService.mySnacks(id));
        return JsonUtils.doRequestDataList("success", 200, mapper.readTree(result));
    }
    @RequestMapping(value = "/cinemadetail/{id}",method = RequestMethod.GET)
    public String selectCinemaDetail(@PathVariable Integer id) throws JsonProcessingException {
        System.out.println("_________________________");
        ObjectMapper mapper=new ObjectMapper();
        String result=mapper.writeValueAsString(cinemaService.selectCinemasAndServeById(id));
        return JsonUtils.doRequestDataList("success", 200, mapper.readTree(result));
    }
    @RequestMapping(value = "/myServe/{id}",method = RequestMethod.GET)
    public String myServe(@PathVariable Integer id) throws JsonProcessingException {
        ObjectMapper mapper=new ObjectMapper();
        String result=mapper.writeValueAsString(serveService.myServe(id));
        return JsonUtils.doRequestDataList("success", 200, mapper.readTree(result));
    }

    @RequestMapping(value = "/cinemasbyschedule.do",method = RequestMethod.POST,produces ="application/json;charset=UTF-8")
    @ResponseBody
    public String haveFilmScheduleCinema(@RequestBody String receiveJson) throws JsonProcessingException {
        Integer film_id=Integer.parseInt(JsonUtils.getStringInJson(receiveJson,"film_id"));

        String city=JsonUtils.getStringInJson(receiveJson,"city");

        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String date = df.format(new Date());
        ObjectMapper mapper=new ObjectMapper();
        String result=mapper.writeValueAsString(cinemaService.havefilmScheduleCinemas(film_id,city,date));
        return JsonUtils.doRequestDataList("success", 200, mapper.readTree(result));
    }
    @RequestMapping(value = "buy/film/{id}", method = RequestMethod.GET)
    public String getAfilm(@PathVariable Integer id) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(filmService.getBuyAboutFilm(id));
        return JsonUtils.doRequestDataList("success", 200, mapper.readTree(json));
    }
    @RequestMapping(value = "/afilmschedule.do", method = RequestMethod.GET)
    public String selectAcinemaAfilmSchedule(@RequestParam("cinema_id") Integer cinema_id ,@RequestParam("film_id")Integer film_id)throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();

        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String date = df.format(new Date());
        String result = mapper.writeValueAsString(scheduleService.selectAcinemaAfilmSchedule(cinema_id,film_id,date));
        System.out.println("reply+++++++++++++++" + result);
        return JsonUtils.doRequestDataList("success", 200, mapper.readTree(result));
    }
    @RequestMapping(value = "/hallseatinfo.do",method = RequestMethod.POST,produces ="application/json;charset=UTF-8")
    @ResponseBody
    public String selectHallSeatsInfo(@RequestBody String receiveJson) throws JsonProcessingException {
        Integer cinema_id=Integer.parseInt(JsonUtils.getStringInJson(receiveJson,"cinema_id"));
        Integer hall_id=Integer.parseInt(JsonUtils.getStringInJson(receiveJson,"hall_id"));
        Integer schedule_id=Integer.parseInt(JsonUtils.getStringInJson(receiveJson,"schedule_id"));
        ObjectMapper mapper=new ObjectMapper();
        String result=mapper.writeValueAsString(seatService.selectHallSeatsInfo(cinema_id,hall_id,schedule_id));
        return JsonUtils.doRequestDataList("success", 200, mapper.readTree(result));
    }
    @RequestMapping(value = "buy/schedule/{id}", method = RequestMethod.GET)
    public String getScheduleById(@PathVariable Integer id) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(scheduleService.selectScheduleById(id));
        return JsonUtils.doRequestDataList("success", 200, mapper.readTree(json));
    }
    @RequestMapping(value = "/gethall.do", method = RequestMethod.GET)
    public String getHall(@RequestParam("cinema_id") Integer cinema_id ,@RequestParam("hall_id")Integer hall_id)throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        System.out.println("reply+++++++++++++++" );
        String result = mapper.writeValueAsString(hallService.selectHall(cinema_id,hall_id));
        System.out.println("reply+++++++++++++++" + result);
        return JsonUtils.doRequestDataList("success", 200, mapper.readTree(result));
    }
    @RequestMapping(value = "/film/addOrder.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String addOder(@RequestBody String json) throws JsonProcessingException {

        Order order=new Order();
        order.setOrderId(JsonUtils.getStringInJson(json,"order_id"));
        order.setUserId(Integer.parseInt(JsonUtils.getStringInJson(json,"user_id")));
        order.setScheduleId(Integer.parseInt(JsonUtils.getStringInJson(json,"schedule_id")));
        order.setOrderPhone(JsonUtils.getStringInJson(json,"order_phone"));

        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String date = df.format(new Date());
        order.setOrderDate(date);
        order.setTicketNum(Integer.parseInt(JsonUtils.getStringInJson(json,"ticket_num")));
        order.setTicketTotalPrice(Double.parseDouble(JsonUtils.getStringInJson(json,"ticket_total_price")));
        ObjectMapper mapper=new ObjectMapper();
        ArrayList<Integer> ids=mapper.readValue(JsonUtils.getStringInJson(json,"ids"), ArrayList.class);
        int c=0;
         for (int i=0;i<ids.size();i++){
             System.out.println("ids"+"---"+ids.get(i));
             Integer count=seatService.selectSeattsBySeats(ids.get(i),order.getScheduleId());
             if (count>0){
                  return JsonUtils.doMessage(800,"有重复记录订单提交失败");
//                 break;
             }
         }
        order.setStatus(0);
        int num=orderService.addOrder(order);
        if (num>0){

            return JsonUtils.doMessage(200,"订单提交成功");
        }else {
            return JsonUtils.doMessage(800,"订单提交失败");
        }



    }
    @RequestMapping(value = "/film/addItem.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String addItem(@RequestBody String json) throws JsonProcessingException {

        Item item=new Item();
        item.setOrderId(JsonUtils.getStringInJson(json,"order_id"));
        item.setSeatId(Integer.parseInt(JsonUtils.getStringInJson(json,"seat_id")));
       item.setPrice(Double.parseDouble(JsonUtils.getStringInJson(json,"price")));
       int num=itemService.addItem(item);
       if (num>0){
           return JsonUtils.doMessage(800,"成功获得位置");
       }else {
           return JsonUtils.doMessage(800,"请求失败");
       }
    }

    @RequestMapping(value = "buy/getsnack/{id}", method = RequestMethod.GET)
    public String getSnack(@PathVariable Integer id) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(snacksService.getSnack(id));
        return JsonUtils.doRequestDataList("success", 200, mapper.readTree(json));
    }
    @RequestMapping(value = "/oder/snack.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public String addSnackOrder(@RequestBody String json) throws JsonProcessingException {

       SnackOrder snackOrder=new SnackOrder();

        snackOrder.setSnackId(Integer.parseInt(JsonUtils.getStringInJson(json,"snack_id")));
        snackOrder.setUserId(Integer.parseInt(JsonUtils.getStringInJson(json,"user_id")));
        snackOrder.setTotalPrice(Double.parseDouble(JsonUtils.getStringInJson(json,"total_price")));
        snackOrder.setOrderPhone(JsonUtils.getStringInJson(json,"order_phone"));
        snackOrder.setGoodsNum(Integer.parseInt(JsonUtils.getStringInJson(json,"goods_num")));
        snackOrder.setPayType(JsonUtils.getStringInJson(json,"pay_type"));
        snackOrder.setPhoneCode(JsonUtils.getStringInJson(json,"phone_code"));
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String date = df.format(new Date());
        snackOrder.setOrderDate(date);
        int num=orderSnackService.addOrderSnack(snackOrder);
        if (num>0){
            return JsonUtils.doMessage(800,"订单添加成功");
        }else {
            return JsonUtils.doMessage(800,"订单添加失败");
        }
    }
    @RequestMapping(value = "/cinema/query", method = RequestMethod.GET)
    public String searchCinemaBycityCounty(@RequestParam("county")String county,@RequestParam("city")String city) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(cinemaService.searchCinemaBycityCounty(county,city));
        return JsonUtils.doRequestDataList("success", 200, mapper.readTree(json));
    }
    @RequestMapping(value = "/orderSnack/query", method = RequestMethod.GET)
    public String searchOrderSnack(@RequestParam("user_id")Integer user_id) throws JsonProcessingException {
        System.out.println("-------------------------------");
        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(orderSnackService.selectOrderSnack(user_id));
        return JsonUtils.doRequestDataList("success", 200, mapper.readTree(json));
    }
    @RequestMapping(value = "/orderFilm/query", method = RequestMethod.GET)
    public String queryUserOrderFilm(@RequestParam("user_id")Integer user_id) throws JsonProcessingException {
        System.out.println("-------------------------------");
        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(orderService.queryUserOrderFilm(user_id));
        return JsonUtils.doRequestDataList("success", 200, mapper.readTree(json));
    }
    @RequestMapping(value = "/upFilmOder.do",method = RequestMethod.POST,produces ="application/json;charset=UTF-8")
    @ResponseBody
    public String upFilmOder(@RequestBody String receiveJson) throws JsonProcessingException {
        String order_id=JsonUtils.getStringInJson(receiveJson,"order_id");

        String phone_code=JsonUtils.getStringInJson(receiveJson,"phone_code");
        String pay_type=JsonUtils.getStringInJson(receiveJson,"pay_type");

        Order order=new Order();
        order.setStatus(1);
        order.setPayType(pay_type);
        order.setPhoneCode(phone_code);
      order.setOrderId(order_id);

        ObjectMapper mapper=new ObjectMapper();
        int num=orderService.updateOrderFilm(order);
        if (num>0){
            return JsonUtils.doMessage(800,"支付成功");
        }else {
            return JsonUtils.doMessage(800,"支付失败");
        }

    }
    @RequestMapping(value = "/myWishedFilms/{user_id}", method = RequestMethod.GET)
    public String myLooked(@PathVariable Integer user_id) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(userFilmService.myWishFilm(user_id));
        return JsonUtils.doRequestDataList("success", 200, mapper.readTree(json));
    }
    @RequestMapping(value = "/myLookedFilms/{user_id}", method = RequestMethod.GET)
    public String myWished(@PathVariable Integer user_id) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        String json = mapper.writeValueAsString(userFilmService.myLookedFilm(user_id));
        return JsonUtils.doRequestDataList("success", 200, mapper.readTree(json));

    }


    }
