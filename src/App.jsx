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
  DialogTitle,
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
import DeleteOutlineSharpIcon from "@mui/icons-material/DeleteOutlineSharp";
// import { Button } from "@mui/material";
import { Checkbox } from "./components/ui/checkbox";
import { Label } from "./components/ui/label";
import { Search } from "@mui/icons-material";
import { Button } from "./components/ui/button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [taskList, setTaskList] = useState(() => {
    const savedTask = localStorage.getItem("taskList");
    return savedTask ? JSON.parse(savedTask) : [];
  });
  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(taskList));
  }, [taskList]);
  const [filter, setFilter] = useState("all");
  const [taskName, setTaskName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskPrio, setTaskPrio] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTask, setFilteredTask] = useState([]);
  const [baseFilteredTasks, setBaseFilteredTasks] = useState([]);
  const [activeTaskCount, setActiveTaskCount] = useState(0);
  useEffect(() => {
    let x = taskList.filter((task) => {
      const matchFilter =
        (task.completed === false && filter === "active") ||
        (task.completed === true && filter === "completed") ||
        filter === "all";
      return matchFilter;
    });
    setBaseFilteredTasks(x);
    setFilteredTask(x);
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
  const addTask = () => {
    const task = {
      id: taskList.length + 1,
      name: taskName,
      description: taskDesc,
      completed: false,
      priority: taskPrio,
    };
    setTaskList([...taskList, task]);
    setTaskName("");
    setTaskDesc("");
    setTaskPrio("");
    toast.success("task added")
  };
  const deleteTask = (id) => {
    setTaskList(taskList.filter((task) => task.id != id));
    toast.success("task deleted")
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
      <div className="max-h-screen p-0 m-0 ">
        <Navbar />
        <div className="flex justify-center mt-16 ">
          <Card className="w-full max-w-md mx-auto min-h-64">
            <CardHeader>
              <CardTitle>Manage Task</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  className="rounded-2xl px-4"
                  type="text"
                  placeholder="Search"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  // onChange={(e)=>console.log(e.target.value)}
                />
                <Button
                  variant="outline"
                  className="border-none hover:shadow-inner"
                  onClick={handleSearch}
                >
                  <Search />
                </Button>
                <Dialog>
                  <DialogTrigger>
                    <Button className="border-2">Add</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>Enter a new Task</DialogHeader>
                    <DialogDescription>
                      Enter task name & description
                    </DialogDescription>
                    <DialogHeader className="">
                      <div className="space-y-4 ">
                        <div className="space-y-2">
                          <Label htmlFor="taskName">Task Name :</Label>
                          <Input
                            id="taskName"
                            type="text"
                            placeholder="Enter Name"
                            value={taskName}
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
                            onChange={(e) => setTaskDesc(e.target.value)}
                          />
                        </div>
                        <DialogFooter className="flex sm:justify-between">
                          <Select onValueChange={(val) => setTaskPrio(val)}>
                            <SelectTrigger className="w-[120px]">
                              <SelectValue
                                className="text-muted "
                                placeholder="Priority"
                              />
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
              <ul className="space-y-4 ">
                {filteredTask.map((task) => (
                  <li key={task.id} className="">
                    <div
                      className="flex justify-between
                     items-center "
                    >
                      <div className="flex space-x-3 items-center ">
                        <Checkbox
                          checked={task.completed ? true : false}
                          onCheckedChange={() => toggleTask(task.id)}
                        />
                        <div className="space-y-1">
                          <CardTitle
                            className={`${
                              task.completed ? "line-through text-muted" : ""
                            }`}
                          >
                            {task.name}
                          </CardTitle>
                          <CardDescription
                            className={`${
                              task.completed ? "text-muted line-through" : ""
                            }`}
                          >
                            {task.description}
                          </CardDescription>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        className="hover:text-red-600 border-none"
                        onClick={() => deleteTask(task.id)}
                      >
                        <DeleteOutlineSharpIcon />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm ">Task Left {activeTaskCount}</div>
              <Select onValueChange={(val) => setFilter(val)}>
                <SelectTrigger className="w-[120px]">
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
        <ToastContainer position="bottom-center"/>
      </div>
    </>
  );
}

export default App;
