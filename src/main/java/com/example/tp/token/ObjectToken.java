package com.example.tp.token;


import com.example.tp.utils.MD5Utils;
import org.springframework.util.Base64Utils;

import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.text.SimpleDateFormat;
import java.util.Random;

/**
 * 构建者模式获得，token
 */
public class ObjectToken {
    private Integer userId;

    public  String token;
    //注意无参构造器私有，避免外界使用构造器创建de对象
    private ObjectToken() {

    }

    @Override
    public String toString() {
        return "ObjectToken{" +
                "userId=" + userId +
                ", token='" + token + '\'' +
                '}';
    }

    public static class Builder{
        private Integer userId;

       private String token;
       public Builder() {
       }

       public Builder setUserId(Integer userId) {
           this.userId = userId;
           return this;
       }


       public ObjectToken build() throws  NoSuchAlgorithmException {
           ObjectToken objectToken=new ObjectToken();
           objectToken.userId=userId;
//           获取当前系统的时间戳
           long timeScamp=System.currentTimeMillis();

//           token实现
//           生成token---------用户ID+时间戳+随机数----md5加密--编码utf-8
           objectToken.token= MD5Utils.MD5Build(userId.toString()+timeScamp+new Random().nextInt(9999),"UTF-8");
           return objectToken;
       }
   }
}
