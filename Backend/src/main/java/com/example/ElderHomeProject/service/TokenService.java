package com.example.ElderHomeProject.service;

import com.example.ElderHomeProject.model.Token;
import com.example.ElderHomeProject.repository.TokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class TokenService {

    @Autowired
    private TokenRepository tokenRepository;

    public void saveToken(Token token) {
        tokenRepository.save(token); // Store token in MongoDB
    }

    public Optional<Token> getToken(String token) {
        return tokenRepository.findByToken(token); // Retrieve token from MongoDB
    }

    public void deleteToken(String token) {
        tokenRepository.deleteById(token); // Delete token from MongoDB
    }
}
