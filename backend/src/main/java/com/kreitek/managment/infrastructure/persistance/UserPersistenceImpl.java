package com.kreitek.managment.infrastructure.persistance;

import com.kreitek.managment.domain.entity.User;
import com.kreitek.managment.domain.persistance.*;
import com.kreitek.managment.infrastructure.specs.ItemSpecification;
import com.kreitek.managment.infrastructure.specs.shared.SearchCriteriaHelper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class UserPersistenceImpl implements UserPersistence {

    private final UserRepository userRepository;

    @Autowired
    public UserPersistenceImpl(UserRepository userRepository) {

        this.userRepository = userRepository;
    }

    @Override
    public List<User> getAllUsers() {
        return this.userRepository.findAll();
    }

    @Override
    public Optional<User> getUserById(Long id) {
        return this.userRepository.findById(id);
    }

    @Override
    public User saveUser(User usuario) {
        return this.userRepository.save(usuario);
    }


    @Override
    public Void deleteUserById(Long usuarioId) {
        this.userRepository.deleteById(usuarioId);
        return null;
    }

    @Override
    public Page<User> findAllInPage(Pageable pageable, String filters) {
        ItemSpecification specification = new ItemSpecification(SearchCriteriaHelper.fromFilterString(filters));
        return this.userRepository.findAll(specification, pageable);
    }




}
