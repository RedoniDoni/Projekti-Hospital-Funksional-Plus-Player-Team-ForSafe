package com.example.HospitalManagment.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;


@Data
@EqualsAndHashCode(callSuper = true)
@Entity
public class Player extends DataEntity{


    @Column(name = "name")
    public String name;

    @Column(name = "number")
    public long number;

    @ManyToOne
    @JoinColumn(name = "team_id")
    private Team team;

}