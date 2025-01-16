package com.example.ElderHomeProject.controller;

import com.example.ElderHomeProject.model.Patient;
import com.example.ElderHomeProject.model.User;
import com.example.ElderHomeProject.repository.UserRepository;
import com.example.ElderHomeProject.service.TokenService;
import com.example.ElderHomeProject.model.Token;
import com.example.ElderHomeProject.util.JwtTokenUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil jwtTokenUtil;

    @Autowired
    public UserController(UserRepository userRepository, PasswordEncoder passwordEncoder,
                          AuthenticationManager authenticationManager, JwtTokenUtil jwtTokenUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @Autowired
    private TokenService tokenService;  // Token service to interact with MongoDB

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> loginRequest, HttpServletResponse response) {
        String username = loginRequest.get("username");
        String password = loginRequest.get("password");

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );

            // Generate the JWT token
            String token = jwtTokenUtil.generateToken(username);
            long expirationTime = jwtTokenUtil.getExpiryFromToken(token);  // Expiration time of the token

            // Save the token in MongoDB (along with the user and expiration time)
            Token tokenEntity = new Token(token, username, expirationTime);
            tokenService.saveToken(tokenEntity);

            // Prepare the response map
            Map<String, String> responseMap = new HashMap<>();
            responseMap.put("token", token);

            // Set the JWT token as a HttpOnly cookie
            Cookie cookie = new Cookie("JWT", token);
            cookie.setHttpOnly(false); // Prevent access to the cookie from JavaScript
            cookie.setSecure(true); // Set this to true in production
            cookie.setPath("/"); // Cookie is valid across the entire domain
            cookie.setMaxAge(86400); // Set the cookie expiry (1 day)

            response.addCookie(cookie); // Add the cookie to the response

            return ResponseEntity.ok(responseMap);

        } catch (AuthenticationException e) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.status(409).body("Username already exists");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully");
    }

    @GetMapping("/delete")
    public ResponseEntity<String> deleteUser(@RequestParam String username) {
        if(userRepository.findByUsername(username) != null){
            userRepository.deleteByUsername(username);
            return ResponseEntity.ok("User deleted");
        }

        return ResponseEntity.status(404).body(null);
    }

    @GetMapping("/me")
    public ResponseEntity<User> getCurrentUser(Principal principal) {
        String username = principal.getName();
        return userRepository.findByUsername(username)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(404).build());
    }

    @GetMapping("/all")
    public List<User> getAllUsers(Principal principal) {
        String username = principal.getName();
        return userRepository.findAll();
    }

    @GetMapping("/setRole")
    public ResponseEntity<String> setRole(@RequestParam String username, @RequestParam String role ) {
        try {
            // Find patient by tokenCode
            User user = userRepository.findByUsername(username).orElse(null);

            if (user != null) {
                // Update the accessUser field
                user.setRole(role);
                userRepository.save(user); // Save changes to the database
                return ResponseEntity.ok("Access user updated successfully");
            } else {
                return ResponseEntity.status(404).body("User not found");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error updating access user: " + e.getMessage());
        }
    }

    @GetMapping("/getRole")
    public ResponseEntity<String> getUserRole(@RequestParam String username) {
        User user = userRepository.findByUsername(username).orElse(null);
        if (user != null) {
            return ResponseEntity.ok(user.getRole());
        } else {
            return ResponseEntity.status(404).body("User not found");
        }
    }

    @GetMapping("/getUsername")
    public ResponseEntity<String> getUsernameByToken(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        String token = authHeader.substring(7);
        try {
            String username = jwtTokenUtil.getUsernameFromToken(token);
            if (username != null) {
                return ResponseEntity.ok(username);
            } else {
                return ResponseEntity.status(404).body("Invalid token");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error processing token: " + e.getMessage());
        }
    }

}
