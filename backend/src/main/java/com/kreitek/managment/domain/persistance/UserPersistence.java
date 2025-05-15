package com.kreitek.managment.domain.persistance;

import com.kreitek.managment.domain.entity.User;
import org.springframework.data.domain.Page;

import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.Optional;

public interface UserPersistence {
    List<User> getAllUsers();
    Optional<User> getUserById(Long id);
    User saveUser(User usuario);
    Void deleteUserById(Long userId);
    Page<User> findAllInPage(Pageable pageable, String filter);
}
