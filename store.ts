import { atom } from "jotai";
import type { PrimitiveAtom } from "jotai";

export interface Task {
  message: string;
  isComplete: boolean;
}

export const tasksAtom = atom<PrimitiveAtom<Task>[]>([]);

export interface Reminder {
  message: string;
  timeToComplete: number;
}

export const remindersAtom = atom<PrimitiveAtom<Reminder>[]>([]);
