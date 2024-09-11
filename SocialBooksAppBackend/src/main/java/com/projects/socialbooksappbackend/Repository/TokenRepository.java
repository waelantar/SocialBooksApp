package com.projects.socialbooksappbackend.Repository;

import com.projects.socialbooksappbackend.Entity.Token;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface TokenRepository {//extends JpaRepository<Token, Integer> {

    Optional<Token> findByToken(String token);
}
