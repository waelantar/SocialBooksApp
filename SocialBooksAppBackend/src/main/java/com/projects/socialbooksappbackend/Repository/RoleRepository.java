package com.projects.socialbooksappbackend.Repository;

import com.projects.socialbooksappbackend.Entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface RoleRepository extends JpaRepository {
    Optional<Role> findByName(String role);
}
