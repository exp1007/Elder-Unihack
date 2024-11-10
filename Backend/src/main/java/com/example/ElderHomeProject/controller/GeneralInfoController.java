package com.example.ElderHomeProject.controller;

import com.example.ElderHomeProject.model.GeneralInfo;
import com.example.ElderHomeProject.model.Patient;
import com.example.ElderHomeProject.repository.GeneralInfoRepository;
import com.example.ElderHomeProject.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@Document(collection = "generalInfo")
//@RequestMapping("/api/GeneralInfo")
@CrossOrigin(origins = "http://localhost:3000")
public class GeneralInfoController {
    private final GeneralInfoRepository generalInfoRepository;

    @Autowired
    public GeneralInfoController(GeneralInfoRepository generalInfoRepository) {
        this.generalInfoRepository = generalInfoRepository;
    }

/*    @GetMapping("/patients/generalInfo/{tokenCode}/")
    public List<GeneralInfo> getGeneralInfoByTokenCode(
            @PathVariable String tokenCode
            ) {
        return GeneralInfoService.getGeneralInfoByTokenCode(tokenCode);
    }*/

    @GetMapping("/patients/generalInfo")
    public ResponseEntity<GeneralInfo> getPatientGeneral(@RequestParam String tokenCode) {
        Optional<GeneralInfo> generalOptional = generalInfoRepository.findByTokenCode(tokenCode);
        if (generalOptional.isPresent()) {
            return ResponseEntity.ok(generalOptional.get());
        } else {
            return ResponseEntity.status(404).body(null);
        }
    }

    @GetMapping("/patients/generalInfo/all")
    public ResponseEntity<List<GeneralInfo>> getAllGeneralInfo() {
        List<GeneralInfo> generalInfoList = generalInfoRepository.findAll();
        if (generalInfoList.isEmpty()) {
            return ResponseEntity.status(404).body(null);
        } else {
            return ResponseEntity.ok(generalInfoList);
        }
    }

}
