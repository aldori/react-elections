import Avatar from './Avatar';
import Elected from './Elected';
import NumberFormatter from './NumberFormatter';
import Percentage from './Percentage';

export default function ElectionCard({
  id,
  candidate = undefined,
  votes = 0,
  percent = "0,00",
  elected = false,
}) {

  const imageUrl = `/img/${candidate.username}.png`;
  const percentage = percent / 100;

  return (
    <div className="shadow-lg w-64 h-64 m-2 flex flex-col justify-evenly">
      <div className="flex flex-row items-center justify-between p-4">
        <Avatar imageUrl={imageUrl} description={candidate.name} />

        <div className="flex flex-col items-center">
          <Percentage elected>{percentage}</Percentage>

          <div className="text-sm">
            <NumberFormatter>{votes}</NumberFormatter> votos
          </div>
        </div>
      </div>

      <div className="text-2xl text-center">{candidate.name}</div>

      <Elected elected={elected} />
    </div>
  );
}
