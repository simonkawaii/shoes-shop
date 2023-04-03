const dummyCard: React.FC = ({ cards }: any) => {
  return (
    <>
      {Array(cards)
        .fill(0)
        .map((e, index) => {
          return (
            // eslint-disable-next-line react/self-closing-comp
            <div
              key={index}
              className=" bg-gray-400 rounded-md animate-pulse w-74 h-52  text-transparent opacity-0"
              style={{ animationDelay: `${index * 0.05}s` }}
            ></div>
          );
        })}
    </>
  );
};

export default dummyCard;
