export const Cards = (props) => {
  const compareValues = (key, order) => {
    return function innersort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }

      const varA = typeof a[key] === "string" ? a[key].toLowerCase() : a[key];
      const varB = typeof b[key] === "string" ? b[key].toLowerCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return order === "desc" ? comparison * -1 : comparison;
    };
  };
  const sortedCards = props.cards.sort(
    compareValues(props.orderBy, props.orderType)
  );
  const displayCards = sortedCards.map((card, i) => {
    return (
      <div key={i}>
        <h1>{card.name}</h1>
        <h3>{card.setName}</h3>
        <img src={card.imageUrl} alt={card.name} />
      </div>
    );
  });
  return <div>{displayCards}</div>;
};

export const CardType = (props) => {
  return (
    <div>
      <select value={props.cardType} onChange={props.handleOnCardTypeChange}>
        {props.cardTypes.map((type) => {
          return (
            <option key={type} value={type}>
              {type}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export const Colors = ({ colorChoices, colorsBool, handleOnColorChange }) => {
  return (
    <ul style={list}>
      {colorChoices.map((color, index) => {
        return (
          <div key={index}>
            <li style={item}>
              <input
                type="checkbox"
                id={`custom-${index}`}
                name={color}
                value={color}
                checked={colorsBool[index]}
                onChange={() => handleOnColorChange(index, colorsBool)}
              />
            </li>
            <label htmlFor={`custom-${index}`}>{color}</label>
          </div>
        );
      })}
    </ul>
  );
};

export const FormatType = (props) => {
  return (
    <div>
      <select value={props.formatType} onChange={props.handleOnFormatChange}>
        {props.formatTypes.map((type) => {
          return (
            <option key={type} value={type}>
              {type}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export const LandTypes = ({
  reveal,
  landTypeChoices,
  landTypesBool,
  handleOnLandTypeChange,
}) => {
  if (reveal === "Land") {
    return (
      <ul style={list}>
        {landTypeChoices.map((type, index) => {
          return (
            <div key={index}>
              <li style={item}>
                <input
                  type="checkbox"
                  id={`custom-${index}`}
                  name={type}
                  value={type}
                  checked={landTypesBool[index]}
                  onChange={() => handleOnLandTypeChange(index, landTypesBool)}
                />
              </li>
              <label htmlFor={`custom-${index}`}>{type}</label>
            </div>
          );
        })}
      </ul>
    );
  }
  return <></>;
};

export const NameInput = (props) => {
  return (
    <div>
      <input
        placeholder="Name"
        type="text"
        value={props.value}
        onChange={props.handleOnNameChange}
      />
    </div>
  );
};

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
