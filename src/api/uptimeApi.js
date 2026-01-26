import api from "./axios";



export const getUptimeValue = (serviceId, hours) => {
  return api.get(`/uptime/${serviceId}?hours=${hours}`);
};
