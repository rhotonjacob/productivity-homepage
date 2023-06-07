"use client";

import type { FormEvent } from "react";
import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  IconButton,
  Input,
  Stack,
} from "@chakra-ui/react";
import { atom, useAtom, useSetAtom } from "jotai";
import type { PrimitiveAtom } from "jotai";
import { tasksAtom } from "@/store";
import type { Task } from "@/store";

type TaskItemProps = {
  atom: PrimitiveAtom<Task>;
};
const TaskItem = ({ atom }: TaskItemProps) => {
  const [item, setItem] = useAtom(atom);
  const setTasks = useSetAtom(tasksAtom);

  const toggleComplete = () =>
    setItem((props) => ({ ...props, isComplete: !props.isComplete }));

  const deleteTask = (task: PrimitiveAtom<Task>) =>
    setTasks((prev) => prev.filter((item) => item !== task));

  return (
    <Flex>
      <Button
        variant="outline"
        onClick={toggleComplete}
        style={{ textDecoration: item.isComplete ? "line-through" : "" }}
      >
        {item.message}
      </Button>
      <IconButton
        colorScheme="red"
        aria-label="delete task"
        icon={<CloseIcon />}
        onClick={() => deleteTask(atom)}
      />
    </Flex>
  );
};

const TaskList = () => {
  const [tasks, setTasks] = useAtom(tasksAtom);

  const addTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // validate the field isn't empty
    const newTask = e.currentTarget.newTask.value;
    e.currentTarget.newTask.value = "";
    setTasks((prev) => [
      ...prev,
      atom<Task>({ message: newTask, isComplete: false }),
    ]);
  };

  return (
    <Box>
      <form onSubmit={addTask}>
        <FormControl>
          <Input type="text" name="newTask" placeholder="Add a new task..." />
        </FormControl>
        <Button type="submit">Add</Button>
      </form>
      <Stack direction="column">
        {tasks.map((task, i) => (
          <div key={i}>
            <TaskItem atom={task} />
          </div>
        ))}
      </Stack>
    </Box>
  );
};

export default TaskList;
