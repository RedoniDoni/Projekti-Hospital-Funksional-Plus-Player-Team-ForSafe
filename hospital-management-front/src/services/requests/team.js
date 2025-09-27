import axios from "../axios";

export const fetchAllTeams = () => axios.get("team/all");
export const createTeam = (data) => axios.post("/team", data);
export const updateTeam = (data) => axios.put("/team", data);

export const deleteTeam = (id) => axios.delete(`/team/${id}`);
