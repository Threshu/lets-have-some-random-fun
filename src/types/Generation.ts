import { Pokemon } from "./Pokemon";

export interface Generation {
	id: number;
	name: string;
	url: string;
	pokemon_species: Array<Pokemon>;
	numberOfPokemons: number;
}