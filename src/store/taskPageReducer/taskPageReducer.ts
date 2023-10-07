import {
  ADDTASK,
  EDITTASK,
  ADDCOMMENT,
  ADDREPLY,
  DELETESUBTASK,
  ISSUBTASKREADY,
  DELETETASK,
  CHANGETASKID,
  CHANGETASKCOLUMN,
  ADDTASKSFROMLOCALSTORAGE,
} from "./action";
import {
  TaskInitialStateType,
  initialState,
  mergeDeep,
  findTaskIndex,
} from "./inititalState";
import { CommentType, TaskPageActionsType } from "./types";

function taskReducer(
  state = initialState,
  action: TaskPageActionsType
): TaskInitialStateType {
  switch (action.type) {
    case ADDTASK:
      let newTask = {
        ...action.payload,
      };
      console.log(newTask);
      return {
        ...state,
        tasks: [...state.tasks, newTask],
      };
    case EDITTASK:
      const number = action.payload.taskNumber;
      const taskToMerge = state.tasks.find(
        (task) => task.taskNumber === number
      );

      const taskIndexTOChange = findTaskIndex(state.tasks, number);

      state.tasks[taskIndexTOChange] = mergeDeep(taskToMerge, action.payload);

      return {
        ...state,
        tasks: [...state.tasks],
      };

    case ADDCOMMENT:
      const taskIndexToAddComment = findTaskIndex(
        state.tasks,
        action.payload.cardNumber
      );

      state.tasks[taskIndexToAddComment].comment.push(action.payload.comment);

      return {
        ...state,
      };

    case ADDREPLY:
      const updatedTasks = state.tasks.map((task) => {
        if (task.taskNumber === action.payload.cardNumber) {
          const updateComment = (comments: CommentType[]): CommentType[] => {
            return comments.map((comment) => {
              if (comment.id === action.payload.parentId) {
                return {
                  ...comment,
                  replies: [...(comment.replies || []), action.payload.reply],
                };
              } else if (comment.replies && comment.replies.length > 0) {
                return {
                  ...comment,
                  replies: updateComment(comment.replies),
                };
              }
              return comment;
            });
          };
          return {
            ...task,
            comment: updateComment(task.comment),
          };
        }
        return task;
      });

      return {
        ...state,
        tasks: updatedTasks,
      };

    case ISSUBTASKREADY: {
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.taskNumber === action.payload.taskNumber
            ? {
                ...task,
                subtasks: task.subtasks.map((subtask) =>
                  subtask.id === action.payload.id
                    ? { ...subtask, ready: !subtask.ready }
                    : subtask
                ),
              }
            : task
        ),
      };
    }

    case DELETESUBTASK: {
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.taskNumber === action.payload.cardNumber
            ? {
                ...task,
                subtasks: task.subtasks.filter(
                  (subtask) => subtask.id !== action.payload.id
                ),
              }
            : task
        ),
      };
    }
    case DELETETASK: {
      return {
        ...state,
        tasks: state.tasks.filter(
          (task) => task.taskNumber !== action.payload.cardNumber
        ),
      };
    }
    case CHANGETASKCOLUMN: {
      const taskIndexToChange = findTaskIndex(
        state.tasks,
        action.payload.cardNumber
      );

      state.tasks[taskIndexToChange].status = action.payload.newColumn;

      return {
        ...state,
        tasks: [...state.tasks],
      };
    }

    case ADDTASKSFROMLOCALSTORAGE: {
      return {
        ...state,
        tasks: [...action.payload.tasks],
      };
    }
    default:
      return state;
  }
}

export default taskReducer;
