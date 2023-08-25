import dayjs from "dayjs";

export type State = {
  snake: string[];
  weeks: {
    contributionDays: {
      color: string;
      contributionCount: number;
      date: string;
    }[];
  }[];
  lastSkipped: boolean;
  score: number;
  speed: number;
  size: number;
  gameOver: boolean;
  direction: "up" | "left" | "right" | "down";
};

type Action = {
  type: "TICK" | "MOVE_UP" | "MOVE_LEFT" | "MOVE_RIGHT" | "MOVE_DOWN" | "RESET";
};

export function reducerFunction(state: State, action: Action) {
  state.lastSkipped = false;

  const head = state.snake[0];

  let currentWeek = 0;
  let currentDay = 0;

  for (let i = 0; i < state.weeks.length; i++) {
    const index = state.weeks[i].contributionDays
      .map((obj) => obj.date)
      .find((day, index) => {
        if (day === head) {
          currentDay = index;
          currentWeek = i;
          return true;
        }
      });
    if (currentDay) break;
  }

  function cleanUpSquare(currentWeek: number, currentDay: number) {
    const day = state.weeks[currentWeek].contributionDays[currentDay];
    if (day.contributionCount === 0) return;

    state.score += day.contributionCount;
    day.color = "#ebedf0";
    day.contributionCount = 0;
  }

  if (state.score % 100 === 0) {
    console.log(state.score);

    state.speed++;
    state.size += 3;
  }

  if (state.snake.slice(1).some((segment) => segment === head)) {
    state.gameOver = true;
    // collision detected
    console.log("Collision detected!");
    // add any other logic you want to execute when a collision occurs
  }

  cleanUpSquare(currentWeek, currentDay);

  switch (action.type) {
    case "MOVE_LEFT": {
      if (state.direction === "right") return state;
      state.direction = "left";
      return state;
    }
    case "MOVE_RIGHT": {
      if (state.direction === "left") return state;
      state.direction = "right";
      return state;
    }
    case "MOVE_UP": {
      if (state.direction === "down") return state;
      state.direction = "up";
      return state;
    }
    case "MOVE_DOWN": {
      if (state.direction === "up") return state;
      state.direction = "down";
      return state;
    }
    case "TICK": {
      const day = state.snake[0];
      let newDay = "";
      if (state.direction === "left") {
        if (currentWeek === 0) {
          const nextWeek = state.weeks.length - 1;
          newDay = state.weeks[nextWeek].contributionDays[currentDay]?.date;
        } else {
          newDay = dayjs(day).subtract(7, "day").format("YYYY-MM-DD");
        }
      } else if (state.direction === "right") {
        if (currentWeek === state.weeks.length - 1) {
          newDay = state.weeks[0].contributionDays[currentDay]?.date;
        } else {
          newDay = dayjs(day).add(7, "day").format("YYYY-MM-DD");
        }
      } else if (state.direction === "up") {
        newDay = dayjs(day)
          .subtract(1 - 7 * (0 | !currentDay), "day")
          .format("YYYY-MM-DD");
      } else if (state.direction === "down") {
        if (currentDay === 6) {
          newDay = dayjs(day).subtract(6, "day").format("YYYY-MM-DD");
        } else {
          newDay = dayjs(day).add(1, "day").format("YYYY-MM-DD");
        }
      }
      state.snake.unshift(newDay);
      state.snake.length = state.size;
      return state;
    }
    // case "RESET": {
    //   state = { ...initialState };
    //   state.gameOver = false;
    //   return state;
    // }
    default: {
      return state;
    }
  }
}
