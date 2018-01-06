package com.lzliu.llzrecommend.repository;

import com.lzliu.llzrecommend.bean.Library;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface libraryRepository extends JpaRepository<Library,Integer> {
    /*根据日期查询post*/
    public List<Library> findByDate(String date);
}
