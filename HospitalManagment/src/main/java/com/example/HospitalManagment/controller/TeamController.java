package com.example.HospitalManagment.controller;

import com.example.HospitalManagment.entity.Team;
import com.example.HospitalManagment.service.TeamService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/team")
public class TeamController extends BasicControllerOperations<TeamService, Team> {


    public TeamController(TeamService service) {
        super(service);
    }
}
