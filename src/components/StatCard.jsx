const StatCard = ({ title, value, change }) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <p className="text-xs text-white/60">{title}</p>
      <h2 className="text-2xl font-bold text-cyan-400 mt-1">{value}</h2>
      <p className="text-xs text-green-400 mt-2">↑ {change}</p>
      <div className="mt-3 h-1 bg-cyan-500/40 rounded" />
    </div>
  );
};

export default StatCard;
