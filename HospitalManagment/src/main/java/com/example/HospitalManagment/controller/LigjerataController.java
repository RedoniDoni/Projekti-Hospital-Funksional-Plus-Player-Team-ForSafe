package com.example.HospitalManagment.controller;

import com.example.HospitalManagment.entity.Ligjerata;
import com.example.HospitalManagment.service.LigjerataService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ligjerata")
public class LigjerataController extends BasicControllerOperations<LigjerataService, Ligjerata> {

    public LigjerataController(LigjerataService service) {
        super(service);
    }
}
