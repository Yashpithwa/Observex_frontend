import api from "./axios";

// get all alerts
export const getAlerts = () => {
  return api.get("/alerts");
};
