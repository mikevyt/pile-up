import React from "react";
import { PlayingCard as PlayingCardType } from "../types/PlayingCard";
import { PlayingCard } from "./PlayingCard";

export const PlayingCardStack = ({ cards }: { cards: PlayingCardType[] }) => {
  return (
    <PlayingCard
      style={{
        boxShadow: "-3px 3px 0px 0px #D3D3D3",
        borderRadius: "8px",
      }}
      card={cards[0]}
    />
  );
};