import api from "./axios";

// get all services
export const getServices = () => {
  return api.get("/services");
};

// add new service
export const addService = (data) => {
  return api.post("/services", data);
};

// disable service
export const disableService = (id) => {
  return api.put(`/services/${id}/disable`);
};

// DELETE service permanently
export const deleteService = (id) => {
  return api.delete(`/services/${id}`);
};

export const countService = () => {
  return api.get(`/services/count`);
};

export const countActiveService = () => {
  return api.get(`/services/count_active`);
};
