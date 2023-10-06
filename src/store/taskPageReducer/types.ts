import { InferActionsType } from "..";
import { taskPageAction } from "./action";

export type TaskType = {
  taskNumber: string;
  taskCaption: string;
  taskDescription: string;
  dateOfCreation: string;
  timeInWork: number;
  dateOfEnd: string;
  priority: string;
  files?: FileList | null | undefined;
  status: string;
  subtasks: SubTaskType[];
  comment: CommentType[];
};
export type SubTaskType = {
  id?: number;
  subtaskName?: string;
  ready: boolean;
};

export type CommentType = {
  id: number;
  author: string;
  date?: string;
  text: string;
  replies: CommentType[];
};

export type AddCommentPayloadType = {
  comment: CommentType;
  cardNumber: string;
};
export type ActionType<T> = {
  type: string;
  payload: T;
};

export type TaskPageActionsType = InferActionsType<typeof taskPageAction>;
