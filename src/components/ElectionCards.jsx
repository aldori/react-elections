import NumberFormatter from './NumberFormatter';

export default function ElectionsCards({
  children: electionsCards,
  city = "Município",
  votingPopulation = 0,
  absence = 0,
  presence = 0,
  candidates = 0,
}) {
  return (
    <div className="border p-2 flex flex-col items-center justify-center flex-wrap">
      <h2 className="text-center font-semibold text-lg">Eleição em {city}</h2>
      <div className="flex flex-row">
        <label className="m-5">
          <b>Total de Eleitores:</b>
          <NumberFormatter>{" " + votingPopulation}</NumberFormatter>
        </label>
        <label className="m-5">
          <b>Abstenções:</b>
          <NumberFormatter>{" " + absence}</NumberFormatter>
        </label>
        <label className="m-5">
          <b>Comparecimento:</b>
          <NumberFormatter>{" " + presence}</NumberFormatter>
        </label>
      </div>
      <label className="font-semibold">{candidates} candidatos</label>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">{electionsCards}</div>
    </div>
  );
}
