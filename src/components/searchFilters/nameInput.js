export const NameInput = (props) => {
  return (
    <div>
      <input
        placeholder="Name"
        type="text"
        value={props.value}
        onChange={props.change}
      />
    </div>
  );
};
