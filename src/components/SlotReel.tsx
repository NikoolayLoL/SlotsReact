import React from "react";
import { motion } from "framer-motion";

interface SlotReelProps {
  items: string[];
  spinning: boolean;
  winningSymbols: boolean[];
}

const SlotReel: React.FC<SlotReelProps> = ({
  items,
  spinning,
  winningSymbols,
}) => {
  return (
    <motion.div className="reel">
      {items.map((item, index) => (
        <div
          key={index}
          className={`symbol ${winningSymbols[index] ? "win" : ""}`}
        >
          {item}
        </div>
      ))}
    </motion.div>
  );
};

export default SlotReel;
