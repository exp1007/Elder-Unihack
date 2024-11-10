package com.example.ElderHomeProject.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Document
public class Patient {
    @Id
    private String id;
    @Field
    private String name;
    @Field
    private int age;
    @Field
    private String medicalCondition;
    @Field
    private String tokenCode;
    @Field
    private List<Activity> activities;


    // Constructors, Getters, and Setters
    public Patient() {}

    public Patient(String name, int age, String medicalCondition, String tokenCode) {
        this.name = name;
        this.age = age;
        this.medicalCondition = medicalCondition;
        this.tokenCode = tokenCode;
        this.activities = activities;

    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getMedicalCondition() {
        return medicalCondition;
    }

    public void setMedicalCondition(String medicalCondition) {
        this.medicalCondition = medicalCondition;
    }
    public String getTokenCode() {
        return tokenCode;
    }

    public void setTokenCode(String tokenCode) {
        this.tokenCode = tokenCode;
    }

    public List<Activity> getActivities() {
        return activities;
    }

    public void setActivities(List<Activity> activities) {
        this.activities = activities;
    }

    @Override
    public String toString() {
        return "Patient [id=" + id + ", name=" + name + ", age=" + age + ", medicalCondition=" + medicalCondition +  ", tokenCode=" + tokenCode +  ",  activities=" + activities + "]";
    }
}
