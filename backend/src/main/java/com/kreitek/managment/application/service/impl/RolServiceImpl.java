package com.kreitek.managment.application.service.impl;

import com.kreitek.managment.application.dto.RolDto;
import com.kreitek.managment.application.mapper.RolMapper;
import com.kreitek.managment.application.service.RolService;
import com.kreitek.managment.domain.entity.Rol;
import com.kreitek.managment.domain.persistance.RolPersistence;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RolServiceImpl implements RolService {

    private final RolPersistence persistence;
    private final RolMapper mapper;

    @Autowired
    public RolServiceImpl(
            RolPersistence persistence,
            RolMapper mapper
    ) {
        this.persistence = persistence;
        this.mapper = mapper;
    }


    @Override
    public List<RolDto> getAllRoles() {
        List<Rol> roles = this.persistence.getAllRoles();
        return mapper.toDto(roles);
    }
}
