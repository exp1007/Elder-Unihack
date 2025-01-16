/*
package com.example.ElderHomeProject.service;

import com.example.ElderHomeProject.model.GeneralInfo;
import com.example.ElderHomeProject.repository.GeneralInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class GeneralInfoService {
    private final GeneralInfoRepository GeneralInfoRepository;

    @Autowired
    public GeneralInfoService(GeneralInfoRepository GeneralInfoRepository) {
        this.GeneralInfoRepository = GeneralInfoRepository;
    }

    public List<GeneralInfo> getGeneralInfoByTokenCode(String tokenCode) {
        return GeneralInfoRepository.findByTokenCode(tokenCode);
    }
}

*/
