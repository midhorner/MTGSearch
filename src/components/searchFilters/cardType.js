export const CardType = (props) => {
  return (
    <div>
      <select value={props.cardType} onChange={props.handleOnCardChange}>
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
