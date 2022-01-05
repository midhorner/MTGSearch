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
