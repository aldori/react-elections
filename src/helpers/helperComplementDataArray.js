export function helperComplementDataArray(array = [], arrayCandidates = []) {
  const totalVotes = array.reduce(function (acc, obj) {
    return acc + obj.votes;
  }, 0);

  const newArray = [];

  for (let i = 0; i < array.length; i++) {
    const percent = (array[i].votes * 100) / totalVotes;
    const candidate = arrayCandidates.find(
      (e) => e.id === array[i].candidateId
    );
    newArray.push({ ...array[i], percent: percent.toFixed(2), candidate });
  }
  return newArray.sort((a, b) => b.votes - a.votes);
}
