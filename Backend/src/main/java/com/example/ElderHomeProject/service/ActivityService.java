package com.example.ElderHomeProject.service;

import com.example.ElderHomeProject.model.Activity;
import com.example.ElderHomeProject.repository.ActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ActivityService {
    private final ActivityRepository activityRepository;

    @Autowired
    public ActivityService(ActivityRepository activityRepository) {
        this.activityRepository = activityRepository;
    }

    public List<Activity> getActivitiesByPatientIdAndDate(String patientId, LocalDate date) {
        return activityRepository.findByPatientId(patientId);
    }
}

