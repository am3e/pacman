// width of the grid

const width = 28
const grid = document.querySelector('.grid');
const scoreDisplay = document.getElementById('score')
const squares = []
let score = 0;


//28 * 28 (width by width) = 784 squares 
    // 0 is pac dots
    // 1 is wall
    // 2 is ghost layer
    // 3 is power pellets
    // 4 is empty
const layout = [
    1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,
    1,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	3,	0,	0,	0,	0,	3,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	1,
    1,	0,	1,	1,	1,	1,	1,	0,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	0,	1,	1,	1,	1,	1,	0,	1,
    1,	3,	1,	1,	1,	1,	1,	0,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	0,	1,	1,	1,	1,	1,	3,	1,
    1,	0,	1,	1,	1,	1,	1,	0,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	0,	1,	1,	1,	1,	1,	0,	1,
    1,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	1,
    1,	1,	0,	1,	1,	1,	1,	0,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	0,	1,	1,	1,	1,	0,	1,	1,
    1,	1,	0,	1,	1,	1,	1,	0,	0,	0,	0,	0,	1,	1,	1,	1,	0,	0,	0,	0,	0,	1,	1,	1,	1,	0,	1,	1,
    1,	1,	0,	1,	1,	1,	1,	0,	1,	1,	1,	0,	1,	1,	1,	1,	0,	1,	1,	1,	0,	1,	1,	1,	1,	0,	1,	1,
    1,	1,	0,	0,	0,	0,	0,	0,	1,	1,	1,	0,	1,	1,	1,	1,	0,	1,	1,	1,	0,	0,	0,	0,	0,	0,	1,	1,
    1,	1,	1,	0,	1,	1,	1,	0,	0,	4,	4,	4,	4,	4,	4,	4,	4,	4,	4,	0,	0,	1,	1,	1,	0,	1,	1,	1,
    1,	1,	1,	0,	0,	0,	0,	0,	1,	4,	1,	1,	1,	2,	2,	1,	1,	1,	4,	1,	0,	0,	0,	0,	0,	1,	1,	1,
    1,	1,	1,	1,	1,	1,	1,	0,	1,	4,	1,	2,	2,	2,	2,	2,	2,	1,	4,	1,	0,	1,	1,	1,	1,	1,	1,	1,
    4,	4,	4,	4,	4,	4,	4,	4,	4,	4,	1,	2,	2,	2,	2,	2,	2,	1,	4,	4,	4,	4,	4,	4,	4,	4,	4,	4,
    1,	1,	1,	1,	1,	1,	1,	0,	1,	4,	1,	2,	2,	2,	2,	2,	2,	1,	4,	1,	0,	1,	1,	1,	1,	1,	1,	1,
    1,	1,	1,	1,	1,	1,	1,	0,	1,	4,	1,	1,	1,	1,	1,	1,	1,	1,	4,	1,	0,	1,	1,	1,	1,	1,	1,	1,
    1,	0,	0,	0,	0,	0,	0,	3,	1,	4,	4,	4,	4,	4,	4,	4,	4,	4,	4,	1,	3,	0,	0,	0,	0,	0,	0,	1,
    1,	0,	1,	1,	1,	1,	1,	0,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	0,	1,	1,	1,	1,	1,	0,	1,
    1,	0,	1,	1,	1,	1,	1,	0,	0,	0,	0,	0,	1,	1,	1,	1,	0,	0,	0,	0,	0,	1,	1,	1,	1,	1,	0,	1,
    1,	0,	1,	1,	1,	1,	1,	0,	1,	1,	1,	0,	1,	1,	1,	1,	0,	1,	1,	1,	0,	1,	1,	1,	1,	1,	0,	1,
    1,	0,	0,	0,	0,	0,	0,	0,	1,	1,	1,	0,	0,	0,	0,	0,	0,	1,	1,	1,	0,	0,	0,	0,	0,	0,	0,	1,
    1,	1,	0,	1,	1,	1,	1,	0,	1,	1,	1,	0,	1,	1,	1,	1,	0,	1,	1,	1,	0,	1,	1,	1,	1,	0,	1,	1,
    1,	1,	0,	1,	1,	0,	0,	0,	1,	1,	1,	0,	1,	1,	1,	1,	0,	1,	1,	1,	0,	0,	0,	1,	1,	0,	1,	1,
    1,	1,	0,	1,	1,	0,	1,	0,	1,	1,	1,	0,	1,	1,	1,	1,	0,	1,	1,	1,	0,	1,	0,	1,	1,	0,	1,	1,
    1,	1,	0,	1,	1,	0,	1,	0,	1,	1,	1,	0,	0,	0,	0,	0,	0,	1,	1,	1,	0,	1,	0,	1,	1,	0,	1,	1,
    1,	1,	0,	1,	1,	0,	1,	0,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	0,	1,	0,	1,	1,	0,	1,	1,
    1,	1,	0,	3,	0,	0,	1,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	0,	1,	0,	0,	3,	0,	1,	1,
    1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1,	1
]

const createBoard = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        //create a square element as a div
        const square = document.createElement('div');
        //add squares to the grid
        grid.appendChild(square)
        //add squares to an array
        squares.push(square)
        if (arr[i] === 0) {
            square.classList.add('pac-dots')
        } else if (arr[i] === 1) {
            square.classList.add('wall')
        } else if (arr[i] === 2) {
            square.classList.add('ghost-lair')
        } else if (arr[i] === 3) {
            square.classList.add('power-pellets')
        } else if (arr[i] === 4) {
            square.classList.add('empty')
        } else {
            square.classList.add('empty')
        }

    }
}


