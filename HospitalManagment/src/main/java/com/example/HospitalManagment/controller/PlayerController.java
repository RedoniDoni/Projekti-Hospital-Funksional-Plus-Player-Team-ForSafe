package com.example.HospitalManagment.controller;

import com.example.HospitalManagment.entity.Player;
import com.example.HospitalManagment.service.PlayerService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/player")
public class PlayerController extends BasicControllerOperations<PlayerService, Player> {

    public PlayerController(PlayerService service) {
        super(service);
    }

}
