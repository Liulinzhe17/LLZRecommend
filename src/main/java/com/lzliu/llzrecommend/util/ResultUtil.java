package com.lzliu.llzrecommend.util;

import com.lzliu.llzrecommend.bean.Result;

public class ResultUtil {

    /*请求成功带参*/
    public static Result success(Object object){
        Result result=new Result();
        result.setCode(200);
        result.setMsg("请求成功");
        result.setData(object);
        return result;
    }

    /*请求成功不带参*/
    public static Result success(){
        return success(null);
    }

    /*请求失败*/
    public static Result error(int code,String msg){
        Result result=new Result();
        result.setMsg(msg);
        result.setCode(code);
        return result;
    }


}
