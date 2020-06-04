package com.example.tp.entity;

public class Zan {
    private Integer id;
    private Integer typeId;
    private Integer type;
    private Integer uId;
    private Integer status;

    public Integer getoId() {
        return oId;
    }

    public void setoId(Integer oId) {
        this.oId = oId;
    }

    private Integer oId;
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getTypeId() {
        return typeId;
    }

    public void setTypeId(Integer typeId) {
        this.typeId = typeId;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Integer getuId() {
        return uId;
    }

    public void setuId(Integer uId) {
        this.uId = uId;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }


    @Override
    public String toString() {
        return "Zan{" +
                "id=" + id +
                ", typeId=" + typeId +
                ", type=" + type +
                ", uId=" + uId +
                ", status=" + status +
                ", oId=" + oId +
                '}';
    }
}
