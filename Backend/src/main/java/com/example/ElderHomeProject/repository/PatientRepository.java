package com.example.ElderHomeProject.repository;

import com.example.ElderHomeProject.model.Patient;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PatientRepository extends MongoRepository<Patient, String> {
    Patient findByTokenCode(String tokenCode);
    List<Patient> findByAccessUser(String accessUser);

    void deleteByTokenCode(String tokenCode);
}

