package com.example.ElderHomeProject.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document
public class GeneralInfo {
    @Id
    private String id;

    @Field
    private int dailyActiveHours;
    @Field
    private int weeklyWorkoutSessions;
    @Field
    private int stepsPerDay;
    @Field
    private String medicaments;
    @Field
    private float averageSleepDuration;
    @Field
    private int sleepQuality;
    @Field
    private float deepSleepHours;
    @Field
    private int dailyCaloriesIntake;
    @Field
    private int proteinIntake;
    @Field
    private int numberOfMeals;
    @Field
    private String tokenCode;

    public GeneralInfo(String id, int dailyActiveHours, int weeklyWorkoutSessions, int stepsPerDay, String medicaments, float averageSleepDuration, int sleepQuality, float deepSleepHours, int dailyCaloriesIntake, int proteinIntake, int numberOfMeals, String tokenCode) {
        this.id = id;
        this.dailyActiveHours = dailyActiveHours;
        this.weeklyWorkoutSessions = weeklyWorkoutSessions;
        this.stepsPerDay = stepsPerDay;
        this.medicaments = medicaments;
        this.averageSleepDuration = averageSleepDuration;
        this.sleepQuality = sleepQuality;
        this.deepSleepHours = deepSleepHours;
        this.dailyCaloriesIntake = dailyCaloriesIntake;
        this.proteinIntake = proteinIntake;
        this.numberOfMeals = numberOfMeals;
        this.tokenCode = tokenCode;
    }

    public String getTokenCode() {
        return tokenCode;
    }

    public void setTokenCode(String tokenCode) {
        this.tokenCode = tokenCode;
    }



    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getDailyActiveHours() {
        return dailyActiveHours;
    }

    public void setDailyActiveHours(int dailyActiveHours) {
        this.dailyActiveHours = dailyActiveHours;
    }

    public int getWeeklyWorkoutSessions() {
        return weeklyWorkoutSessions;
    }

    public void setWeeklyWorkoutSessions(int weeklyWorkoutSessions) {
        this.weeklyWorkoutSessions = weeklyWorkoutSessions;
    }

    public int getStepsPerDay() {
        return stepsPerDay;
    }

    public void setStepsPerDay(int stepsPerDay) {
        this.stepsPerDay = stepsPerDay;
    }

    public String getmedicaments() {
        return medicaments;
    }

    public void setmedicaments(String medicaments) {
        this.medicaments = medicaments;
    }

    public float getAverageSleepDuration() {
        return averageSleepDuration;
    }

    public void setAverageSleepDuration(float averageSleepDuration) {
        this.averageSleepDuration = averageSleepDuration;
    }

    public int getSleepQuality() {
        return sleepQuality;
    }

    public void setSleepQuality(int sleepQuality) {
        this.sleepQuality = sleepQuality;
    }

    public float getDeepSleepHours() {
        return deepSleepHours;
    }

    public void setDeepSleepHours(float deepSleepHours) {
        this.deepSleepHours = deepSleepHours;
    }

    public int getDailyCaloriesIntake() {
        return dailyCaloriesIntake;
    }

    public void setDailyCaloriesIntake(int dailyCaloriesIntake) {
        this.dailyCaloriesIntake = dailyCaloriesIntake;
    }

    public int getProteinIntake() {
        return proteinIntake;
    }

    public void setProteinIntake(int proteinIntake) {
        this.proteinIntake = proteinIntake;
    }

    public int getNumberOfMeals() {
        return numberOfMeals;
    }

    public void setNumberOfMeals(int numberOfMeals) {
        this.numberOfMeals = numberOfMeals;
    }

    @Override
    public String toString() {
        return "GeneralInfo{" +
                "id='" + id + '\'' +
                ", dailyActiveHours=" + dailyActiveHours +
                ", weeklyWorkoutSessions=" + weeklyWorkoutSessions +
                ", stepsPerDay=" + stepsPerDay +
                ", medicaments='" + medicaments + '\'' +
                ", averageSleepDuration=" + averageSleepDuration +
                ", sleepQuality=" + sleepQuality +
                ", deepSleepHours=" + deepSleepHours +
                ", dailyCaloriesIntake=" + dailyCaloriesIntake +
                ", proteinIntake=" + proteinIntake +
                ", numberOfMeals=" + numberOfMeals +
                ", tokenCode='" + tokenCode + '\'' +
                '}';
    }
}
