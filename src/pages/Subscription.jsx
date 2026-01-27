import React from "react";

const plans = [
  {
    name: "Free Trial",
    price: "₹0",
    duration: "30 Days",
    features: [
      "Basic Monitoring",
      "3 Services Limit",
      "Email Alerts",
      "Community Support",
    ],
    highlight: false,
  },
  {
    name: "Pro",
    price: "₹499/mo",
    duration: "Best for Devs",
    features: [
      "Unlimited Services",
      "AI Failure Prediction",
      "Priority Alerts",
      "Performance Analytics",
    ],
    highlight: true,
  },
  {
    name: "Premium",
    price: "₹999/mo",
    duration: "Enterprise Ready",
    features: [
      "Everything in Pro",
      "Team Collaboration",
      "Custom Integrations",
      "24/7 Priority Support",
    ],
    highlight: false,
  },
];

const Subscription = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050b2c] via-[#020617] to-black text-white p-10">

      <h1 className="text-4xl font-bold text-center mb-4">
        Choose Your Plan 🚀
      </h1>
      <p className="text-center text-white/60 mb-12">
        Scale your monitoring power with ObserveX
      </p>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`relative rounded-xl p-8 border transition-all duration-300 
              backdrop-blur-lg bg-white/5 
              hover:scale-105 hover:shadow-2xl
              ${
                plan.highlight
                  ? "border-cyan-400 shadow-cyan-500/20 shadow-xl"
                  : "border-white/10"
              }`}
          >
            {plan.highlight && (
              <div className="absolute -top-3 right-4 bg-cyan-400 text-black text-xs font-bold px-3 py-1 rounded-full">
                MOST POPULAR
              </div>
            )}

            <h2 className="text-2xl font-semibold mb-2">{plan.name}</h2>
            <p className="text-3xl font-bold mb-1">{plan.price}</p>
            <p className="text-sm text-white/60 mb-6">{plan.duration}</p>

            <ul className="space-y-2 mb-8 text-sm text-white/80">
              {plan.features.map((f, i) => (
                <li key={i}>✔ {f}</li>
              ))}
            </ul>

            <button
              className={`w-full py-2 rounded-md font-bold transition-all duration-300
                ${
                  plan.highlight
                    ? "bg-cyan-400 text-black hover:bg-cyan-300 hover:shadow-lg hover:shadow-cyan-400/40"
                    : "bg-white/10 hover:bg-white/20"
                }`}
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscription;
