package com.example.ElderHomeProject.controller;


import com.example.ElderHomeProject.model.Activity;
import com.example.ElderHomeProject.model.GeneralInfo;
import com.example.ElderHomeProject.model.Patient;
import com.example.ElderHomeProject.repository.ActivityRepository;
import com.example.ElderHomeProject.repository.GeneralInfoRepository;
import com.example.ElderHomeProject.repository.PatientRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@RestController
public class PatientController {

    private final PatientRepository patientRepository;
    private final ActivityRepository activityRepository;

    @Autowired
    public PatientController(PatientRepository patientRepository, ActivityRepository activityRepository) {
        this.patientRepository = patientRepository;
        this.activityRepository = activityRepository;
    }

    @GetMapping("/patients")
    public ResponseEntity<?> getPatientDetails(
            @RequestParam(required = false) String tokenCode,
            @RequestParam(required = false) String accessUser) {

        Patient patient = null;

        // Fetch a patient based on the provided parameters
        if (accessUser != null) {
            List<Patient> patients = patientRepository.findByAccessUser(accessUser);

            if (!patients.isEmpty()) {
                return ResponseEntity.ok(patients);
            }
            return ResponseEntity.status(404).body("No patients found.");
        }

        if (tokenCode != null) {
            patient = patientRepository.findByTokenCode(tokenCode);

            if (patient != null) {
                return ResponseEntity.ok(patient);
            }
            return ResponseEntity.status(404).body("No patients found.");
        }

        if (tokenCode == null && accessUser == null) {
            List<Patient> patients = patientRepository.findAll();

            if (!patients.isEmpty()) {
                return ResponseEntity.ok(patients);
            }
            return ResponseEntity.status(404).body("No patients found.");
        }

        return ResponseEntity.status(404).body("Patient not found.");
    }

    @GetMapping("/patients/activities")
    public ResponseEntity<?> getPatientActivities(@RequestParam String tokenCode) {
        Patient patient = patientRepository.findByTokenCode(tokenCode);

        if (patient != null) {
            return ResponseEntity.ok(patient.getActivities());
        } else {
            return ResponseEntity.status(404).body("Patient not found.");
        }
    }

    @PostMapping("/patients/add")
    public ResponseEntity<String> addPatient(@RequestBody String jsonPatient) {
        try {
            // Convert JSON string to Patient object
            ObjectMapper objectMapper = new ObjectMapper();
            Patient patient = objectMapper.readValue(jsonPatient, Patient.class);

            // Save the patient to the repository
            patientRepository.save(patient);

            return ResponseEntity.ok("Patient added successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body("Error adding patient: " + e.getMessage());
        }
    }

    @GetMapping("/patients/delete")
    public ResponseEntity<String> deleteUser(@RequestParam String tokenCode) {
        if(patientRepository.findByTokenCode(tokenCode) != null){
            patientRepository.deleteByTokenCode(tokenCode);
            return ResponseEntity.ok("User deleted");
        }

        return ResponseEntity.status(404).body(null);
    }

    @GetMapping("/patients/updateAccessUser")
    public ResponseEntity<String> updateAccessUser(@RequestParam String tokenCode, @RequestParam String accessUser) {
        try {
            // Find patient by tokenCode
            Patient patient = patientRepository.findByTokenCode(tokenCode);

            if (patient != null) {
                // Update the accessUser field
                patient.setAccessUser(accessUser);
                patientRepository.save(patient); // Save changes to the database
                return ResponseEntity.ok("Access user updated successfully for patient with tokenCode: " + tokenCode);
            } else {
                return ResponseEntity.status(404).body("Patient not found with tokenCode: " + tokenCode);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error updating access user: " + e.getMessage());
        }
    }

}
