import { atom } from "jotai";
import type { PrimitiveAtom } from "jotai";

export type Task = {
  message: string;
  isComplete: boolean;
};

export const tasksAtom = atom<PrimitiveAtom<Task>[]>([]);
