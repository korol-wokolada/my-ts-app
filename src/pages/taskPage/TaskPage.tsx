import React from "react";
import "./taskPage.sass";

import { useAppDispatch, useAppSelector } from "../../store";

import { DragDropContext, DropResult } from "react-beautiful-dnd";
import TaskColumn from "./taskColumn/TaskColumn";
import { taskPageAction } from "../../store/taskPageReducer/action";
import { Helmet } from "react-helmet";

export default function TaskPage() {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.taskPage.tasks);

  const queueTasks = tasks.filter((task) => task.status === "Queue");
  const developmenTasks = tasks.filter((task) => task.status === "Development");
  const doneTasks = tasks.filter((task) => task.status === "Done");

  function handleDragEnd({ destination, source, draggableId }: DropResult) {
    const destinationIndex = destination ? destination.index : 1;

    if (destination?.droppableId) {
      dispatch(
        taskPageAction.changeTaskColumnAction(
          draggableId,
          destination?.droppableId,
          destinationIndex
        )
      );
    }
  }

  return (
    <div>
      <Helmet>
        <title>Task Page</title>
        <meta name="description" content="Описание страницы" />
      </Helmet>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="task-page-wrapper">
          <TaskColumn tasks={queueTasks} columnName="Queue" />
          <TaskColumn
            tasks={developmenTasks}
            classStyle={`add-divider`}
            columnName="Development"
          />
          <TaskColumn tasks={doneTasks} columnName="Done" />
        </div>
      </DragDropContext>
    </div>
  );
}
