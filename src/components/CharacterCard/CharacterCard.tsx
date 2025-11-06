import type { Character } from '../types';
import styles from './CharacterCard.module.scss';

interface CharacterCardProps {
  character: Character;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  return (
    <div className={styles.card}>
      <img
        src={character.image}
        alt={character.name}
        className={styles.cardImg}
        loading="lazy"
      />
      <div className={styles.cardInfo}>
        <h3 className={styles.cardName}>{character.name}</h3>
        <div className={styles.cardInfoItem}>
          <span>Gender</span>
          <span>{character.gender}</span>
        </div>
        <div className={styles.cardInfoItem}>
          <span>Species</span>
          <span>{character.species}</span>
        </div>
        <div className={styles.cardInfoItem}>
          <span>Status</span>
          <span>{status}</span>
        </div>
        <div className={styles.cardEpisode}>
          Appears in {character.episode.length} episodes
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
