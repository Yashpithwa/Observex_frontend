import api from "./axios";

// history of a single service
export const getHistoryData = (serviceId) => {
  return api.get(`/history/${serviceId}`);
};
