package com.example.tp.service;

import com.example.tp.entity.Item;
import com.example.tp.mapper.ItemMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ItemService {
    @Autowired
    ItemMapper itemMapper;
    public int addItem(Item item){
        return itemMapper.addItem(item);
    };
}
