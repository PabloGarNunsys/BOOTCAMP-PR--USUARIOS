package com.kreitek.managment.infrastructure.persistance;

import com.kreitek.managment.domain.entity.Rol;
import com.kreitek.managment.domain.persistance.RolPersistence;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class RolPersistenceImpl implements RolPersistence {

    private final RolRepository rolRepository;

    @Autowired
    public RolPersistenceImpl(RolRepository rolRepository) {

        this.rolRepository = rolRepository;
    }

    @Override
    public List<Rol> getAllRoles() {
        return this.rolRepository.findAll();
    }
}
