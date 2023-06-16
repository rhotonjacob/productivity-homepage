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
  Text,
} from "@chakra-ui/react";
import { atom, useAtom, useSetAtom } from "jotai";
import type { PrimitiveAtom } from "jotai";
import { remindersAtom } from "@/store";
import type { Reminder } from "@/store";
import useCountDown from "@/hooks/useCountDown";

interface ReminderItemProps {
  atom: PrimitiveAtom<Reminder>;
}

const ReminderItem = ({ atom }: ReminderItemProps) => {
  const [item] = useAtom(atom);
  const setReminders = useSetAtom(remindersAtom);

  const { hours, minutes, seconds } = useCountDown(item.timeToComplete); // return total as well

  const dismissReminder = (reminder: PrimitiveAtom<Reminder>) =>
    setReminders((prev) => prev.filter((item) => item !== reminder));

  return (
    <Box>
      <Flex justifyContent="space-between">
        <Text>{item.message}</Text>
        <Text>{`${hours}:${minutes}:${seconds}`}</Text>
      </Flex>
      <IconButton
        colorScheme="red"
        aria-label="dismiss reminder"
        icon={<CloseIcon />}
        onClick={() => dismissReminder(atom)}
      />
    </Box>
  );
};

const ReminderList = () => {
  const [reminders, setReminders] = useAtom(remindersAtom);

  const addReminder = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = e.currentTarget.message.value;
    e.currentTarget.message.value = "";
    const timeToComplete = e.currentTarget.timeToComplete.value;
    e.currentTarget.timeToComplete.value = "";
    setReminders((prev) => [
      ...prev,
      atom<Reminder>({ message, timeToComplete }),
    ]);
  };

  return (
    <Box>
      <form onSubmit={addReminder}>
        <Flex>
          <FormControl>
            <Input
              type="text"
              name="message"
              placeholder="Add a new reminder..."
            />
          </FormControl>
          <FormControl>
            <Input type="number" name="timeToComplete" />
          </FormControl>
          <Button type="submit">Add</Button>
        </Flex>
      </form>
      <Stack direction="column">
        {reminders.map((reminder, i) => (
          <div key={i}>
            <ReminderItem atom={reminder} />
          </div>
        ))}
      </Stack>
    </Box>
  );
};

export default ReminderList;
