package com.example.tp.entity;

public class CinemaAdmin {
    private Integer cinemaAdminId;
    private String nickName;
    private String password;
    private String phone;
    private String birth;
    private String realName;
    private String avatar;

    public Integer getCinemaAdminId() {
        return cinemaAdminId;
    }

    public void setCinemaAdminId(Integer cinemaAdminId) {
        this.cinemaAdminId = cinemaAdminId;
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getBirth() {
        return birth;
    }

    public void setBirth(String birth) {
        this.birth = birth;
    }

    public String getRealName() {
        return realName;
    }

    public void setRealName(String realName) {
        this.realName = realName;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    @Override
    public String toString() {
        return "CinemaAdmin{" +
                "cinemaAdminId=" + cinemaAdminId +
                ", nickName='" + nickName + '\'' +
                ", password='" + password + '\'' +
                ", phone='" + phone + '\'' +
                ", birth='" + birth + '\'' +
                ", realName='" + realName + '\'' +
                ", avatar='" + avatar + '\'' +
                '}';
    }
}
