package com.example.tp.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class JsonUtils {
    private static final double version=0.1;/*返回版本*/
    private static final int code=200;               /* 成功码*/
    private static final int errorcode=800;      /*错误码*/


    /**
     *  创建一般失败返回的json
     * @return
     * @throws JsonProcessingException
     */

    public static String delFailure() throws JsonProcessingException {
        ObjectMapper mapper=new ObjectMapper();
//        创建根节点
        ObjectNode   nodes=mapper.createObjectNode();
//        向根节点添加数据
        nodes.put("version",version);
        nodes.put("code",errorcode);
        nodes.put("message","操作失败");
//        创建新的子节点：------params
        ObjectNode paramsNodes=mapper.createObjectNode();
        paramsNodes.put("detailmsg","操作失败");
//        把子节点挂载到根节点上
        nodes.set("params",paramsNodes);
        return mapper.writeValueAsString(nodes);
    }

    /**
     * 创建一般成功返回的json
     * @return
     * @throws JsonProcessingException
     */
    public static String delSuccess() throws JsonProcessingException {
        ObjectMapper mapper=new ObjectMapper();
//        创建根节点
        ObjectNode   nodes=mapper.createObjectNode();
//        向根节点添加数据
        nodes.put("version",version);
        nodes.put("code",code);
        nodes.put("message","操作成功");
//        创建新的子节点：------params
        ObjectNode paramsNodes=mapper.createObjectNode();
        paramsNodes.put("detailmsg","操作成功");
//        把子节点挂载到根节点上
        nodes.set("params",paramsNodes);
        return mapper.writeValueAsString(nodes);
    }

    /**
     * 创建登录成功后返回的json,将token返回给客户端
     * @param token
     * @return
     * @throws JsonProcessingException
     */
    public static String LoginSuccess(String token) throws JsonProcessingException {
        ObjectMapper mapper=new ObjectMapper();
//        创建根节点
        ObjectNode   nodes=mapper.createObjectNode();
//        向根节点添加数据
        nodes.put("version",version);
        nodes.put("code",code);
//        在根节点加入token
        nodes.put("token",token);
        nodes.put("message","登录成功");
//        创建新的子节点：------params
        ObjectNode paramsNodes=mapper.createObjectNode();
        paramsNodes.put("detailmsg","操作成功");
//        把子节点挂载到根节点上
        nodes.set("params",paramsNodes);
        return mapper.writeValueAsString(nodes);
    }

    /**
     * 处理用户向服务端请求数据,需要时将主体信息以ObjectNode 形式挂载在，json外套的子节点上
     * @param paramsNodes
     * @return
     * @throws JsonProcessingException
     */
    public  String doRequestData(ObjectNode paramsNodes) throws JsonProcessingException {
        ObjectMapper mapper=new ObjectMapper();
//        创建根节点
        ObjectNode   nodes=mapper.createObjectNode();
//        向根节点添加数据
        nodes.put("version",version);
        nodes.put("code",code);
        nodes.put("message","操作成功");
        nodes.set("params",paramsNodes);
        return mapper.writeValueAsString(nodes);
    }

    /**
     * 返回其他返回码和描述信息
     * @param other
     * @param description
     * @return
     * @throws JsonProcessingException
     */
    public static String doOtherCode(int other,String message,String description) throws JsonProcessingException {
        ObjectMapper mapper=new ObjectMapper();
//        创建根节点
        ObjectNode   nodes=mapper.createObjectNode();
//        向根节点添加数据
        nodes.put("version",version);
        nodes.put("code",other);
        nodes.put("message","");
//        创建新的子节点：------params
        ObjectNode paramsNodes=mapper.createObjectNode();
        paramsNodes.put("detailmsg",description);
//        把子节点挂载到根节点上
        nodes.set("params",paramsNodes);

        return mapper.writeValueAsString(nodes);
    }

    /**
     * 读取params节点的某节点值
     * @param json
     * @param name
     * @return
     * @throws JsonProcessingException
     */
    public static String getFormJson(String json,String name) throws JsonProcessingException {
        ObjectMapper mapper=new ObjectMapper();
//        读取根节点
        JsonNode node=mapper.readTree(json);
//        读取params节点
        JsonNode paramsNodes=node.path("params");
       JsonNode nameNode=paramsNodes.path(name);
       return mapper.writeValueAsString(nameNode).replace("\"","");

    }
    public static String tokenInJson(String token) throws JsonProcessingException {
        ObjectMapper mapper=new ObjectMapper();
//        创建根节点
        ObjectNode   nodes=mapper.createObjectNode();
//        向根节点添加数据
        nodes.put("version",version);
        nodes.put("code",200);
        nodes.put("token",token);
        nodes.put("message","登录成功");
        return mapper.writeValueAsString(nodes);
    }
}
