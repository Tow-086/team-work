package org.example.newschool;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class NewschoolApplication {

    public static void main(String[] args) {
        SpringApplication.run(NewschoolApplication.class, args);
    }

}
