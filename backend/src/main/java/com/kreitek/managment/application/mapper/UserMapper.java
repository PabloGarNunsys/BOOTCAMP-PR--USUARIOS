package com.kreitek.managment.application.mapper;

import com.kreitek.managment.application.dto.UserDto;
import com.kreitek.managment.domain.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = RolMapper.class)
public interface UserMapper extends EntityMapper<UserDto, User> {

    @Override
    @Mapping(source = "rol_id", target = "rol")
    User toEntity(UserDto dto);

    @Override
    @Mapping(source = "rol.id", target = "rol_id")
    @Mapping(source = "rol.name", target = "rol_name")
    UserDto toDto(User entity);
}
