import { useState } from 'react';
import './App.css';
import Board from './components/Board';
function App() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [xIsNext, setXIsNext] = useState(true);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      if (
        squares[lines[i][0]] &&
        squares[lines[i][0]] === squares[lines[i][1]] &&
        squares[lines[i][0]] === squares[lines[i][2]]
      )
        return squares[lines[i][0]];
    }
    return null;
  };
  const current = history[history.length - 1];
  const winner = calculateWinner(current.squares);

  let status;
  if (winner) status = 'Winner: ' + winner;
  else status = `Next player: ${xIsNext ? 'X' : 'O'}`;

  const handleClick = (i) => {
    const newSquares = current.squares.slice();

    if (newSquares[i] || winner) return;

    newSquares[i] = xIsNext ? 'X' : 'O';
    setHistory([...history, { squares: newSquares }]);

    setXIsNext((current) => !current);
  };

  const jumpTo = (move) => {
    const newHistory = history.slice(0, move);
    setHistory(newHistory);
    setXIsNext(newHistory.length % 2 ? true : false);
  };

  const moves = history.map((step, move) => {
    if (!move) return null;
    const desc = move - 1 ? 'Go to move #' + (move - 1) : 'Go to game start';
    return (
      <li key={move}>
        <button className='move-button' onClick={() => jumpTo(move)}>
          {desc}
        </button>
      </li>
    );
  });

  return (
    <div className='game'>
      <div className='game-board'>
        <Board status={status} squares={current.squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className='game-info'>
        <div className='status'>{status}</div>
        <ol style={{ listStyle: 'none' }}>{moves}</ol>
      </div>
    </div>
  );
}

export default App;
