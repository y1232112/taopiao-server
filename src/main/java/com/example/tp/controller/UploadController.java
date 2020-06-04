package com.example.tp.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

@RestController
public class UploadController {
    @RequestMapping(value = "upload/img.json",method = RequestMethod.POST)
    @ResponseBody
    public String upLoadImg(HttpServletRequest request, @RequestParam("uploadFile") MultipartFile uploadFile){
        System.out.println("-------upload____"+uploadFile);
        if (uploadFile.isEmpty()){
            return "文件为空";
        }else {
            // 获取文件名
            String fileName = uploadFile.getOriginalFilename();
            System.out.println("上传的文件名为:" + fileName);
            // 获取文件的后缀名
            String suffixName = fileName.substring(fileName.lastIndexOf("."));
            System.out.println("上传的文件后缀名为:" + suffixName);
            System.out.println(uploadFile.getSize());
            System.out.println(uploadFile.getContentType());
//              判断格式和大小
            String fType=uploadFile.getContentType();
            long size=uploadFile.getSize();
            if (!fType.equals("image/jpeg")&&!fType.equals("image/jpg")&&!fType.equals("image/gif")&&!fType.equals("image/png")&&!fType.equals("image/svg")){
                return "图片格式不正确";
            }
            if (size>102400){
                return "图片大小不能超过100k";
            }
            // 文件上传路径
            String filePath="F:/TaopiaoServerProjects/taopiao/react-app/public/img/";
            Random random=new Random();
            int num=random.nextInt(999999);
//              重新命名
            SimpleDateFormat df=new SimpleDateFormat("yyyyMMddHHmmss");

            fileName=df.format(new Date())+"-"+num+suffixName;
            File dest = new File(filePath + fileName);
            // 检测是否存在目录
            if (!dest.getParentFile().exists()) {
                dest.getParentFile().mkdirs();
            }
            try {
                uploadFile.transferTo(dest);
                return "img/"+fileName;
            } catch (IllegalStateException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
            return "上传失败";
        }

    }

    @RequestMapping(value = "upload/snackimg.json",method = RequestMethod.POST)
    @ResponseBody
    public String upLoadSnackImg(HttpServletRequest request, @RequestParam("uploadFile") MultipartFile uploadFile){
        System.out.println("-------upload____"+uploadFile);
        if (uploadFile.isEmpty()){
            return "文件为空";
        }else {
            // 获取文件名
            String fileName = uploadFile.getOriginalFilename();
            System.out.println("上传的文件名为:" + fileName);
            // 获取文件的后缀名
            String suffixName = fileName.substring(fileName.lastIndexOf("."));
            System.out.println("上传的文件后缀名为:" + suffixName);
            System.out.println(uploadFile.getSize());
            System.out.println(uploadFile.getContentType());
//              判断格式和大小
            String fType=uploadFile.getContentType();
            long size=uploadFile.getSize();
            if (!fType.equals("image/jpeg")&&!fType.equals("image/jpg")&&!fType.equals("image/gif")&&!fType.equals("image/png")&&!fType.equals("image/svg")){
                return "图片格式不正确";
            }
            if (size>102400){
                return "图片大小不能超过100k";
            }
            // 文件上传路径
            String filePath="F:/TaopiaoServerProjects/taopiao/react-app/public/snackimg/";
            Random random=new Random();
            int num=random.nextInt(999999);
//              重新命名
            SimpleDateFormat df=new SimpleDateFormat("yyyyMMddHHmmss");

            fileName=df.format(new Date())+"-"+num+suffixName;
            File dest = new File(filePath + fileName);
            // 检测是否存在目录
            if (!dest.getParentFile().exists()) {
                dest.getParentFile().mkdirs();
            }
            try {
                uploadFile.transferTo(dest);
                return "snackimg/"+fileName;
            } catch (IllegalStateException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
            return "上传失败";
        }

    }


}
