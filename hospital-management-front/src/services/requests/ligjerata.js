import axios from "../axios";

export const fetchAllLectures = () => axios.get("ligjerata/all");
export const createLecture = (data) => axios.post("/ligjerata", data);
export const updateLecture = (data) => axios.put("/ligjerata", data);

export const deleteLecture = (id) => axios.delete(`/ligjerata/${id}`);
