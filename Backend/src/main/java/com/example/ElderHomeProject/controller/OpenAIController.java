package com.example.ElderHomeProject.controller;

import com.example.ElderHomeProject.service.OpenAIService;
import org.springframework.web.bind.annotation.*;

@RestController
public class OpenAIController {
    private final OpenAIService openAiApiService;

    public OpenAIController(OpenAIService openAiApiService) {
        this.openAiApiService = openAiApiService;
    }

    @GetMapping("/openai")
    public String getOpenAiResponse(@RequestParam String prompt) {
        return openAiApiService.getOpenAiResponse(prompt);
    }
}
