import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from 'next/router';

import styles from '../styles/pokemon.module.scss';

export default function Home(pokemon) {
  console.log(pokemon);
  
  const router = useRouter();
  if (router.isFallback) {
    return (
      <div>
        <img src="/pokemon-logo.png"/>
      </div>
    );
  }
  
  return (
    <div className={styles.containerPokemon}>
      <div className={styles.nameId}>
        <h1>{pokemon.name}</h1>
        <h1>#{("000" + pokemon.number).slice(-3)}</h1>
      </div>
      <div className={styles.pokemonImage}>
        <img src={pokemon.img} alt={pokemon.name}/>
      </div>
      <div className={styles.types}>
        {pokemon.types.map(type => {
          return <span key={type}>{type}</span>
        })}
      </div>
      <div className={styles.info}>
        <div className={styles.measures}>
          <h2>Measures</h2>
          <span>Weight: {pokemon.weight}</span>
          <span>Height: {pokemon.height}</span>
        </div>
        <div className={styles.abilities}>
          <h2>Abilities</h2>
          {pokemon.abilities.map(ability => {
            return <span key={ability}>{ability}</span>
          })}
        </div>
      </div>
      <div className={styles.containerStats}>
        <h2>Stats</h2>
        <div className={styles.stats}>
          {pokemon.stats.map(stat => {
            return (
              <div className={styles.stat} key={stat.name}>
                <span>{stat.name}: {stat.value}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}
export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=20");
  const { results } = await response.json();
  const paths = results.map(pokemon => {
    return {
      params: {
        pokemon: pokemon.name
      }
    }
  });
  return {
    paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { pokemon } = ctx.params;
  
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon);
  const data = await response.json();
  if(data.sprites.other.dream_world.front_default === null) {
    data.sprites.other.dream_world.front_default = data.sprites.front_default;
  }

  const props = {
    name: data.name,
    number: data.id,
    types: data.types.map(type => {return type.type.name}),
    img: data.sprites.other.dream_world.front_default,
    abilities: data.abilities.map(ability => {return ability.ability.name}),
    height: data.height,
    weight: data.weight,
    stats: data.stats.map(stat => {
      return {
        value: stat.base_stat,
        name: stat.stat.name
      }
    })

  }
  return {
    props,
    revalidate: 60 * 60 * 24, //24 hours
  }
}
