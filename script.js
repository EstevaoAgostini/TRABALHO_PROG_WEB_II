// script.js

const startBtn = document.getElementById("start-button");
const mazeDiv = document.getElementById("maze");
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const endScreen = document.getElementById("end-screen");

const size = 20;
let currentLevel = 0;
let playerPos = { row: 1, col: 1 };

// Labirintos (0 = livre, 1 = parede, 2 = saída)
const mazes = [
  // Fase 1
  [
    // 20x20 matriz...
    // Borda = parede (1), caminhos internos com saída marcada como 2
    // Exemplo simples:
    ...Array(20).fill(null).map((_, row) =>
      Array(20).fill(null).map((_, col) =>
        row === 0 || col === 0 || row === 19 || col === 19
          ? 1
          : (row === 18 && col === 18 ? 2 : 0)
      )
    ),
  ],
  // Fase 2 (pode ser diferente)
  [...Array(20).fill(null).map((_, row) =>
    Array(20).fill(null).map((_, col) =>
      row === 0 || col === 0 || row === 19 || col === 19
        ? 1
        : (row === 10 && col > 5 && col < 15 ? 1 : (row === 18 && col === 18 ? 2 : 0))
    )
  )],
  // Fase 3
  [...Array(20).fill(null).map((_, row) =>
    Array(20).fill(null).map((_, col) =>
      row === 0 || col === 0 || row === 19 || col === 19
        ? 1
        : (row === 5 && col < 15 ? 1 : (row === 18 && col === 18 ? 2 : 0))
    )
  )]
];

function renderMaze() {
  mazeDiv.innerHTML = "";
  const maze = mazes[currentLevel];
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      if (maze[row][col] === 1) {
        cell.classList.add("wall");
      } else if (maze[row][col] === 2) {
        cell.classList.add("goal");
      } else {
        cell.classList.add("path");
      }

      if (playerPos.row === row && playerPos.col === col) {
        cell.classList.add("player");
      }

      mazeDiv.appendChild(cell);
    }
  }
}

function movePlayer(dx, dy) {
  const newRow = playerPos.row + dx;
  const newCol = playerPos.col + dy;
  const maze = mazes[currentLevel];

  if (maze[newRow][newCol] !== 1) {
    playerPos = { row: newRow, col: newCol };

    if (maze[newRow][newCol] === 2) {
      currentLevel++;
      if (currentLevel >= mazes.length) {
        gameScreen.style.display = "none";
        endScreen.style.display = "block";
        return;
      } else {
        playerPos = { row: 1, col: 1 };
      }
    }

    renderMaze();
  }
}

document.addEventListener("keydown", (e) => {
  e.preventDefault();
  switch (e.key) {
    case "ArrowUp":
      movePlayer(-1, 0);
      break;
    case "ArrowDown":
      movePlayer(1, 0);
      break;
    case "ArrowLeft":
      movePlayer(0, -1);
      break;
    case "ArrowRight":
      movePlayer(0, 1);
      break;
  }
});

startBtn.addEventListener("click", () => {
  startScreen.style.display = "none";
  gameScreen.style.display = "block";
  renderMaze();
});
