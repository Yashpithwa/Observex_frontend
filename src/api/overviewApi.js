import api from "./axios";

// overall system numbers
export const getOverview = () => {
  return api.get("/dashboard/overview");
};

// service-wise current status (⚠️ singular as per backend)
export const getServiceStatuses = () => {
  return api.get("/dashboard/service");
};
