package com.kreitek.managment.infrastructure.persistance;

import com.kreitek.managment.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends  JpaRepository<User, Long>, JpaSpecificationExecutor<User> {
}
