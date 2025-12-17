package com.cloudbalance.utils;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import java.util.concurrent.TimeUnit;

@Component
@RequiredArgsConstructor
public class RedisUtil {
    private final StringRedisTemplate stringRedisTemplate;
    public String get(String key){
        return stringRedisTemplate.opsForValue().get(key);
    }
    public void set(String key,String value){
        stringRedisTemplate.opsForValue().set(key,value,1, TimeUnit.DAYS);
    }
}
