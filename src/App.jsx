import { useState } from "react";
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
  DialogClose,
  DialogTrigger,
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
import { Button } from "@mui/material";
import { Checkbox } from "./components/ui/checkbox";
import { Label } from "./components/ui/label";
import { Search } from "@mui/icons-material";

function App() {
  const task = [
    {
      id: 1,
      name: "Task 1",
      description: "This is a task description",
      completed: false,
      priority: "low",
    },
    {
      id: 2,
      name: "Task 2",
      description: "This is a task description",
      completed: false,
      priority: "medium",
    },
    {
      id: 3,
      name: "Task 3",
      description: "This is a task description",
      completed: false,
      priority: "high",
    },
    {
      id: 4,
      name: "Task 4",
      description: "This is a task description",
      completed: true,
      priority: "low",
    },
    {
      id: 5,
      name: "Task 5",
      description: "This is a task description",
      completed: false,
      priority: "medium",
    },
  ];
  // const task = localStorage.getItem("task")

  const [filter, setFilter] = useState("all");
  const [tasks, setTasks] = useState(task);
  const [taskName, setTaskName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskPrio, setTaskPrio] = useState("");
  const filteredTask = tasks.filter(
    (task) =>
      (task.completed === false && filter === "active") ||
      (task.completed === true && filter === "completed") ||
      filter === "all"
  );
  const addTask = () => {};
  return (
    <>
      <div className="max-h-screen p-0 m-0 ">
        <Navbar />
        <div className="flex justify-center mt-16 ">
          <Card className="w-full max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Manage Task</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  className="rounded-2xl px-4"
                  type="text"
                  placeholder="Search"
                />
                <Button>
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
                            onValueChange={(e) => setTaskName(e)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="taskDesc">Task Description :</Label>
                          <Input
                            id="taskDesc"
                            type="text"
                            placeholder="Enter Description"
                            onValueChange={(e) => setTaskName(e)}
                          />
                        </div>
                        <DialogFooter className="flex sm:justify-between">
                          <Select>
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

                          <Button>Add Task</Button>
                        </DialogFooter>
                      </div>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
              <ul className="space-y-3 ">
                {filteredTask.map((task) => (
                  <li key={task.id} className="">
                    <div className="flex flex-row space-x-3 ">
                      <Checkbox />
                      <div className="mb-2 ">
                        <CardTitle>{task.name}</CardTitle>
                        <CardDescription>{task.description}</CardDescription>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm ">Task Left {filteredTask.length}</div>
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
      </div>
    </>
  );
}

export default App;
