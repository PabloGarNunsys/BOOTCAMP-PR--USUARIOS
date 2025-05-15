package com.kreitek.managment.infrastructure.rest;

import com.kreitek.managment.application.dto.RolDto;
import com.kreitek.managment.application.service.RolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RolRestController {
    private final RolService rolService;

    @Autowired
    public RolRestController(RolService rolService) {
        this.rolService = rolService;
    }

    @CrossOrigin
    @GetMapping(value = "/roles", produces = "application/json")
    public ResponseEntity<List<RolDto>> getRoles() {
        List<RolDto> rolDtos = rolService.getAllRoles();
        return new ResponseEntity<>(rolDtos, HttpStatus.OK);
    }
}
