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
      <div key={i} className="flex-row py-2 max-w-4xl">
        <img src={card.imageUrl} alt={card.name} className="w-40" />
        <div className="pl-4">
          <div className="text-lg">{card.name}</div>
          <div>{card.setName}</div>
          <p>{card.text}</p>
        </div>
      </div>
    );
  });
  return <div>{displayCards}</div>;
};
