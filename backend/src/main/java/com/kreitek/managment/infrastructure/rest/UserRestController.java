package com.kreitek.managment.infrastructure.rest;

import com.kreitek.managment.application.dto.UserDto;
import com.kreitek.managment.application.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class UserRestController {

    private final UserService userService;

    @Autowired
    public UserRestController(UserService userService) {
        this.userService = userService;
    }

    @CrossOrigin
    @GetMapping(value = "/users", produces = "application/json")
    public ResponseEntity<Page<UserDto>> getUsers(@RequestParam(value = "filter") String filter, Pageable pageable) {

        Page<UserDto> usersDtos = userService.getAllUsersByCriteria(pageable, filter);
        return new ResponseEntity<Page<UserDto>>(usersDtos, HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping(value = "/users/{userId}", produces = "application/json")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long userId) {
        Optional<UserDto> userDto = this.userService.getUserById(userId);
        return userDto
                .map(dto -> new ResponseEntity<>(dto, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @CrossOrigin
    @PostMapping(value = "/users/new", produces = "application/json", consumes = "application/json")
    public ResponseEntity<UserDto> createNewUser(@RequestBody UserDto userDto) {

        UserDto editUserDto = userService.saveUsers(userDto);
        return new ResponseEntity<>(editUserDto, HttpStatus.CREATED);

    }

    @CrossOrigin
    @PatchMapping(value = "/users", produces = "application/json", consumes = "application/json")
    public ResponseEntity<UserDto> updateUser(@RequestBody UserDto userDto) {


        try {
            UserDto newUserDto = userService.updateUser(userDto);
            return new ResponseEntity<>(newUserDto, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @CrossOrigin
    @DeleteMapping(value = "/users/{userId}")
    public ResponseEntity<Void> deleteUserById(@PathVariable Long userId) {
        userService.deleteUsers(userId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
