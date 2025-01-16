package com.example.ElderHomeProject.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDate;
import java.time.LocalTime;

@Document
public class Activity {
    @Id
    private String id;
    @Field
    private String patientId;
    @Field
    private String activityName;
    @Field
    private LocalDate date;
    @Field
    private String details;
    @Field
    private int status;
    @Field
    private LocalTime startTime;
    @Field
    private LocalTime endTime;

    public Activity(String patientId, String activityName, LocalDate date, String details, int status, LocalTime startTime, LocalTime endTime) {
        this.activityName = activityName;
        this.date = date;
        this.details = details;
        this.patientId = patientId;
        this.status = status;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPatientId() {
        return patientId;
    }

    public void setPatientId(String patientId) {
        this.patientId = patientId;
    }

    public String getActivityName() {
        return activityName;
    }

    public void setActivityName(String activityName) {
        this.activityName = activityName;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }

    @Override
    public String toString() {
        return "Activity{" +
                "PatientId='" + patientId + '\'' +
                "activityName='" + activityName + '\'' +
                ", date=" + date +
                ", details='" + details + '\'' +
                ", status=" + status +
                ", startTime=" + startTime +
                ", endTime=" + endTime +
                '}';
    }
}

