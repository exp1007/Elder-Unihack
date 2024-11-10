package com.example.ElderHomeProject;

import com.example.ElderHomeProject.model.GeneralInfo;
import com.example.ElderHomeProject.model.Patient;
import com.example.ElderHomeProject.repository.GeneralInfoRepository;
import com.example.ElderHomeProject.repository.PatientRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.InputStream;
import java.util.List;


@SpringBootApplication

public class ElderHomeProjectApplication implements CommandLineRunner {

	private final PatientRepository patientRepository;
	private final ObjectMapper objectMapper;
	private final GeneralInfoRepository generalInfoRepository;

	public ElderHomeProjectApplication(PatientRepository patientRepository, ObjectMapper objectMapper, GeneralInfoRepository generalInfoRepository) {
		this.patientRepository = patientRepository;
		this.objectMapper = objectMapper;
		this.generalInfoRepository = generalInfoRepository;
	}

	public static void main(String[] args) {
		SpringApplication.run(ElderHomeProjectApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		loadPatientsFromJson();
		loadGeneralInfoFromJson();
	}


	private void loadPatientsFromJson() {
		/*try {
			// Load JSON file from resources
			InputStream inputStream = getClass().getResourceAsStream("/patients.json");
			// Map JSON array to a List of Patient objects
			List<Patient> patients = objectMapper.readValue(inputStream, new TypeReference<List<Patient>>() {});

			// Save all patients to MongoDB
			patientRepository.saveAll(patients);

			System.out.println("Successfully loaded patients from JSON and saved to MongoDB.");
		} catch (Exception e) {
			System.err.println("Error loading patients from JSON: " + e.getMessage());
			e.printStackTrace();
		}*/
	}

	private void loadGeneralInfoFromJson() {
/*		try {
			// Load JSON file from resources
			InputStream inputStream = getClass().getResourceAsStream("/GeneralInfo.json");
			// Map JSON array to a List of Patient objects
			List<GeneralInfo> generalInfo = objectMapper.readValue(inputStream, new TypeReference<List<GeneralInfo>>() {});

			// Save all patients to MongoDB
			generalInfoRepository.saveAll(generalInfo);

			System.out.println("Successfully loaded generalInfo from JSON and saved to MongoDB.");
		} catch (Exception e) {
			System.err.println("Error loading GeneralInfo from JSON: " + e.getMessage());
			e.printStackTrace();
		}*/
	}
}


