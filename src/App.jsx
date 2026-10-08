import { useState } from "react";
import { place, move, left, right, report, GRID_SIZE } from "./logic/robot";
import robotImg from "./assets/toy-robot.png";

const commands = { place, move, left, right, report };

const cols = [];
for (let i = 0; i < GRID_SIZE; i++) {
  cols.push(i);
}
const rows = [...cols].reverse();

const rotation = {
  NORTH: "rotate-0",
  EAST: "rotate-90",
  SOUTH: "rotate-180",
  WEST: "-rotate-90",
};

function App() {
  const [robot, setRobot] = useState(null);
  const [outputLog, setOutputLog] = useState(null);

  function run(input, ...args) {
    if (!robot && input !== "place") {
      setOutputLog({ input, ok: false, message: "Place robot first!" });
      return;
    }

    const result = commands[input](robot, ...args);
    setRobot(result.robot);
    setOutputLog({ input, ok: result.ok, message: result.message });
  }

  return (
    <>
      <div className="p-8 flex flex-col gap-4">
        <div className="grid grid-cols-5 gap-1 w-80">
          {rows.flatMap((y) =>
            cols.map((x) => (
              <div
                key={`${x}-${y}`}
                className="aspect-square flex items-center justify-center rounded border border-black-300 bg-white"
              >
                {robot && robot.x === x && robot.y === y && (
                  <img
                    src={robotImg}
                    className={`w-3/4 h-3/4 ${rotation[robot.facing]}`}
                  />
                )}
              </div>
            )),
          )}
        </div>
        <div className="flex gap-2">
          <button onClick={() => run("place", 0, 0, "NORTH")}>
            Placement test
          </button>
          <button className="" onClick={() => run("move")}>
            Move
          </button>
          <button onClick={() => run("left")}>Left</button>
          <button onClick={() => run("right")}>Right</button>
          <button onClick={() => run("report")}>Report</button>
        </div>
      </div>
    </>
  );
}

export default App;
