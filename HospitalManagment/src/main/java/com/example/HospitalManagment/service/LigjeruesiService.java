package com.example.HospitalManagment.service;


import com.example.HospitalManagment.entity.*;
import com.example.HospitalManagment.repository.*;
import org.springframework.stereotype.Service;


@Service
public class LigjeruesiService  extends BasicServiceOperations<LigjeruesiRepository, Ligjeruesi> {
    public LigjeruesiService(LigjeruesiRepository repository){
        super(repository);
    }

}
