package com.example.ElderHomeProject.repository;

import com.example.ElderHomeProject.model.Patient;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PatientRepository extends MongoRepository<Patient, String> {
    Optional<Patient> findByTokenCode(String tokenCode);
}

