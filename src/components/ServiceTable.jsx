const ServiceTable = ({ services, onDisable, onDelete }) => {
  return (
    <div>
      <h3 className="font-mono mb-3">Your Services</h3>

      {services.map((s) => (
        <div
          key={s.id}
          className="flex items-center justify-between border-b border-border py-2 text-sm"
        >
          <div>
            <b>{s.serviceName}</b> | {s.baseUrl} |{" "}
            {s.active ? "ACTIVE" : "DISABLED"}
          </div>

          <div className="flex gap-3">
            {s.active && (
              <button
                onClick={() => onDisable(s.id)}
                className="text-yellow-500"
              >
                Disable
              </button>
            )}

            <button
              onClick={() => onDelete(s.id)}
              className="text-red-500"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceTable;
