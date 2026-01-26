import api from "./axios";



export const getErrorRatevalue = (serviceId, hours) => {
  return api.get(`/errorate/${serviceId}?hours=${hours}`);
};
