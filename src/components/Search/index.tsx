import { useEffect, useRef, useState } from 'react';
import Card from '../Card';
import styles from './styles.module.scss';

type PokemonProps = {
  name: string;
  number: number;
  types: [];
  img: string;
}

export default function Search () {  
  const [search, setSearch] = useState('1');
  const [pokemon, setPokemon] = useState<PokemonProps>({
    name: '',
    number: undefined,
    types: [],
    img: ''
  });
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function getPokemon() {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + search);
      if(response.ok){
        const tempPokemon = await response.json();
        if(tempPokemon.sprites.other.dream_world.front_default === null) {
          tempPokemon.sprites.other.dream_world.front_default = tempPokemon.sprites.front_default;
        }
        const resultSearch = {
          name: tempPokemon.name,
          number: tempPokemon.id,
          types: tempPokemon.types.map(type => {return type.type.name}),
          img: tempPokemon.sprites.other.dream_world.front_default
        }
        setPokemon(resultSearch);
      }
    }
    getPokemon();
  }, [search]);

  return (
    <>
      <div className={styles.searchContainer}>
        <img src="/pokemon-logo.png" className={styles.pikachu}/>
        <h1>Quem é esse Pokémon?</h1>
        <div>
          <input
            ref={searchRef}
            type="text"
            placeholder="Encontre o Pokémon por número ou nome"
            onKeyDown={(ev) => {ev.key === 'Enter' && setSearch(searchRef.current.value)}}
          />
          <img src="/search.png" onClick={() => {setSearch(searchRef.current.value)}}/>
        </div>
      </div>
      <div className={styles.resultContainer}>
        <Card pokemon={pokemon}/>
      </div>
    </>
  );
}