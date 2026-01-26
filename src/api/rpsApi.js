import api from "./axios";



export const getRPSValue = (serviceId) => {
  return api.get(`/rps/${serviceId}`);
};
