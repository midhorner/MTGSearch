export const CardType = (props) => {
  return (
    <div>
      <div>
        <label htmlFor="cardType">Card Types</label>
      </div>
      <select
        id="cardType"
        value={props.cardType}
        onChange={props.handleOnCardTypeChange}
      >
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
    <div>
      <div>
        <label htmlFor="colorChoices">Colors</label>
      </div>
      <ul id="colorChoices" className="inline-flex">
        {colorChoices.map((color, index) => {
          return (
            <div key={index}>
              <li>
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
    </div>
  );
};

export const FormatType = (props) => {
  return (
    <div>
      <div>
        <label htmlFor="formatType">Format</label>
      </div>
      <select
        id="formatType"
        value={props.formatType}
        onChange={props.handleOnFormatChange}
      >
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
      <div>
        <div>
          <label htmlFor="landType">Land Type</label>
        </div>
        <ul id="landType">
          {landTypeChoices.map((type, index) => {
            return (
              <div key={index}>
                <li>
                  <input
                    type="checkbox"
                    id={`custom-${index}`}
                    name={type}
                    value={type}
                    checked={landTypesBool[index]}
                    onChange={() =>
                      handleOnLandTypeChange(index, landTypesBool)
                    }
                  />
                </li>
                <label htmlFor={`custom-${index}`}>{type}</label>
              </div>
            );
          })}
        </ul>
      </div>
    );
  }
  return <></>;
};

export const NameInput = (props) => {
  return (
    <div>
      <div>
        <label htmlFor="name">Card Name</label>
      </div>
      <input
        id="name"
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
    <div>
      <div>
        <label htmlFor="rarity">Rarity</label>
      </div>
      <ul id="rarity">
        {rarityChoices.map((rarity, index) => {
          return (
            <div key={index}>
              <li>
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
    </div>
  );
};
