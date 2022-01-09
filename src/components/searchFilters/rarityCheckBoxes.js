export const Rarities = ({
  rarityChoices,
  raritiesBool,
  handleOnRarityChange,
}) => {
  return (
    <ul style={list}>
      {rarityChoices.map((rarity, index) => {
        return (
          <div key={index}>
            <li style={item}>
              <input
                type="checkbox"
                id={`custom-${index}`}
                name={rarity}
                value={rarity}
                checked={raritiesBool[index]}
                onChange={() => handleOnRarityChange(index, raritiesBool)}
              />
            </li>
            <label htmlFor={`custom-${index}`}>
              {rarity.includes("+") ? rarity.split("+").join(" ") : rarity}
            </label>
          </div>
        );
      })}
    </ul>
  );
};

const list = {
  display: "inline-flex",
  listStyle: "none",
  margin: "auto",
  padding: 0,
};

const item = {
  padding: "0 2em",
};
