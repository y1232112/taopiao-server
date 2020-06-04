package com.example.tp.mapper;

import com.example.tp.entity.Item;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemMapper {
    int addItem(Item item);
}
