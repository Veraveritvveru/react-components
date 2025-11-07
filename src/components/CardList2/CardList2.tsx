import React from 'react';
import styles from './CardList2.module.scss';
import CharacterCard from '../CharacterCard/CharacterCard';

import type { CardListProps } from '../types';

const CardList2: React.FC<CardListProps> = ({ results }) => {
  return (
    <section className={styles.cardList}>
      {results.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}{' '}
    </section>
  );
};

export default CardList2;
