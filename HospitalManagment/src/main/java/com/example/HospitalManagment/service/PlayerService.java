package com.example.HospitalManagment.service;


import com.example.HospitalManagment.entity.Player;
import com.example.HospitalManagment.repository.PlayerRepository;
import org.springframework.stereotype.Service;


@Service
public class PlayerService extends BasicServiceOperations<PlayerRepository, Player> {
    public PlayerService(PlayerRepository repository){
        super(repository);
    }

}
