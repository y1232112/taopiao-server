package com.example.tp.token;


import com.example.tp.utils.MD5Utils;
import org.springframework.util.Base64Utils;

import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.util.Random;

/**
 * 构建者模式获得，token
 */
public class ObjectToken {
    private String  nikeName;
    private String  passWord;
    public  String token;
    //注意无参构造器私有，避免外界使用构造器创建de对象
    private ObjectToken() {

    }

    @Override
    public String toString() {
        return "ObjectToken{" +
                "nikeName='" + nikeName + '\'' +
                ", passWord='" + passWord + '\'' +
                ", token='" + token + '\'' +
                '}';
    }

    public static class Builder{
       private String  nikeName;
       private String  passWord;
       private String token;
       public Builder() {
       }

       public Builder setNikeName(String nikeName) {
           this.nikeName = nikeName;
           return this;
       }

       public Builder setPassWord(String passWord) {
           this.passWord = passWord;
           return this;
       }
       public ObjectToken build() throws  NoSuchAlgorithmException {
           ObjectToken objectToken=new ObjectToken();
           objectToken.nikeName=nikeName;
           objectToken.passWord=passWord;
//           token实现
           objectToken.token= MD5Utils.MD5Build(nikeName+passWord+new Random().nextInt(9999),"UTF-8");
           return objectToken;
       }
   }
}
