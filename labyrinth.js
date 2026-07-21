// Random maze generator + Breadth-First-Search (BFS) shortest-path visualiser.
// The grid uses the CSS classes defined in styles.css:
//   .cell, .cell.wall, .cell.start, .cell.end, .cell.path

const GRID_SIZE = 10;
const WALL_PROBABILITY = 0.3;

function generateMaze(size) {
    return Array.from({ length: size }, () =>
        Array.from({ length: size }, () => (Math.random() > WALL_PROBABILITY ? 0 : 1))
    );
}

function drawMaze(maze) {
    const mazeContainer = document.getElementById('maze');
    mazeContainer.style.gridTemplateColumns = `repeat(${maze.length}, 1fr)`;
    mazeContainer.innerHTML = '';
    maze.forEach((row) => {
        row.forEach((cell) => {
            const div = document.createElement('div');
            div.className = 'cell';
            if (cell === 1) div.classList.add('wall');
            if (cell === 'S') div.classList.add('start');
            if (cell === 'E') div.classList.add('end');
            mazeContainer.appendChild(div);
        });
    });
}

function bfs(maze, start, end) {
    const directions = [
        { x: 0, y: 1 }, { x: 1, y: 0 },
        { x: 0, y: -1 }, { x: -1, y: 0 }
    ];
    const queue = [[start]];
    const visited = new Set([`${start.x},${start.y}`]);

    while (queue.length > 0) {
        const path = queue.shift();
        const { x, y } = path[path.length - 1];

        if (x === end.x && y === end.y) return path;

        for (const { x: dx, y: dy } of directions) {
            const nx = x + dx;
            const ny = y + dy;
            if (
                nx >= 0 && ny >= 0 && nx < maze.length && ny < maze[0].length &&
                maze[nx][ny] !== 1 && !visited.has(`${nx},${ny}`)
            ) {
                visited.add(`${nx},${ny}`);
                queue.push([...path, { x: nx, y: ny }]);
            }
        }
    }
    return null;
}

function animatePath(path, size) {
    const mazeContainer = document.getElementById('maze');
    path.forEach((pos, index) => {
        setTimeout(() => {
            const cell = mazeContainer.children[pos.x * size + pos.y];
            if (cell && !cell.classList.contains('start') && !cell.classList.contains('end')) {
                cell.classList.add('path');
            }
        }, index * 200);
    });
}

function startGame() {
    const start = { x: 0, y: 0 };
    const end = { x: GRID_SIZE - 1, y: GRID_SIZE - 1 };

    // Regenerate until a solvable maze is produced (guarantees a visible path).
    let maze;
    let path = null;
    let attempts = 0;
    do {
        maze = generateMaze(GRID_SIZE);
        maze[start.x][start.y] = 0;
        maze[end.x][end.y] = 0;
        path = bfs(maze, start, end);
        attempts++;
    } while (!path && attempts < 200);

    maze[start.x][start.y] = 'S';
    maze[end.x][end.y] = 'E';
    drawMaze(maze);

    const status = document.getElementById('status');
    if (path) {
        animatePath(path, GRID_SIZE);
        if (status) status.textContent = `Shortest path found in ${path.length} steps.`;
    } else if (status) {
        status.textContent = 'No path found — try generating again.';
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('generate-button');
    if (btn) btn.addEventListener('click', startGame);
    startGame();
});
