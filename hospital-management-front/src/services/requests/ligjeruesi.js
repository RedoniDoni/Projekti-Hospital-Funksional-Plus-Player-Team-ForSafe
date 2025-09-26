import axios from "../axios";

export const fetchAllLecturers = () => axios.get("/ligjeruesi/all");
export const updateLecturer = (id, data) => axios.put("/ligjeruesi", { ...data, id });
export const deleteLecturer = (id) => axios.delete(`/ligjeruesi/${id}`);
export const createLecturer = (data) => axios.post("/ligjeruesi", data);
///api/ligjeruesi/all
