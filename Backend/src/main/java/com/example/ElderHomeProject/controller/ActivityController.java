package com.example.ElderHomeProject.controller;

import com.example.ElderHomeProject.model.Activity;
import com.example.ElderHomeProject.service.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/activities")
public class ActivityController {
    private final ActivityService activityService;

    @Autowired
    public ActivityController(ActivityService activityService) {
        this.activityService = activityService;
    }

    @GetMapping("/patient/{patientId}/date/{date}")
    public List<Activity> getActivitiesByPatientIdAndDate(
            @PathVariable String patientId,
            @PathVariable String date) {
        return activityService.getActivitiesByPatientIdAndDate(patientId, LocalDate.parse(date));
    }
}
