import { read } from "./httpService";

export async function apiGetAllCities() {
  return await read("/cities");
}

export async function apiGetAllCandidates() {
  return await read("/candidates");
}

export async function apiGetElectionByCity(citiId) {
  return await read(`/election?cityId=${citiId}`);
}

export async function apiGetElectionByCanditate(candidateId) {
  return await read(`/election?candidateId=${candidateId}`);
}
