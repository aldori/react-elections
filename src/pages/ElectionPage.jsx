import { useEffect, useState } from "react";

import { Menu } from "@headlessui/react";

import Dropdown from "../components/Dropdown";
import Header from "../components/Header";
import Main from "../components/Main";

import { helperComplementDataArray } from "../helpers/helperComplementDataArray";

import {
  apiGetAllCities,
  apiGetElectionByCity,
  apiGetAllCandidates,
} from "../services/apiService";
import ElectionCards from "../components/ElectionCards";
import ElectionCard from "../components/ElectionCard";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function ElectionPage() {
  const [allCities, setAllCities] = useState([]);
  const [activeCity, setActiveCity] = useState(undefined);
  const [candidates, setCandidates] = useState([]);
  const [votes, setVotes] = useState([]);

  async function handleClickCity(event) {
    await getElectionByCity(event.target.value);
  }

  async function getElectionByCity(cityId) {
    try {
      const electionByCity = await apiGetElectionByCity(cityId);
      const selectedCity = allCities.find((e) => e.id === cityId);
      setActiveCity(selectedCity);
      const votesByCity = helperComplementDataArray(electionByCity, candidates);
      setVotes(votesByCity);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function getAllCities() {
      try {
        const backEndAllCities = await apiGetAllCities();

        setAllCities(backEndAllCities);
      } catch (error) {
        console.log(error);
      }
    }

    getAllCities();
  }, []);

  useEffect(() => {
    async function getAllCandidates() {
      try {
        const backEndAllCandidates = await apiGetAllCandidates();

        setCandidates(backEndAllCandidates);
      } catch (error) {
        console.log(error);
      }
    }
    getAllCandidates();
  }, []);

  return (
    <div>
      <Header>react-elections</Header>
      <div className="flex items-center justify-center mt-4">
        <Dropdown
          activeCity={activeCity}
          allCities={allCities}
          title="Escolha o município"
        >
          {allCities.map((city) => {
            return (
              <Menu.Item>
                {({ active }) => (
                  <button
                    key={city.id}
                    onClick={handleClickCity}
                    value={city.id}
                    className={classNames(
                      active
                        ? "bg-gray-100 text-gray-900 w-full"
                        : "text-gray-700 w-full",
                      "block px-4 py-2 text-sm w-full"
                    )}
                  >
                    {city.name}
                  </button>
                )}
              </Menu.Item>
            );
          })}
        </Dropdown>
      </div>
      <Main>
        <div className="container mx-auto p-4">
          {activeCity ? (
            <ElectionCards
              absence={activeCity.absence}
              city={activeCity.name}
              presence={activeCity.presence}
              votingPopulation={activeCity.votingPopulation}
              candidates={candidates.length}
            >
              {votes.map((vote, index) => {
                return (
                  <ElectionCard
                    key={vote.id}
                    id={vote.id}
                    candidate={vote.candidate}
                    percent={vote.percent}
                    elected={index === 0}
                    votes={vote.votes}
                  />
                );
              })}
            </ElectionCards>
          ) : (
            ""
          )}
        </div>
      </Main>
    </div>
  );
}
