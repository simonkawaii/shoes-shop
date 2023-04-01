const dummyCard: React.FC = ({ cards }) => {
  return (
    <>
      {Array(cards)
        .fill(0)
        .map((e, index) => {
          return <div key={index} className="flex opacity-50 bg-red-800" />;
        })}
    </>
  );
};

export default dummyCard;
