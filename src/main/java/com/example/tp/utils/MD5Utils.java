package com.example.tp.utils;

import java.nio.charset.Charset;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class MD5Utils {
    public static String MD5Build(String origin,String charset) throws NoSuchAlgorithmException {

        if(origin==null)
            return "";
        StringBuffer buffer=new StringBuffer();
        MessageDigest md=null;
        md=MessageDigest.getInstance("MD5");
        //生成一组length=16的byte数组
        byte[] bytes=md.digest(origin.getBytes(Charset.forName(charset)));
        for (int i = 0; i < bytes.length; i++) {
            int c = bytes[i] & 0xFF ; //byte转int为了不丢失符号位， 所以&0xFF
            if(c < 16){ //如果c小于16，就说明，可以只用1位16进制来表示， 那么在前面补一个0
                buffer.append("0");
            }
            buffer.append(Integer.toHexString(c)) ;
        }
     return buffer.toString();
    }
}
