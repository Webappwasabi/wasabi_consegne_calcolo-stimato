
import { useState } from "react";

export default function ConsegneRider() {
  const [ordini, setOrdini] = useState([]);
  const [fase, setFase] = useState({});
  const [tipoAttesa, setTipoAttesa] = useState("");
  const [consegneNelGiro, setConsegneNelGiro] = useState(1);

  const registraOra = (campo) => {
    setFase((prev) => ({ ...prev, [campo]: new Date().toLocaleTimeString("it-IT", { hour: '2-digit', minute: '2-digit' }) }));
  };

  const salvaOrdine = () => {
    if (!fase.ordine || !fase.uscita || !fase.rientro || !tipoAttesa) return alert("Completa tutti i campi");
    const nuovoOrdine = {
      numero: ordini.length + 1,
      ...fase,
      tipoAttesa,
      consegneNelGiro
    };
    setOrdini([...ordini, nuovoOrdine]);
    setFase({});
    setTipoAttesa("");
    setConsegneNelGiro(1);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Registrazione Consegne</h1>

      <div className="grid grid-cols-1 gap-3 mb-4">
        <button onClick={() => registraOra("ordine")} className="bg-blue-500 text-white py-2 px-4 rounded">
          📥 Registra ora ricezione ordine
        </button>
        <button onClick={() => registraOra("uscita")} className="bg-green-500 text-white py-2 px-4 rounded">
          🚴‍♂️ Registra uscita rider
        </button>
        <button onClick={() => registraOra("rientro")} className="bg-yellow-500 text-white py-2 px-4 rounded">
          🏠 Registra rientro rider
        </button>

        <div>
          <label className="block mb-1">Tipo di attesa</label>
          <select value={tipoAttesa} onChange={(e) => setTipoAttesa(e.target.value)} className="w-full p-2 border rounded">
            <option value="">Seleziona</option>
            <option value="Ordine">Ordine</option>
            <option value="Rider">Rider</option>
            <option value="Nessuna">Nessuna</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Consegne fatte nel giro</label>
          <input type="number" min={1} value={consegneNelGiro} onChange={(e) => setConsegneNelGiro(Number(e.target.value))} className="w-full p-2 border rounded" />
        </div>

        <button onClick={salvaOrdine} className="bg-purple-600 text-white py-2 px-4 rounded mt-2">
          💾 Salva ordine
        </button>
      </div>

      <h2 className="text-xl font-semibold mt-6 mb-2">Ordini registrati</h2>
      <ul className="space-y-2">
        {ordini.map((o, i) => (
          <li key={i} className="border p-2 rounded shadow-sm">
            <strong>#{o.numero}</strong> - Ordine: {o.ordine}, Uscita: {o.uscita}, Rientro: {o.rientro} <br/>
            Attesa: {o.tipoAttesa} - Consegne: {o.consegneNelGiro}
          </li>
        ))}
      </ul>
    </div>
  );
}
