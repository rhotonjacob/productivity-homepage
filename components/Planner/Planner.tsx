"use client";

import type { FormEvent } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Stack,
  NumberInputStepper,
} from "@chakra-ui/react";
import { atom, useAtom } from "jotai";
import { remindersAtom, tasksAtom } from "@/store";
import type { Reminder, Task } from "@/store";
import TaskItem from "./TaskItem";
import ReminderItem from "./ReminderItem";

// todo: form validation
// todo: add snooze button when timer expires
// todo: add some styling for when timer expires
// todo: reorder tasks via drag/drop
//  - subtask: default sort with reminders added above tasks
// todo: implement jotai's atomWithCache()
// todo: global theme and basic styles
// todo: add tests

const Planner = () => {
  const [tasks, setTasks] = useAtom(tasksAtom);
  const [reminders, setReminders] = useAtom(remindersAtom);

  const addItem = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // validation
    const message = e.currentTarget.message.value;
    // is there a better way to clear the form?
    e.currentTarget.message.value = "";
    if (e.currentTarget.timer.value > 0) {
      const timer = e.currentTarget.timer.value;
      e.currentTarget.timer.value = 0;
      setReminders((prev) => [
        ...prev,
        atom<Reminder>({ message, isCrossed: false, timer }),
      ]);
    } else {
      setTasks((prev) => [...prev, atom<Task>({ message, isCrossed: false })]);
    }
  };

  return (
    <Box width="1000px">
      <form onSubmit={addItem}>
        <Stack
          direction="row"
          spacing="1rem"
          height="100px"
          alignItems="flex-end"
        >
          <FormControl width="500px">
            <FormLabel htmlFor="message">Task</FormLabel>
            <Input
              type="text"
              name="message"
              id="message"
              placeholder="What needs to be done?"
              flex="1"
            />
          </FormControl>
          <FormControl width="auto">
            <FormLabel htmlFor="timer">Timer</FormLabel>
            <NumberInput defaultValue={0} min={0} name="timer" id="timer">
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <Button type="submit" colorScheme="blue">
            Add Task
          </Button>
        </Stack>
      </form>
      <Stack>
        {/* should find out how to put these together */}
        {reminders.map((reminder, i) => (
          <Box key={i}>
            <ReminderItem atom={reminder} />
          </Box>
        ))}
        {tasks.map((task, i) => (
          <Box key={i}>
            <TaskItem atom={task} />
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default Planner;
