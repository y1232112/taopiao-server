package com.example.tp.utils;

import org.springframework.context.annotation.Bean;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class DataUtils {

    public static String insertDbDel(String string){
        System.out.println("-----string---from--input----"+string);
        if (string.equals(' ')||string==null||string.isEmpty()){
            return null;
        }else return string;
    }
   public static String insertDelDateTime(String string){
       System.out.println("-----string---from--input----"+string);
       if (string.equals(' ')||string==null||string.isEmpty()){
           return "null";
       }else return string;
   }
    public static LocalDateTime parseStringToDateTime(String time, String format) {
      DateTimeFormatter df = DateTimeFormatter.ofPattern(format);
      return LocalDateTime.parse(time, df);
    }
}
