import Image from "next/image";
import React from "react";

export default function ProductHuntBadge() {
  const badgeLoader = () => {
    return `https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=377056&theme=dark`
  }
  
  return (
    <div className="flex justify-center items-start mt-2 sm:mt-0">
      <a
        href="https://www.producthunt.com/posts/hermes-markdown?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-hermes&#0045;markdown"
        target="_blank"
      >
        <Image
          loader={badgeLoader}
          src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=587597&theme=neutral"
          alt="Hermes&#0032;Markdown - Write&#0044;&#0032;Edit&#0044;&#0032;and&#0032;Export&#0032;Markdown&#0046;&#0032;Your&#0032;Way&#0046; | Product Hunt"
          style={{ width: "250px", height: "54px" }}
          width="250"
          height="54"
        />
      </a>
    </div>
  );
}
