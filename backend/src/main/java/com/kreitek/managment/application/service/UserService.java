package com.kreitek.managment.application.service;

import com.kreitek.managment.application.dto.UserDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<UserDto> getAllUsers();
    Optional<UserDto> getUserById(Long userId);
    UserDto saveUsers(UserDto userDto);
    void deleteUsers(Long userId);
    UserDto updateUser(UserDto userDto);
    Page<UserDto> getAllUsersByCriteria(Pageable pageable, String filter);
}
