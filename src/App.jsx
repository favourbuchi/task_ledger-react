import { useEffect, useState } from "react";

export default function App() {
  // TODO 1: Declare two states:
  // - tasks: an array of strings (e.g., initial value: ["Review React fundamentals"])
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  // - taskInput: a string for the controlled input (initial value: "")
  const [taskInput, setTaskInput] = useState("");

  // useEffect to save Tasks to local Storage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // TODO 2: Create the submit handler function
  function handleAddTask(e) {
    // 1. Prevent default form submission reload
    e.preventDefault();

    // 2. Guard check: do nothing if taskInput is empty/whitespace
    if (!taskInput.trim()) return;

    // 3. Append the new task immutably to tasks using spread syntax
    console.log(`inside handle add task`);
    // console.log(taskInput);
    setTasks((prevTasks) => {
      console.log(taskInput);
      return [...prevTasks, taskInput];
    });

    // 4. Reset taskInput back to ""
    setTaskInput("");
  }

  console.log(tasks);

  function handleChange(event) {
    setTaskInput(event.target.value);
    // console.log(taskInput)
  }

  // TODO 3: Create the delete handler function
  function handleDeleteTask(indexToDelete) {
    // Filter out taskToDelete from the tasks array immutably
    setTasks((prevTasks) => {
      const newTasks = prevTasks.filter((_, index) => {
        return index != indexToDelete;
      });
      return newTasks;
    });
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-blue">
            Task Ledger
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Foundations refresher sandbox
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleAddTask} className="flex gap-2">
          {/* TODO 4: Make this input controlled by connecting value & onChange */}
          <input
            type="text"
            onChange={handleChange}
            value={taskInput}
            placeholder="Add a new task..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-amber-500 transition-colors"
          />
          <button
            type="submit"
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-sm transition-all active:scale-95"
          >
            Add
          </button>
        </form>

        {/* Task List */}
        <ul className="space-y-2">
          {/* TODO 5: Map over your tasks array here. 
              Render an <li> for each task with a unique key, the task text, 
              and a delete button wired to handleDeleteTask. 
          */}
          {tasks.map((task, index) => {
            return (
              <li
                key={index}
                className="flex items-center justify-between bg-slate-950 border border-slate-800/80 rounded-xl px-4 py-3 text-sm"
              >
                <span className="text-slate-300">{task}</span>
                <button
                  type="button"
                  className="text-slate-500 hover:text-rose-400 text-sm font-semibold transition-colors px-2 py-1"
                  onClick={() => handleDeleteTask(index)}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
