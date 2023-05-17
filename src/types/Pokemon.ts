import { PokemonType } from "@/types/PokemonType";
import { PokemonImages } from "./PokemonImages";
export interface Pokemon {
	name: string;
	pokemonName: string;
	pokemonTypes: Array<string>;
	types: Array<PokemonType>;
	img: string;
	sprites: PokemonImages;
	url: string;
}