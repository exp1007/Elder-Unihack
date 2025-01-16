package com.example.ElderHomeProject.repository;

import com.example.ElderHomeProject.model.GeneralInfo;
import com.example.ElderHomeProject.model.Patient;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
@Document(collection = "generalInfo")
public interface GeneralInfoRepository extends MongoRepository<GeneralInfo, String> {
    Optional<GeneralInfo> findByTokenCode(String tokenCode);
}
