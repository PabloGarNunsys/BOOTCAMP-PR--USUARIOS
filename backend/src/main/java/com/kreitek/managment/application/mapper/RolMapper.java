package com.kreitek.managment.application.mapper;

import com.kreitek.managment.application.dto.RolDto;
import com.kreitek.managment.domain.entity.Rol;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RolMapper extends EntityMapper<RolDto, Rol>{
    default Rol fromId(Long id) {
        if (id == null ) return null;
        Rol rol = new Rol();
        rol.setId(id);
        return rol;
    }
}
