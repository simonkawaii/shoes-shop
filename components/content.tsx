import { useSelector } from "react-redux";
import cartSlice from "../store/features/cartSlice";
import { RootState } from "../store/store";
import Card from "./card";

const dummyList = [
  {
    title: "a",
    id: 1,
  },
  {
    title: "b",
    id: 2,
  },
  {
    title: "c",
    id: 3,
  },
  {
    title: "d",
    id: 4,
  },
  {
    title: "uwu",
    id: 5,
  },
];
export interface TproductCard {
  title: string;
  id: number;
}

const Content: React.FC = () => {
  const renderList = dummyList.map(({ title, id }) => {
    return <Card title={title} id={id} key={id} />;
  });

  const cartContainer = useSelector((state: RootState) => state.cart);
  const { cartItems } = cartContainer;
  console.log(cartItems);

  return (
    <section className="grid w-full h-full grid-cols-3 gap-5 m-5">
      {renderList}
    </section>
  );
};

export default Content;
