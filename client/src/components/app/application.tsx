import React, { useEffect, useState } from "react";
import { ProgressIndicator } from "./progressIndicator";

interface Settlement {
  id: number;
  department: string;
  balance: Record<string, number>; //fordi den inneholder både string og int
}

async function fetchSettlements(): Promise<Settlement[]> {
  const res = await fetch("/api/settlements");
  if (!res.ok) {
    throw new Error(
      "Server returned error" + res.status + " " + res.statusText,
    );
  }
  return await res.json();
}

export function Application() {
  const [settlements, setSettlements] = useState<Settlement[]>([]); //Må da lage et interface for settlementsa
  const [loading, setLoading] = useState(true);

  async function loadSettlements() {
    setLoading(true); //Starte refresg = true
    setSettlements([]); // Bruker denne for at Refresh knappen skal være synlig, den blanker ut innholdet

    try {
      // Har ikke lagt til simulateError - fra forelesning 24.09 -økt 2 - 30min ish
      const settlements = await fetchSettlements(); //istedenfor å bruke .then ...
      setSettlements(settlements);
    } finally {
      setLoading(false); //slutte refresg = false
    }
  }

  useEffect(() => {
    loadSettlements();
  }, []);

  return (
    <>
      <h1>Innleverings Oppgave</h1>
      {loading && <ProgressIndicator />}
      {settlements.map((s) => (
        <div key={s.id}>{s.department}</div>
      ))}
      <div>
        <button onClick={() => loadSettlements()}>Refresh</button>
      </div>
    </>
  );
}
