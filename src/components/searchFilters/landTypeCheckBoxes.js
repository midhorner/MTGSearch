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

const list = {
  display: "inline-flex",
  listStyle: "none",
  margin: "auto",
  padding: 0,
};

const item = {
  padding: "0 2em",
};
