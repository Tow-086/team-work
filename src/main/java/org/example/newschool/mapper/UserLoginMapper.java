package org.example.newschool.mapper;

import io.lettuce.core.dynamic.annotation.Param;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.example.newschool.dto.UserRegisterDTO;
import org.example.newschool.entity.User;

@Mapper
public interface UserLoginMapper {
    @Select("select * from users where email = #{email}")
    User findByEmail(String email);
    @Insert("insert into users (email, password, nickname, created_at) values (#{email}, #{password}, #{nickname}, #{created_at})")
    int insert(UserRegisterDTO userRegisterDTO);
    @Update("UPDATE users SET password = #{newPassword} WHERE email = #{email}")
    int updatePasswordByEmail(@Param("email") String email, @Param("newPassword") String newPassword);
}
