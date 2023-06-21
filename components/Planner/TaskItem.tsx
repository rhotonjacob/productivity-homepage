"use client";

import { CloseIcon } from "@chakra-ui/icons";
import { IconButton, Stack, Text } from "@chakra-ui/react";
import { useAtom, useSetAtom } from "jotai";
import type { PrimitiveAtom } from "jotai";
import { tasksAtom } from "@/store";
import type { Task } from "@/store";

interface TaskItemProps {
  atom: PrimitiveAtom<Task>;
}

const TaskItem = ({ atom }: TaskItemProps) => {
  const [item, setItem] = useAtom(atom);
  const setTasks = useSetAtom(tasksAtom);

  const deleteTask = (task: PrimitiveAtom<Task>) =>
    setTasks((prev) => prev.filter((item) => item !== task));

  const toggleCrossed = () =>
    setItem((prev) => ({ ...prev, isCrossed: !prev.isCrossed }));

  return (
    <Stack direction="row" spacing="1rem" onClick={toggleCrossed}>
      <Text flex="1" textDecoration={item.isCrossed ? "line-through" : ""}>
        {item.message}
      </Text>
      <IconButton
        colorScheme="red"
        aria-label="delete task"
        icon={<CloseIcon />}
        onClick={() => deleteTask(atom)}
      />
    </Stack>
  );
};

export default TaskItem;
