export function PersonalityTraits({ traits }: { traits: string[] }) {
  return (
    <ul className="traits" aria-label="Personality traits">
      {traits.map((trait) => (
        <li key={trait}>{trait}</li>
      ))}
    </ul>
  );
}
