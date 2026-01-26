import api from "./axios";


export const getAiInsight = (serviceId, hours) => {
  return api.get(`/ai/insight/${serviceId}?hours=${hours}`);
};

 
export const getAiReason =(serviceId)=>{
  return api.get(`/ai/reason/${serviceId}`);

};
