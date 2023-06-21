"use client";

import { CloseIcon } from "@chakra-ui/icons";
import { IconButton, Stack, Text } from "@chakra-ui/react";
import { useAtom, useSetAtom } from "jotai";
import type { PrimitiveAtom } from "jotai";
import { remindersAtom } from "@/store";
import type { Reminder } from "@/store";
import useCountDown from "@/hooks/useCountDown";

interface ReminderItemProps {
  atom: PrimitiveAtom<Reminder>;
}

const ReminderItem = ({ atom }: ReminderItemProps) => {
  const [item, setItem] = useAtom(atom);
  const setReminders = useSetAtom(remindersAtom);

  const { hours, minutes, seconds, increaseTimerBy, total } = useCountDown(
    item.timer
  );

  const deleteReminder = (reminder: PrimitiveAtom<Reminder>) =>
    setReminders((prev) => prev.filter((item) => item !== reminder));

  // edit method

  // how should the timer behave when the item is crossed?
  const toggleCrossed = () =>
    setItem((prev) => ({ ...prev, isCrossed: !prev.isCrossed }));

  return (
    <Stack direction="row" spacing="1rem" onClick={toggleCrossed}>
      <Text flex="1" textDecoration={item.isCrossed ? "line-through" : ""}>
        {item.message}
      </Text>
      <Text>{`${hours}:${minutes}:${seconds} remaining`}</Text>
      <IconButton
        colorScheme="red"
        aria-label="delete task"
        icon={<CloseIcon />}
        onClick={() => deleteReminder(atom)}
      />
    </Stack>
  );
};

export default ReminderItem;
