package com.example.tp.utils;

import java.util.Random;

public class SaltUtil {
    private static String source_string="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
//    生成8位数的随机盐
//    获取每个数字在源字符串中的下标
    public static String getSalt(){
        String string="";
        Random random=new Random();
        for (int i=0;i<8;i++){
            int k=random.nextInt(62);
            string=string+source_string.charAt(k);
        }
          return string;
    }
}
