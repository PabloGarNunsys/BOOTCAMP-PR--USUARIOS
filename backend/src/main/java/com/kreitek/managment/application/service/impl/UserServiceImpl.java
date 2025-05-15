package com.kreitek.managment.application.service.impl;

import com.kreitek.managment.application.dto.UserDto;
import com.kreitek.managment.application.mapper.UserMapper;
import com.kreitek.managment.application.service.UserService;
import com.kreitek.managment.domain.entity.User;
import com.kreitek.managment.domain.persistance.*;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.data.domain.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserPersistence persistence;
    private final UserMapper mapper;

    @Autowired
    public UserServiceImpl(
            UserPersistence persistence,
            UserMapper mapper
    ) {
        this.persistence = persistence;
        this.mapper = mapper;
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserDto> getAllUsers() {
        List<User> users = this.persistence.getAllUsers();
        return this.mapper.toDto(users);
    }

    @Override
    public Optional<UserDto> getUserById(Long userId) {
        Optional<User> user = this.persistence.getUserById(userId);
        return user.map(this.mapper::toDto);
    }

    @Override
    @Transactional
    public UserDto saveUsers(UserDto usuarioDto) {

        User user = this.mapper.toEntity(usuarioDto);
        user = persistence.saveUser(user);
        return this.mapper.toDto(user);
    }

    @Override
    @Transactional
    public UserDto updateUser(UserDto userDto) throws EnumConstantNotPresentException, OptimisticLockingFailureException {
        User user = persistence.getUserById(userDto.getId())
                .orElseThrow(()-> new EntityNotFoundException("No se ha encontrado el usuario: " + userDto.getName()));
        if(!user.getVersion().equals(userDto.getVersion())){
            throw new OptimisticLockingFailureException("El Usuario ha sido actualizado previamente");
        }
        User updatedUser = persistence.saveUser(mapper.toEntity(userDto));
        return mapper.toDto(updatedUser);
    }

    @Override
    @Transactional
    public void deleteUsers(Long usuarioId) {
        this.persistence.deleteUserById(usuarioId);
    }

    @Transactional(readOnly = true)
    @Override
    public Page<UserDto> getAllUsersByCriteria(Pageable pageable, String filter) {
        Page<User> userPage = this.persistence.findAllInPage(pageable, filter);
        return userPage.map(this.mapper::toDto);
    }


}
