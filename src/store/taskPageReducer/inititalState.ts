import { TaskType } from "./types";

export const initialState = {
  tasks: [
    {
      taskNumber: "1564",
      taskCaption: "caption",
      taskDescription: "taskDescription",
      dateOfCreation: "06.06.06",
      timeInWork: 15,
      dateOfEnd: "25.05.05",
      priority: "priority",
      status: "Queue",
      subtasks: [{ subtaskName: "subtask", ready: true, id: 15 }],
      comment: [
        {
          id: 1,
          author: "User1",

          date: "13 сентября 2023",
          text: "Пример комментария 1",
          replies: [
            {
              id: 2,
              author: "User1",

              date: "13 сентября 2023",
              text: "Пример комментария 1",
            },
            {
              id: 3,
              author: "User2",

              date: "13 сентября 2023",
              text: "Пример комментария 2",
            },
            {
              id: 4,
              author: "User3",

              date: "13 сентября 2023",
              text: "Пример комментария 3",
            },
          ],
        },
        {
          id: 5,
          author: "User2",

          date: "13 сентября 2023",
          text: "Пример комментария 2",
          replies: [
            {
              id: 6,
              author: "User1",

              date: "13 сентября 2023",
              text: "Пример комментария 1",
            },
            {
              id: 7,
              author: "User2",

              date: "13 сентября 2023",
              text: "Пример комментария 2",
            },
            {
              id: 8,
              author: "User3",

              date: "13 сентября 2023",
              text: "Пример комментария 3",
            },
          ],
        },
        {
          id: 9,
          author: "User3",

          date: "13 сентября 2023",
          text: "Пример комментария 3",
          replies: [
            {
              id: 10,
              author: "User1",

              date: "13 сентября 2023",
              text: "Пример комментария 1",
            },
            {
              id: 11,
              author: "User2",

              date: "13 сентября 2023",
              text: "Пример комментария 2",
            },
            {
              id: 12,
              author: "User3",

              date: "13 сентября 2023",
              text: "Пример комментария 3",
            },
          ],
        },
      ],
    } as TaskType,
  ],
};

export type TaskInitialStateType = typeof initialState;

export function mergeDeep(initialState: any, newInitialState: any) {
  const mergedState = { ...initialState };

  for (const key in newInitialState) {
    if (newInitialState.hasOwnProperty(key)) {
      if (
        typeof initialState[key] === "object" &&
        typeof newInitialState[key] === "object"
      ) {
        if (
          Array.isArray(initialState[key]) &&
          Array.isArray(newInitialState[key])
        ) {
          // Если оба значения являются массивами, объединяем их
          mergedState[key] = [
            ...(initialState[key] || []),
            ...(newInitialState[key] || []),
          ];
        } else {
          // Если оба значения объекты, рекурсивно объединяем их
          mergedState[key] = mergeDeep(
            initialState[key] || {},
            newInitialState[key] || {}
          );
        }
      } else if (newInitialState[key] !== undefined) {
        // Просто заменяем значение, если не объекты и не undefined
        mergedState[key] = newInitialState[key];
      }
    }
  }

  return mergedState;
}

export function findTaskIndex<T>(arr: TaskType[], number: T) {
  return arr.findIndex((task: TaskType) => task.taskNumber === number);
}
