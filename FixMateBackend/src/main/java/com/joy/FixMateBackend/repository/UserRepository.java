package com.joy.FixMateBackend.repository;

import com.joy.FixMateBackend.entity.UserEntity;
import com.joy.FixMateBackend.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, String> {

    Optional<UserEntity> findByEmail(String email);

    List<UserEntity> findByRole(UserRole role);
}
