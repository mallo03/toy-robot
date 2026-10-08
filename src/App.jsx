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
import robotImg from "./assets/toy-robot.svg";

const btn =
  "cursor-pointer rounded-lg bg-stone-500 px-6 py-2 text-sm font-medium text-stone-100 shadow-sm transition hover:bg-stone-600";
const field =
  "rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm text-stone-800 shadow-sm placeholder:text-stone-400 transition hover:bg-stone-200";

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
      <div className="min-h-screen bg-gradient-to-br from-stone-100 via-stone-200 to-stone-300 items-center flex justify-center gap-4">
        <div className="flex flex-col items-center space-y-8 w-96">
          <div className="grid grid-cols-5 gap-1 w-80">
            {rows.flatMap((y) =>
              cols.map((x) => (
                <div
                  key={`${x}-${y}`}
                  className="aspect-square flex items-center justify-center rounded border border-stone-500 bg-white"
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
              placeholder="X"
              min={0}
              max={GRID_SIZE - 1}
              className={`${field} w-16 text-center`}
            />
            <input
              type="number"
              name="y"
              placeholder="Y"
              min={0}
              max={GRID_SIZE - 1}
              className={`${field} w-16 text-center`}
            />
            <select
              name="facing"
              defaultValue="NORTH"
              className={`${field} flex-1`}
            >
              {DIRECTIONS.map((x) => (
                <option key={x} value={x}>
                  {x}
                </option>
              ))}
            </select>
            <button type="submit" className={btn}>
              Place
            </button>
          </form>
          <div className="flex gap-2 justify-center">
            <button className={btn} onClick={() => run("move")}>
              Move
            </button>
            <button className={btn} onClick={() => run("left")}>
              Left
            </button>
            <button className={btn} onClick={() => run("right")}>
              Right
            </button>
            <button className={btn} onClick={() => run("report")}>
              Report
            </button>
          </div>
          <div className="flex flex-col items-center justify-center w-full h-24 break-words border border-stone-500 rounded-lg p-4 bg-white">
            {outputLog ? (
              <>
                <p
                  className={`font-mono ${outputLog.ok ? "text-green-400" : "text-red-400"}`}
                >
                  {outputLog.ok ? "Successful" : "Failed"} {outputLog.input}
                </p>
                {outputLog.message && (
                  <p
                    className={`font-mono ${outputLog.ok ? "text-green-400" : "text-red-400"}`}
                  >
                    {outputLog.message}
                  </p>
                )}
              </>
            ) : (
              <p className="font-mono text-stone-400">Output</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
