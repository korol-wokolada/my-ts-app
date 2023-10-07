import { AddCommentPayloadType, CommentType, TaskType } from "./types";

export const ADDTASK = "ADD_TASK";
export const EDITTASK = "EDIT_TASK";
export const ADDCOMMENT = "ADD_COMMENT";
export const ADDREPLY = "ADD_REPLY";
export const ISSUBTASKREADY = "IS_SUBTASK_READY";
export const DELETESUBTASK = "DELETE_SUBTASK";
export const DELETETASK = "DELETE_TASK";
export const CHANGETASKID = "CHANGE_TASK_ID";
export const CHANGETASKCOLUMN = "CHANGE_TASK_COLUMN";
export const ADDTASKSFROMLOCALSTORAGE = "ADD_TASK_FROM_LOCAL_STORAGE";

export const taskPageAction = {
  addTaskAction(task: TaskType) {
    return {
      type: ADDTASK,
      payload: task,
    } as const;
  },

  editTaskAction(payload: TaskType) {
    return {
      type: EDITTASK,
      payload,
    } as const;
  },
  addCommentAction(payload: AddCommentPayloadType) {
    return {
      type: ADDCOMMENT,
      payload,
    } as const;
  },
  addReplyCommentAction(
    parentId: number,
    reply: CommentType,
    cardNumber: string
  ) {
    return {
      type: ADDREPLY,
      payload: { parentId, reply, cardNumber },
    } as const;
  },

  editSubtaskAction(id: number, taskNumber: string) {
    return {
      type: ISSUBTASKREADY,
      payload: { id, taskNumber },
    } as const;
  },
  deleteSubtaskAction(id: number, cardNumber: string) {
    return {
      type: DELETESUBTASK,
      payload: { id, cardNumber },
    } as const;
  },

  deleteTaskAction(cardNumber: string) {
    return {
      type: DELETETASK,
      payload: { cardNumber },
    } as const;
  },
  changeTaskIdAction(
    sourceIndex: number,
    destinationIndex: number,
    carNumber: string
  ) {
    return {
      type: CHANGETASKID,
      payload: { sourceIndex, destinationIndex, carNumber },
    } as const;
  },
  changeTaskColumnAction(
    cardNumber: string,
    newColumn: string,
    destinationIndex: number
  ) {
    return {
      type: CHANGETASKCOLUMN,
      payload: {
        cardNumber,
        newColumn,
        destinationIndex,
      },
    } as const;
  },
  addTasksFromLocalStorageAction(tasks: TaskType[]) {
    return {
      type: ADDTASKSFROMLOCALSTORAGE,
      payload: { tasks },
    } as const;
  },
};
