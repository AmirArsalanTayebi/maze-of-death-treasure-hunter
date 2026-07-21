# The Treasure Hunter in the Maze of Death

Maze pathfinding visualisers that demonstrate the **Breadth-First Search (BFS)** shortest-path algorithm.

Includes:

1. A fixed maze drawn on **HTML5 Canvas**
2. A **random maze generator** rendered with CSS Grid (always regenerates until a solvable path exists)

Originally developed for the **Bright Expo 2024 – AI & Innovation Challenge** (Strasbourg, France).

**Team Lead:** Amir Arsalan Tayebi

---

## Official repository

| Field | Value |
| ----- | ----- |
| **Repository name** | `maze-of-death-treasure-hunter` |
| **Suggested GitHub description** | Maze of Death treasure hunter — BFS shortest-path visualisers (canvas maze + random maze generator) in vanilla JavaScript. |
| **Visibility** | Public |
| **Author** | Amir Arsalan Tayebi (Team Lead) |

## Features

- BFS shortest-path search with step-by-step animation
- Fixed maze demo (`index.html`)
- Random maze demo with guaranteed solvability (`random-maze.html`)
- Pure frontend — no backend, no dependencies

## Project structure

```
maze-of-death-treasure-hunter/
├── index.html          # Canvas-based fixed maze + BFS
├── random-maze.html    # Random maze generator UI
├── labyrinth.js        # Random maze + BFS + animation
├── styles.css
├── LICENSE
├── .gitignore
└── README.md
```

## Getting started

```bash
python -m http.server 8000
# Fixed maze:   http://localhost:8000/
# Random maze:  http://localhost:8000/random-maze.html
```

## Algorithm overview

```
BFS(start, end):
    queue ← [[start]]
    visited ← {start}
    while queue not empty:
        path ← queue.pop_front()
        cell ← last(path)
        if cell == end: return path      # first hit = shortest path
        for each free neighbour n of cell:
            if n not visited:
                visited.add(n)
                queue.push(path + [n])
    return null
```

## Tech stack

- HTML5 Canvas / CSS Grid
- Vanilla JavaScript (ES6)
- Breadth-First Search (BFS)

## Author

**Amir Arsalan Tayebi** — Team Lead  
Gold Medal, Bright Expo 2024 AI Challenge (Strasbourg, France)

## License

Released under the [MIT License](LICENSE).
