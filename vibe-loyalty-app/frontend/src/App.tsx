import React, { useState } from "react";

// TypeScript declaration for Vite's import.meta.env
// (Removed custom ImportMeta and ImportMetaEnv interfaces to avoid conflicts with Vite's types)

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api/loyalty";

function App() {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [customer, setCustomer] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const checkIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setCustomer(null);
    try {
      const res = await fetch(`${API_URL}/checkin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, name }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Check-in failed");
      setCustomer(data);
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1>Vibe Loyalty App</h1>
      <form onSubmit={checkIn}>
        <input
          type="text"
          placeholder="Phone number"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          required
          style={{ width: "100%", marginBottom: 8 }}
        />
        <input
          type="text"
          placeholder="Name (optional)"
          value={name}
          onChange={e => setName(e.target.value)}
          style={{ width: "100%", marginBottom: 8 }}
        />
        <button type="submit" disabled={loading} style={{ width: "100%" }}>
          {loading ? "Checking in..." : "Check In"}
        </button>
      </form>
      {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
      {customer && (
        <div style={{ marginTop: 16, background: "#f0f0f0", padding: 16, borderRadius: 8 }}>
          <h2>Welcome, {customer.name || customer.phone}!</h2>
          <p>Visits: {customer.visits}</p>
          <p>Points: {customer.points}</p>
          <p>Rewards Earned: {customer.rewards}</p>
        </div>
      )}
    </div>
  );
}

export default App;