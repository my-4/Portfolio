import React from "react";

const designCategories = [
  { id: 1, label: "交互设计", top: "244px" },
  { id: 2, label: "服务设计", top: "354px" },
  { id: 3, label: "产品设计", top: "447px" },
  { id: 4, label: "视觉设计", top: "540px" },
];

const portfolioCards = [
  { id: 1, left: "115px" },
  { id: 2, left: "478px" },
  { id: 3, left: "840px" },
];

export const MacbookAir = (): JSX.Element => {
  return (
    <div className="bg-white w-full min-w-[1280px] min-h-[2201px] relative">

      <div className="absolute top-[25px] left-[105px] w-[469px] h-[687px] aspect-[0.68] bg-gray-100" />

      <p className="absolute top-[329px] left-[584px] font-sans font-thin text-black text-[40px] tracking-[4.00px] leading-[50.3px]">
        欢迎来到我的房间，
        <br />
        在此进行自由的探索吧！
      </p>

      <h1 className="absolute top-[913px] left-[105px] w-[535px] font-sans font-normal text-black text-[64px] tracking-[6.40px] leading-[80.5px]">
        精选作品墙
      </h1>

      {designCategories.map((category) => (
        <div
          key={category.id}
          className="absolute left-[254px] font-sans font-normal text-[#f2555099] text-[40px] tracking-[4.00px] leading-[50.3px] whitespace-nowrap"
          style={{ top: category.top }}
        >
          {category.label}
        </div>
      ))}

      {portfolioCards.map((card) => (
        <div
          key={card.id}
          className="w-[325px] absolute top-[1036px] h-[194px] bg-[#d9d9d9] rounded-[23px]"
          style={{ left: card.left }}
          role="article"
          aria-label={`Portfolio item ${card.id}`}
        />
      ))}
    </div>
  );
};
