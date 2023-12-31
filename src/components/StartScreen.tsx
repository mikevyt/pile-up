import { Button, Card, Input } from "antd";
import React from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { createPeer } from "../store/peer/peerActions";
import { AddCode } from "./AddCode";
import { AddPlayer } from "./AddPlayer";

export const StartScreen = () => {
  const peer = useAppSelector((state) => state.peer);
  const multiplayer = useAppSelector((state) => state.multiplayer);
  const connection = useAppSelector((state) => state.connection);
  const dispatch = useAppDispatch();

  const [name, setName] = React.useState("");
  const [emoji, setEmoji] = React.useState("");

  const handleCreateGame = async () => {
    await dispatch(createPeer({ name, emoji, isHost: true }));
  };

  const handleJoinGame = async () => {
    await dispatch(createPeer({ name, emoji, isHost: false }));
  };

  return (
    <Card title="PileUp!">
      {!peer.started ? (
        <div
          style={{
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            rowGap: "2rem",
          }}
        >
          <EmojiSelector value={emoji} onChange={setEmoji} />
          <Input
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <div style={{ display: "flex", columnGap: "2rem" }}>
            <Button
              onClick={handleCreateGame}
              disabled={!name}
              loading={peer.loading}
            >
              Create Game
            </Button>
            <Button
              onClick={handleJoinGame}
              disabled={!name}
              loading={peer.loading}
            >
              Join Game
            </Button>
          </div>
        </div>
      ) : multiplayer.host === peer.id || connection.list.length ? (
        <AddPlayer />
      ) : (
        <AddCode />
      )}
    </Card>
  );
};

export const EmojiSelector = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const emojis = React.useMemo(getEmojis, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridTemplateRows: "repeat(2, 1fr)",
        gap: "10px",
      }}
    >
      {emojis.map((emoji, i) => (
        <Button
          key={i}
          type={emoji === value ? "primary" : "dashed"}
          style={{ fontSize: "4rem", height: "4rem", width: "4rem" }}
          onClick={() => onChange(emoji)}
        >
          <div style={{ fontSize: "2rem" }}>{emoji}</div>
        </Button>
      ))}
    </div>
  );
};

const getEmojis = () => {
  const emojis = [
    "🦄",
    "🧚",
    "🧜",
    "🦖",
    "🚀",
    "🌈",
    "🌀",
    "🎭",
    "🧞",
    "🧛",
    "🕵️‍♂️",
    "🧟",
    "🤖",
    "🧘",
    "🤯",
    "🌌",
    "🌠",
    "🚁",
    "🎮",
    "🎨",
  ].sort(() => Math.random() - 0.5);

  return emojis.slice(0, 6);
};
