import Link from 'next/link';

import styles from './styles.module.scss';

type PokemonProps = {
  name: string;
  number: number;
  types: string[];
  img: string;
}
type Pokemon = {
  pokemon: PokemonProps
}
export default function Card ({ pokemon }: Pokemon) {
  const number = pokemon.number;
  return (
    <>
      {number ? (
        <div className={styles.card}>
          <div className={styles.header}>
            <Link href={'/[pokemon]'} as={`/${pokemon.name}`}>
              <h2>{pokemon.name}</h2>
            </Link>
            <span>#{("000" + pokemon.number).slice(-3)}</span>
          </div>
          <div className={styles.main}>
            <div className={styles.types}>
              {pokemon.types.map(type => {
                return <span key={type} className={styles.type}>{type}</span>
              })}
            </div>
            <img src={pokemon.img} alt={pokemon.name}/>
          </div>
        </div>
      ) : (
        <div className={styles.empty}>Nada por aqui...</div>
      )}
    </>
  );
}
