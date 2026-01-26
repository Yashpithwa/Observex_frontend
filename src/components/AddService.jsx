import { useState } from "react";
import { addService } from "../api/servicesApi";

const AddService = ({ onAdded }) => {
  const [serviceName, setServiceName] = useState("");
  const [baseUrl, setBaseUrl] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    await addService({
      serviceName,
      baseUrl,
    });

    setServiceName("");
    setBaseUrl("");
    onAdded(); // refresh list
  };

  return (
    <form onSubmit={submit}>
      <h3>Add Service</h3>

      <input
        placeholder="Service Name"
        value={serviceName}
        onChange={(e) => setServiceName(e.target.value)}
      />

      <input
        placeholder="Base URL"
        value={baseUrl}
        onChange={(e) => setBaseUrl(e.target.value)}
      />

      <button>Add</button>
    </form>
  );
};

export default AddService;
