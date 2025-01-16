package com.example.ElderHomeProject.repository;

import com.example.ElderHomeProject.model.Token;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface TokenRepository extends MongoRepository<Token, String> {
    Optional<Token> findByToken(String token);
    Optional<Token> findByUsername(String username);

}
