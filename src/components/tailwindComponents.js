export const CheckBoxInput = (props) => {
  return (
    <div className="py-4">
      <div>
        <label htmlFor={props.id}>{props.id}</label>
      </div>
      <ul id={props.id} className="flex">
        {props.choiceArray.map((choice, index) => {
          return (
            <div key={choice} className="flex justify-middle">
              <li className="pr-2">
                <input
                  type="checkbox"
                  id={choice}
                  name={choice}
                  value={choice}
                  checked={props.boolArray[index]}
                  onChange={() => props.handleOnChange(index, props.boolArray)}
                />
              </li>
              <label htmlFor={choice} className="pr-4">
                {choice}
              </label>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
