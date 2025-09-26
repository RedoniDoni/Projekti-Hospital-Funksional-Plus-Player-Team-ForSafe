package com.example.HospitalManagment.repository;

import com.example.HospitalManagment.entity.Player;
import lombok.AllArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlayerRepository extends JpaRepository<Player,Long> {
}
