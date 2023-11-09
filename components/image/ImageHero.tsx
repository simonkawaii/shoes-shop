import React, { useState, FC } from "react";
import Image from "next/image";
import styles from "../../styles/swiperStyles.module.css";
type props = {
  image: string;
};

const ImageComponent: FC<props> = ({ image }) => {
  const [loaded, setLoaded] = useState<boolean>(false);

  const altImg = (imageText: string): string => {
    if (!imageText) return "desc";
    const str = [imageText.split("/").at(-1)][0];
    return str ? str : "desc";
  };

  return (
    <Image
      style={{
        aspectRatio: "16/9",
        objectFit: "contain",
      }}
      sizes="100vw"
      height={0}
      fill
      width={0}
      className={styles.hero}
      src={image}
      onLoad={() => setLoaded(true)}
      alt={altImg(image)}
      loading="lazy"
    />
  );
};

export default ImageComponent;
