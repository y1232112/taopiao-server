package com.example.tp.entity;



public class Admin {
    private Integer id;/*id*/
    private String admin; /*管理员账号*/
    private String password;/*管理员密码*/
    private String birth;
    private String phone;
    private String avatar;/*头像*/

    public String getBirth() {
        return birth;
    }

    public void setBirth(String birth) {
        this.birth = birth;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getAdmin() {
        return admin;
    }

    public void setAdmin(String admin) {
        this.admin = admin;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "Admin{" +
                "id=" + id +
                ", admin='" + admin + '\'' +
                ", password='" + password + '\'' +
                ", birth='" + birth + '\'' +
                ", phone='" + phone + '\'' +
                ", avatar='" + avatar + '\'' +
                '}';
    }
}