createBoard(layout);
let pacmanCurrentIndex = 462;

squares[pacmanCurrentIndex].classList.add('pacman')


const control = (e) => {

    squares[pacmanCurrentIndex].classList.remove('pacman')
    let nextMove;
    switch(e.key) {
        case "ArrowDown":
            nextMove = pacmanCurrentIndex + width
            if (!squares[nextMove].classList.contains('ghost-lair') &&
                !squares[nextMove].classList.contains('wall') &&
                nextMove < width * width  ) {
                pacmanCurrentIndex = nextMove
            }
        break
        case "ArrowUp":
            nextMove = pacmanCurrentIndex - width
            if (!squares[nextMove].classList.contains('ghost-lair') &&
                !squares[nextMove].classList.contains('wall') &&
                nextMove >= 0) {
                pacmanCurrentIndex = nextMove
            }
        break
        case "ArrowLeft":
            nextMove = pacmanCurrentIndex - 1
            if (pacmanCurrentIndex === 364) {
                pacmanCurrentIndex = 391
            } else if (!squares[nextMove].classList.contains('ghost-lair') &&
                !squares[nextMove].classList.contains('wall') &&
                pacmanCurrentIndex % width !== 0) {
                pacmanCurrentIndex = nextMove
            }
        break
        case "ArrowRight":
            nextMove = pacmanCurrentIndex + 1
            if (pacmanCurrentIndex === 391) {
                pacmanCurrentIndex = 364
            } else if (!squares[nextMove].classList.contains('ghost-lair') &&
                !squares[nextMove].classList.contains('wall') &&
                pacmanCurrentIndex % width < width - 1) {
                pacmanCurrentIndex = nextMove
            }
        break
    }
    squares[pacmanCurrentIndex].classList.add('pacman')
    eatPacDot()
    eatPowerPellets()
    checkGameOver()
}

document.addEventListener('keydown', control)

const eatPacDot = () => {
    if (squares[pacmanCurrentIndex].classList.contains('pac-dots')) {
        score++
        scoreDisplay.textContent = score;
        squares[pacmanCurrentIndex].classList.remove('pac-dots')
    }
}

unScareGhosts = () => {
    ghosts.forEach(ghost => {
        ghost.isScared = false
    })
}


const eatPowerPellets = () => {
    if (squares[pacmanCurrentIndex].classList.contains('power-pellets')) {
        score += 10
        scoreDisplay.textContent = score;
        squares[pacmanCurrentIndex].classList.remove('power-pellets')
        ghosts.forEach(ghost => {
            ghost.isScared = true
        })
        setTimeout(unScareGhosts, 10000)
    }
}

class Ghost {
    constructor(className, startIndex, speed) {
        this.className = className;
        this.startIndex = startIndex;
        this.speed = speed;
        this.currentIndex = startIndex;
        this.isScared = false;
        this.timerId = NaN;
    }
}

const ghosts = [
    new Ghost('blinky', 348, 150),
    new Ghost('pinky', 376, 200),
    new Ghost('inky', 351, 100),
    new Ghost('clyde', 379, 250)
]

//draw my ghosts into grid
ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className)
    squares[ghost.currentIndex].classList.add('ghost')

})

const moveGhosts = (ghost) => {

    const directions = [-1, +1, -width, +width ]
    let direction = directions[ Math.floor( Math.random() * directions.length ) ]

    ghost.timerId = setInterval(function() {
        squares[ghost.currentIndex].classList.remove(ghost.className)
        squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost')

        if (!squares[ghost.currentIndex + direction].classList.contains('wall') &&
        !squares[ghost.currentIndex + direction].classList.contains('ghost', 'scared-ghost')) {
            if (ghost.currentIndex + direction === 391) {
                ghost.currentIndex = 364
            } else if (ghost.currentIndex + direction === 364) {
                ghost.currentIndex = 391
            } else {
                ghost.currentIndex += direction
            }
        } else {
           direction = directions[ Math.floor( Math.random() * directions.length ) ]
        }

        squares[ghost.currentIndex].classList.add(ghost.className)
        squares[ghost.currentIndex].classList.add('ghost')
        
        if (ghost.isScared) {
            squares[ghost.currentIndex].classList.add('scared-ghost')
        }
            
        checkEatScaredGhost(ghost)
        checkGameOver()
    }, ghost.speed)
    
}

ghosts.forEach(ghost => moveGhosts(ghost))


const checkGameOver = () => {
    if (squares[pacmanCurrentIndex].classList.contains('ghost') &&
    !squares[pacmanCurrentIndex].classList.contains('scared-ghost')) {
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        document.removeEventListener('keydown', control)
        scoreDisplay.textContent = 'Game Over'
    }

}

const checkEatScaredGhost = (ghost) => {
    if (ghost.isScared &&
        squares[ghost.currentIndex].classList.contains('pacman')) {
            squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
            ghost.currentIndex = ghost.startIndex
            score += 100
            scoreDisplay.textContent = score;
            squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
            ghost.isScared = false;
        }
}

const checkNextLevel = () => {
    // new layout for each level
    //faster ghost speed, make speed a variable?
    //store high score on local
    //next level if no more pacdots or pac power? or tier?
    
}

//redesign css.. 
//get funny sounds
//change background image for 