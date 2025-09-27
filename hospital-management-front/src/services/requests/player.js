import axios from "../axios";

export const fetchAllPlayers = () => axios.get("/player/all");
export const updatePlayer = (id, data) => axios.put("/player", { ...data, id });
export const deletePlayer = (id) => axios.delete(`/player/${id}`);
export const createPlayer = (data) => axios.post("/player", data);
///api/player/all
