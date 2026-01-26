import api from "./axios";



export const getP95Value = (serviceId, hours) => {
  return api.get(`/P95/${serviceId}?hours=${hours}`);
};
