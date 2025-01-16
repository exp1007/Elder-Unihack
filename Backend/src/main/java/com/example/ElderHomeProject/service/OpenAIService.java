package com.example.ElderHomeProject.service;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class OpenAIService {


    private final RestTemplate restTemplate = new RestTemplate();
    private static final String OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
    private static final String API_KEY = "OPENAI-API-Key"; // Replace

    public String getOpenAiResponse(String prompt) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + API_KEY);
        headers.set("Content-Type", "application/json");

        Map<String, Object> requestBody = Map.of(
                "model", "gpt-4o-mini",
                "messages", List.of(
                        Map.of(
                                "role", "system",
                                "content", "You are a helpful medical assistant, you have to send short and clear answers because you deal directly with customers."
                        ),
                        Map.of(
                                "role", "user",
                                "content", prompt
                        )
                ),
                "max_tokens", 50, // Limit the response to 50 tokens
                "temperature", 0.2, // Make the response focused and simple
                "top_p", 0.5 // Consider only the top 50% of likely responses
        );

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<String> response = restTemplate.exchange(
                OPENAI_API_URL,
                HttpMethod.POST,
                entity,
                String.class
        );

        System.out.println((String) response.getBody());

        return response.getBody();
    }
}
