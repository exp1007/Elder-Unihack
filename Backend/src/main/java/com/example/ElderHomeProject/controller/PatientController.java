package com.example.ElderHomeProject.controller;


import com.example.ElderHomeProject.model.Activity;
import com.example.ElderHomeProject.model.GeneralInfo;
import com.example.ElderHomeProject.model.Patient;
import com.example.ElderHomeProject.repository.ActivityRepository;
import com.example.ElderHomeProject.repository.GeneralInfoRepository;
import com.example.ElderHomeProject.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class PatientController {

    private final PatientRepository patientRepository;
    private final ActivityRepository activityRepository;

    @Autowired
    public PatientController(PatientRepository patientRepository, ActivityRepository activityRepository) {
        this.patientRepository = patientRepository;
        this.activityRepository = activityRepository;
    }

    @GetMapping("/verify-token")
    public ResponseEntity<Map<String, Object>> verifyToken(@RequestParam String tokenCode) {
        Optional<Patient> patientOptional = patientRepository.findByTokenCode(tokenCode);

        Map<String, Object> response = new HashMap<>();

        if (patientOptional.isPresent()) {
            Patient patient = patientOptional.get();
            response.put("status", "success");
            response.put("message", "Token verified successfully");
            response.put("patientName", patient.getName());
            return ResponseEntity.ok(response);
        } else {
            response.put("status", "error");
            response.put("message", "Invalid token");
            return ResponseEntity.status(401).body(response);
        }
    }

    @GetMapping("/patients")
    public ResponseEntity<Patient> getPatientDetails(@RequestParam String tokenCode) {
        Optional<Patient> patientOptional = patientRepository.findByTokenCode(tokenCode);
        if (patientOptional.isPresent()) {
            return ResponseEntity.ok(patientOptional.get());
        } else {
            return ResponseEntity.status(404).body(null);
        }
    }

    @GetMapping("/patients/activities")
    public ResponseEntity<List<Activity>> getPatientActivities(@RequestParam String tokenCode) {
        Optional<Patient> patientOptional = patientRepository.findByTokenCode(tokenCode);
        if (patientOptional.isPresent()) {
            Patient patient = patientOptional.get();
            return ResponseEntity.ok(patient.getActivities());
        } else {
            return ResponseEntity.status(404).body(null);
        }
    }


}
