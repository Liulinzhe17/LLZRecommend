package com.lzliu.llzrecommend.controller;

import com.lzliu.llzrecommend.bean.Library;
import com.lzliu.llzrecommend.bean.Result;
import com.lzliu.llzrecommend.repository.libraryRepository;
import com.lzliu.llzrecommend.util.ResultUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value="/librarys")
public class LibraryController {

    @Autowired
    libraryRepository libRepo;

    /*根据日期查询post*/
    @RequestMapping(value = "/{date}",method = RequestMethod.GET)
    @ResponseBody
    public Result<Library> list(@PathVariable String date) {
        System.out.println("******根据日期("+date+")查询post******");
        List<Library> list = libRepo.findByDate(date);
        System.out.println("总共查询到：" + list.size() + "条数据");
        return ResultUtil.success(list);
    }

    /*修改赞数*/
    @RequestMapping(value = "/{id}/thumb",method = RequestMethod.POST)
    @ResponseBody
    public Result thumb(@PathVariable int id ,@RequestParam Integer count) {
        System.out.println("******收到("+id+")put******");
        Library lib = libRepo.findOne(id);
        lib.setThumbCount(count);
        libRepo.saveAndFlush(lib);
        return ResultUtil.success();
    }




}
