import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "./components/ui/input";
import {
  PlusCircle,
  Trash2,
  AlertTriangle,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "./components/ui/button";
import { Checkbox } from "./components/ui/checkbox";
import { Label } from "./components/ui/label";
import { Search } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ScrollArea, ScrollBar } from "./components/ui/scroll-area";

function App() {
  const [taskList, setTaskList] = useState(() => {
    const savedTask = localStorage.getItem("taskList");
    return savedTask ? JSON.parse(savedTask) : [];
  });

  const [filter, setFilter] = useState("all");
  const [taskName, setTaskName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskPrio, setTaskPrio] = useState("low");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTask, setFilteredTask] = useState([]);
  const [baseFilteredTasks, setBaseFilteredTasks] = useState([]);

  useEffect(() => {
    let filtered = taskList.filter((task) => {
      const matchFilter =
        (task.completed === false && filter === "active") ||
        (task.completed === true && filter === "completed") ||
        filter === "all";
      return matchFilter;
    });

    const priorityOrder = { high: 1, medium: 2, low: 3 };

    filtered.sort(
      (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
    );

    setBaseFilteredTasks(filtered);
    setFilteredTask(filtered);
  }, [taskList, filter]);

  const handleSearch = () => {
    const afterSearch = baseFilteredTasks.filter((task) => {
      return (
        task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredTask(afterSearch);
  };
  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(taskList));
  }, [taskList]);

  const addTask = () => {
    if (!taskName) {
      toast.error("You are forgetting task title");
      return;
    }
    const task = {
      id: uuidv4(),
      name: taskName,
      description: taskDesc,
      completed: false,
      priority: taskPrio,
    };
    setTaskList([...taskList, task]);
    setTaskName("");
    setTaskDesc("");
    setTaskPrio("");
    toast.success("task added");
  };

  const deleteTask = (id) => {
    setTaskList(taskList.filter((task) => task.id != id));
    toast.success("task deleted");
  };

  const toggleTask = (id) => {
    setTaskList(
      taskList.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <>
      <div className="h-screen bg-slate-200 dark:bg-neutral-950">
        <Navbar />
        <div className="flex justify-center items-center px-4 sm:px-6 md:px-8 mt-10">
          <Card className="w-full max-w-md sm:max-w-2xl mx-auto min-h-16 shadow-2xl">
            <CardHeader>
              <CardTitle>Manage Task</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-4 sm:space-y-0 justify-between">
                <div className="flex w-full justify-between space-x-2">
                  <Input
                    className="rounded-2xl px-4 border-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-700 dark:focus:ring-yellow-200 focus:ring-opacity-50 dark:focus:ring-opacity-70 w-full"
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />

                  <Button
                    variant="outline"
                    className="border-none hover:shadow-inner active:scale-75  "
                    onClick={handleSearch}
                    aria-label="Search tasks"
                  >
                    <Search className="text-yellow-500 scale-150 " />
                  </Button>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="border-2 rounded-full hover:text-yellow-600 dark:hover:text-yellow-300"
                    >
                      <PlusCircle /> Add Task
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>Enter a new Task</DialogHeader>
                    <DialogDescription>
                      Enter task name & description
                    </DialogDescription>
                    <DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="taskName">Task Name :</Label>
                          <Input
                            id="taskName"
                            type="text"
                            placeholder="Enter Name"
                            value={taskName}
                            maxLength={40}
                            onChange={(e) => setTaskName(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="taskDesc">Task Description :</Label>
                          <Input
                            id="taskDesc"
                            type="text"
                            placeholder="Enter Description"
                            maxLength={60}
                            onChange={(e) => setTaskDesc(e.target.value)}
                          />
                        </div>
                        <DialogFooter className="flex sm:justify-between">
                          <Select
                            onValueChange={(val) => setTaskPrio(val || "low")}
                          >
                            <SelectTrigger className="w-[120px]">
                              <SelectValue placeholder="Priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                            </SelectContent>
                          </Select>
                          <DialogClose>
                            <Button
                              variant="outline"
                              onClick={addTask}
                              type="submit"
                            >
                              Add
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </div>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
              <ScrollArea className="h-[300px] sm:h-auto w-full rounded-md border p-2">
                <ul className="space-y-4">
                  {filteredTask.length === 0 &&
                  filter !== "completed" &&
                  !searchTerm
                    ? "Your task list is waiting! Add a task to begin."
                    : ""}
                  {filteredTask.map((task) => (
                    <li key={task.id}>
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-3 items-center  ">
                          <Checkbox
                            checked={task.completed ? true : false}
                            onCheckedChange={() => toggleTask(task.id)}
                          />
                          <div className="space-y-1 w-full">
                            <CardTitle
                              className={`${
                                task.completed
                                  ? "line-through text-gray-300"
                                  : ""
                              }`}
                            >
                              <div className="flex items-center space-x-2">
                                {task.priority === "high" && (
                                  <AlertTriangle className="text-red-500" />
                                )}
                                {task.priority === "medium" && (
                                  <AlertCircle className="text-yellow-500" />
                                )}
                                {task.priority === "low" && (
                                  <CheckCircle className="text-green-500" />
                                )}
                                <span>{task.name}</span>
                              </div>
                            </CardTitle>
                            <CardDescription
                              className={`${
                                task.completed
                                  ? "line-through text-gray-300"
                                  : ""
                              }`}
                            > <p className="w-auto">

                              {task.description}
                            </p>
                            </CardDescription>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          className="hover:text-red-600 border-none mr-2 z-10"
                          onClick={() => deleteTask(task.id)}
                          aria-label="Delete task"
                        >
                          <Trash2 />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
                <ScrollBar />
              </ScrollArea>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Select onValueChange={(val) => setFilter(val)}>
                <SelectTrigger className="w-[120px] border-none hover:shadow-inner ">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="all">All</SelectItem>
                </SelectContent>
              </Select>
            </CardFooter>
          </Card>
        </div>
        <ToastContainer position="bottom-center" />
      </div>
    </>
  );
}

export default App;