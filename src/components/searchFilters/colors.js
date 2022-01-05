export const Colors = ({ colorChoices, colorsBool, handleOnChange }) => {
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
                onChange={() => handleOnChange(index)}
              />
            </li>
            <label htmlFor={`custom-${index}`}>{color}</label>
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
  padding: "0 1em",
};
