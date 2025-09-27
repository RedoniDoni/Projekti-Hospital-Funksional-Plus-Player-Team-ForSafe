package com.example.HospitalManagment.service;

import com.example.HospitalManagment.entity.Team;
import com.example.HospitalManagment.repository.TeamRepository;
import org.springframework.stereotype.Service;

@Service
public class TeamService extends BasicServiceOperations<TeamRepository, Team> {
    public TeamService(TeamRepository repository){
        super(repository);
    }

}
