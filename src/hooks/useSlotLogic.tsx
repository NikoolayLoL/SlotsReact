// **Convert win messages into a readable emoji + count format**
const formatWinMessage = (symbol: string, count: number, isWild: boolean) => {
  const symbolName =
    {
      "🍎": "Apples",
      "🍋": "Lemons",
      "🍒": "Cherries",
      "🍉": "Watermelons",
      "⭐": "Stars",
      "🍇": "Grapes",
      "🔔": "Bells",
      "💎": "Wilds",
    }[symbol] || "Symbols";

  return isWild
    ? `Wild ${count} ${symbol} (${symbolName})`
    : `${symbol} ${count} ${symbolName}`;
};

// **Generate improved win messages**
const generateWinMessages = (
  winningSequences: { symbol: string; count: number; wild: boolean }[]
) => {
  const messages: string[] = [];
  winningSequences.forEach((win) => {
    messages.push(formatWinMessage(win.symbol, win.count, win.wild));
  });
  return messages;
};

// **Find wins & format them for display**
const findWins = (
  result: string[][]
): { winningSymbols: boolean[][]; winMessages: string[] } => {
  const winningSymbols = Array(6)
    .fill(null)
    .map(() => Array(3).fill(false));
  let winMessages: string[] = [];
  const winningSequences: { symbol: string; count: number; wild: boolean }[] =
    [];

  // **Check each symbol's neighbors for wins**
  for (let col = 0; col < 6; col++) {
    for (let row = 0; row < 3; row++) {
      const symbol = result[col][row];

      // **If already part of a win, skip further checking**
      if (winningSymbols[col][row]) continue;

      let count = 1;
      let wild = false;
      let positions = [{ col, row }];

      // **Check Right (Horizontal)**
      for (let i = 1; i < 5; i++) {
        const newCol = col + i;
        if (newCol >= 6) break;
        const neighbor = result[newCol][row];

        if (neighbor === symbol || neighbor === "💎") {
          if (neighbor === "💎") wild = true;
          count++;
          positions.push({ col: newCol, row });
        } else {
          break;
        }
      }

      if (count >= 3) {
        positions.forEach((pos) => (winningSymbols[pos.col][pos.row] = true));
        winningSequences.push({ symbol, count, wild });
      }

      // **Check Down (Vertical)**
      count = 1;
      positions = [{ col, row }];
      for (let i = 1; i < 3; i++) {
        const newRow = row + i;
        if (newRow >= 3) break;
        const neighbor = result[col][newRow];

        if (neighbor === symbol || neighbor === "💎") {
          if (neighbor === "💎") wild = true;
          count++;
          positions.push({ col, row: newRow });
        } else {
          break;
        }
      }

      if (count >= 3) {
        positions.forEach((pos) => (winningSymbols[pos.col][pos.row] = true));
        winningSequences.push({ symbol, count, wild });
      }

      // **Check Diagonal Left-to-Right (↘)**
      count = 1;
      positions = [{ col, row }];
      for (let i = 1; i < 3; i++) {
        const newCol = col + i;
        const newRow = row + i;
        if (newCol >= 6 || newRow >= 3) break;
        const neighbor = result[newCol][newRow];

        if (neighbor === symbol || neighbor === "💎") {
          if (neighbor === "💎") wild = true;
          count++;
          positions.push({ col: newCol, row: newRow });
        } else {
          break;
        }
      }

      if (count >= 3) {
        positions.forEach((pos) => (winningSymbols[pos.col][pos.row] = true));
        winningSequences.push({ symbol, count, wild });
      }

      // **Check Diagonal Right-to-Left (↙)**
      count = 1;
      positions = [{ col, row }];
      for (let i = 1; i < 3; i++) {
        const newCol = col - i;
        const newRow = row + i;
        if (newCol < 0 || newRow >= 3) break;
        const neighbor = result[newCol][newRow];

        if (neighbor === symbol || neighbor === "💎") {
          if (neighbor === "💎") wild = true;
          count++;
          positions.push({ col: newCol, row: newRow });
        } else {
          break;
        }
      }

      if (count >= 3) {
        positions.forEach((pos) => (winningSymbols[pos.col][pos.row] = true));
        winningSequences.push({ symbol, count, wild });
      }
    }
  }

  winMessages = generateWinMessages(winningSequences);
  return { winningSymbols, winMessages };
};

// **Export `checkWin` so it can be used in `SlotMachine.tsx`**
export function checkWin(result: string[][]) {
  return findWins(result);
}

// **Export `getSlotResults` to generate a slot spin**
export function getSlotResults(): string[][] {
  const items = ["🍎", "🍋", "🍒", "🍉", "⭐", "🍇", "🔔", "💎"]; // Symbols
  const result: string[][] = [];

  for (let col = 0; col < 6; col++) {
    const column: string[] = [];
    for (let row = 0; row < 3; row++) {
      column.push(items[Math.floor(Math.random() * items.length)]);
    }
    result.push(column);
  }
  return result;
}
