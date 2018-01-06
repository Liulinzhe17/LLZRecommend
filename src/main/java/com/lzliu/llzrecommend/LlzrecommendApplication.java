package com.lzliu.llzrecommend;

import com.lzliu.llzrecommend.bean.CorsFilter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@SpringBootApplication
public class LlzrecommendApplication {

	public static void main(String[] args) {
		SpringApplication.run(LlzrecommendApplication.class, args);
	}
}