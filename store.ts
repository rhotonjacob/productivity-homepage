import { atom } from "jotai";
import type { PrimitiveAtom } from "jotai";

export interface Task {
  message: string;
  isCrossed: boolean;
}

export const tasksAtom = atom<PrimitiveAtom<Task>[]>([]);

export interface Reminder extends Task {
  timer: number;
}

export const remindersAtom = atom<PrimitiveAtom<Reminder>[]>([]);
