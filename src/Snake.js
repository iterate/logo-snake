import React, { useState, useEffect, useRef } from "react";
import { css } from "emotion";

import MobileController from "./Controllers/MobileController";
import { setColor, initialSnake } from "./utils/snakeUtils";

const startGameLoop = () => {
  let running = true;
  let direction = 'PAUSE';
  let snake = initialSnake('t1');

  snake.forEach(({x, y}) => {
    setColor(x, y, '#00ff00');
  })

  const step = () => {
    console.log('Moving in direction: ', direction);

    console.log(snake);
    let {x, y} = snake[snake.length - 1];
    let newX = x;
    let newY = y;

    if (direction === 'UP') {
      newY -= 1;
    } else if (direction === 'DOWN') {
      newY += 1
    } else if (direction === 'LEFT') {
      newX -= 1;
    } else if (direction === 'RIGHT') {
      newX += 1;
    }

    snake.push({x: newX, y: newY});

    
    setColor(newX, newY, '#00ff00');
    console.log({newX, newY});

    if (running) {
      setTimeout(step, 1000);
    }
  };

  step();

  return {
    stop: () => {
      running = false;
    },
    setDirection: (newDirection) => {
      direction = newDirection;
    }
  }
}

function Snake() {
  const [direction, setDirection] = useState("UP");
  const snake = useRef();

  useEffect(() => {
    console.log('starting gameloop');
    snake.current = startGameLoop();

    return () => {
      snake.current.stop();
    };
  }, []);

  const handleDirectionChange = (direction) => {
    console.log({direction});
    snake.current.setDirection(direction);
    // setColor(0,0);
  }
  return (
      <div>
        <MobileController updateDirection={direction => handleDirectionChange(direction)} />
      </div>
  );
};

export default Snake;
