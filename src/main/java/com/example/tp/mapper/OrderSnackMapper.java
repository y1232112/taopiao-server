package com.example.tp.mapper;

import com.example.tp.entity.SnackOrder;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderSnackMapper {
    int addOrderSnack(SnackOrder snackOrder);
    List<Object> selectOrderSnack(Integer id);
}
