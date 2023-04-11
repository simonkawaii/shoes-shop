const dummyCard: React.FC = ({ cards }: any) => {
  return (
    <>
      {Array(cards)
        .fill(0)
        .map((e, index) => {
          return (
            // eslint-disable-next-line react/self-closing-comp
            <div
              className="flex flex-col animate-pulse opacity-0"
              key={index}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className=" bg-gray-400 rounded-md  w-74 h-52  text-transparent " />
              <div className="flex flex-col gap-3 mt-3">
                <span className=" bg-gray-400  rounded-sm  w-full h-5  text-transparent " />
                <span className=" bg-gray-400 rounded-sm  w-full h-5  text-transparent" />
                <span className=" bg-gray-400 rounded-sm  w-full h-5  text-transparent " />
              </div>
            </div>
          );
        })}
    </>
  );
};

export default dummyCard;
