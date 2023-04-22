import React, { FC } from "react";

const dummyCard: FC<any> = (cards: number) => {
  return (
    <>
      {Array(cards)
        .fill(0)
        .map((index) => {
          return (
            // eslint-disable-next-line react/self-closing-comp
            <div
              className="flex animate-pulse flex-col opacity-0"
              key={index}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className=" w-74 h-52  rounded-md bg-gray-400  text-transparent " />
              <div className="mt-3 flex flex-col gap-3">
                <span className=" h-5  w-full  rounded-sm bg-gray-400  text-transparent " />
                <span className=" h-5 w-full  rounded-sm bg-gray-400  text-transparent" />
                <span className=" h-5 w-full  rounded-sm bg-gray-400  text-transparent " />
              </div>
            </div>
          );
        })}
    </>
  );
};

export default dummyCard;
