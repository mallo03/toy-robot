import { useState } from "react";
import {
  place,
  move,
  left,
  right,
  report,
  GRID_SIZE,
  DIRECTIONS,
} from "./logic/robot";
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

  function handlePlace(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    run(
      "place",
      Number(data.get("x")),
      Number(data.get("y")),
      data.get("facing"),
    );
  }

  return (
    <>
      <div className="min-h-screen items-center p-8 flex justify-center gap-4">
        <div className="flex flex-col space-y-8">
          <div className="grid grid-cols-5 gap-1 w-80">
            {rows.flatMap((y) =>
              cols.map((x) => (
                <div
                  key={`${x}-${y}`}
                  className="aspect-square flex items-center justify-center rounded border bg-white"
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

          <form
            onSubmit={handlePlace}
            className="flex gap-2 justify-center items-center"
          >
            <input
              type="number"
              name="x"
              defaultValue={0}
              className="w-16 border rounded px-2 py-1"
            />
            <input
              type="number"
              name="y"
              defaultValue={0}
              className="w-16 border rounded px-2 py-1"
            />
            <select
              name="facing"
              defaultValue="NORTH"
              className="border rounded px-2 py-1"
            >
              {DIRECTIONS.map((x) => (
                <option key={x} value={x}>
                  {x}
                </option>
              ))}
            </select>
            <button type="submit">Place</button>
          </form>
          <div className="flex gap-2 justify-center">
            <button className="" onClick={() => run("move")}>
              Move
            </button>
            <button onClick={() => run("left")}>Left</button>
            <button onClick={() => run("right")}>Right</button>
            <button onClick={() => run("report")}>Report</button>
          </div>
          <div className="flex flex-col">
            {outputLog && (
              <p
                className={`font-mono ${outputLog.ok ? "text-green-600" : "text-red-600"}`}
              >
                {outputLog.ok ? "Successesful" : "Failed"}{" "}
                {outputLog.input}{" "}
              </p>
            )}
            {outputLog && (
              <p
                className={`font-mono ${outputLog.ok ? "text-green-600" : "text-red-600"}`}
              >
                {outputLog.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
