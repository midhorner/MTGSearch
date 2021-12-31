const RenderCard = ({ card }) => {
  return (
    <>
      <h1>{card.name}</h1>
      <img src={card.imageUrl} alt={card.name} />
    </>
  );
};

const Card = (props) => {
  const displayCards = props.cards.map((card, i) => {
    return (
      <div key={i}>
        <RenderCard card={card} />
      </div>
    );
  });
  return <div>{displayCards}</div>;
};

export default Card;
