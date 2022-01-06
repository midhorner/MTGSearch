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
