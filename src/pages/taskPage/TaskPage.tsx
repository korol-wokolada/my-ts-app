import React, { useEffect } from "react";
import "./taskPage.sass";

import { useAppDispatch, useAppSelector } from "../../store";
import { Flex } from "@chakra-ui/react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import TaskColumn from "./taskColumn/TaskColumn";
import { taskPageAction } from "../../store/taskPageReducer/action";
import { Helmet } from "react-helmet";
import ModalAddTask from "../../components/modal/ModalAddTask";
import TaskSearch from "../../components/taskSearch/TaskSearch";

export default function TaskPage() {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.taskPage.tasks);

  useEffect(() => {
    const storeState = localStorage.getItem("myAppState");
    if (storeState) {
      dispatch(
        taskPageAction.addTasksFromLocalStorageAction(JSON.parse(storeState))
      );
    }
    return () => {
      localStorage.setItem("myAppState", JSON.stringify(tasks));
    };
  }, []);

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
    <>
      <Helmet>
        <title>Task Page</title>
        <meta name="description" content="Описание страницы" />
      </Helmet>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Flex justifyContent="center" gap={5}>
          <ModalAddTask />
          <TaskSearch />
        </Flex>
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
    </>
  );
}
