import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useEffect } from "react";
import ContentWrapper from "../../components/content/ContentWrapper";
import { MyPage } from "../../components/common/types";

const cartPage: MyPage = () => {
  const cartContainer = useSelector((state: RootState) => state.cart);
  const { cartItems } = cartContainer;

  //use state and use effect to avoid hydration error caused by MUI badgeContent
  const [readCart, setReadCart] = React.useState<any[]>([]);

  useEffect(() => {
    setReadCart(cartItems);
    console.log("lol");
    console.log(cartItems);
  }, [cartContainer]);

  return (
    <ContentWrapper>
      {readCart?.map(({ title, cartQuantity, id }) => {
        return (
          <div key={id} className="flex  gap-5">
            <h1>{title} </h1>
            <h4>amount:{cartQuantity} </h4>
          </div>
        );
      })}
      {/* {results && renderContent}
        {isLoading && <DummyCard cards={10} />}
  
        {isError && <p>{error}</p>} */}
    </ContentWrapper>
  );
};

export default cartPage;

cartPage.Layout = "Main";
