package com.example.HospitalManagment.service;

import com.example.HospitalManagment.entity.Ligjerata;
import com.example.HospitalManagment.repository.LigjerataRepository;
import org.springframework.stereotype.Service;

@Service
public class LigjerataService extends BasicServiceOperations<LigjerataRepository, Ligjerata> {
    public LigjerataService(LigjerataRepository repository){
        super(repository);
    }

}
