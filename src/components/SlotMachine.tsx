import React, { useState } from "react";
import SlotReel from "./SlotReel";
import { getSlotResults, checkWin } from "../hooks/useSlotLogic";
import "../styles/SlotMachine.css";

const SlotMachine: React.FC = () => {
  const [spinning, setSpinning] = useState(false);
  const [debugMode, setDebugMode] = useState(false);
  const [result, setResult] = useState(getSlotResults());
  const [winMessages, setWinMessages] = useState<string[]>([]);
  const [winningSymbols, setWinningSymbols] = useState(
    Array(6).fill(Array(3).fill(false))
  );

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setWinMessages([]); // Reset win messages on spin

    const tries = 3;
    let count = 0;

    const interval = setInterval(() => {
      const newResult = getSlotResults();
      setResult(newResult);
      count++;
      if (count >= tries) {
        clearInterval(interval);
        const { winMessages, winningSymbols } = checkWin(newResult);
        setWinMessages(winMessages);
        setWinningSymbols(winningSymbols);
        setSpinning(false);
      }
    }, 300);
  };

  return (
    <>
      {/* Debug Bar (Fixed at the Top) */}
      {debugMode && (
        <div className="debug-bar">
          {winMessages.length > 0 ? (
            winMessages.map((msg, i) => (
              <p key={i} className="debug-message">
                {msg}
              </p>
            ))
          ) : (
            <p className="debug-message">No Wins</p>
          )}
        </div>
      )}

      {/* Win Messages Container (Now Positioned Below Debug Bar) */}
      <div className="win-container">
        {winMessages.length > 0 ? (
          winMessages.map((msg, i) => (
            <p key={i} className="win-message">
              {msg}
            </p>
          ))
        ) : (
          <p className="win-message no-win">No Wins</p>
        )}
      </div>

      {/* Main Slot Machine Container */}
      <div className="slot-machine-container">
        {/* Slot Machine */}
        <div className="slot-machine">
          <div className="slot-container">
            {result.map((column, index) => (
              <SlotReel
                key={index}
                items={column}
                spinning={spinning}
                winningSymbols={winningSymbols[index]}
              />
            ))}
          </div>
          <button onClick={spin} disabled={spinning} className="spin-button">
            Spin!
          </button>
        </div>
      </div>

      {/* Debug Toggle Menu (Fixed at the Bottom) */}
      <div className="debug-toggle">
        <label className="toggle-label">
          <input
            type="checkbox"
            checked={debugMode}
            onChange={() => setDebugMode(!debugMode)}
          />
          Debug Mode
        </label>
      </div>
    </>
  );
};

export default SlotMachine;
