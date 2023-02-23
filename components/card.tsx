import * as React from "react";
import { useDrag } from 'react-dnd'
import type { RootState } from "../store/store"
import { addToCart, removeFromCart, incrementItemInCart,modifyItemsInCart } from '../store/features/cartSlice'
import { useDispatch, useSelector } from "react-redux";


function Card(props:any) {

const dispatch = useDispatch()
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "div",
    item: {id: props.id, title: props.title},
    collect: (watching) => ({
      isDragging: !!watching.isDragging(),
    }),
  }), []);

  return (
    <div 
    ref={drag}
    className={`relative bg-amber-600 flex justify-center items-center duration-100 hover:cursor-grab h-48 ${isDragging && ' scale-110'} `}>
     <button
     onClick={()=>{
dispatch(addToCart({id:props.id,title:props.title}))
     }}
     className="absolute right-2 top-2 z-20 h-5 w-5 bg-blue-600 flex justify-center items-center text-red-100">+</button>
      <h1>
        {props.title}
        {/* <img className="rounded-lg pointer-events-none " src="https://unsplash.it/300/300" alt="" /> */}
      </h1>

    </div>
  );
}

export default Card;
