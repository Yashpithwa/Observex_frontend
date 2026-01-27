import { useState } from "react";

const GooeyNav = ({
  items = [],
  onItemClick,
  vertical = false,
  initialActiveIndex = 0,
  colors = ["#00C2E0"],
}) => {
  const [active, setActive] = useState(initialActiveIndex);

  const palette = colors;
  const getColor = (i) => palette[i % palette.length];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: vertical ? "column" : "row",
        gap: "16px",
      }}
    >
      {items.map((item, index) => (
        <div
          key={index}
          onClick={() => {
            setActive(index);
            onItemClick && onItemClick(index);
          }}
          style={{
            padding: "12px 18px",
            borderRadius: "14px",
            cursor: "pointer",
            background:
              active === index
                ? `linear-gradient(135deg, ${getColor(index)}, #0ea5e9)`
                : "rgba(255,255,255,0.04)",
            color: active === index ? "#041028" : "#cbd5e1",
            boxShadow:
              active === index
                ? `0 0 20px ${getColor(index)}66`
                : "none",
            fontWeight: 500,
            transition: "all 0.3s ease",
            backdropFilter: "blur(6px)",
          }}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};

export default GooeyNav;
