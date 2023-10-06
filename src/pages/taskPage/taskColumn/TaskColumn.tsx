import React from "react";
import { TaskType } from "../../../store/taskPageReducer/types";
import TaskKard from "../../../components/taskKard/TaskKard";
import "./taskColumn.sass";
import { Droppable } from "react-beautiful-dnd";
import DraggableTaskCard from "../../../components/taskKard/DraggableTaskCard";

export type ColumnTasksProps = {
  tasks: TaskType[];
  classStyle?: string;
  columnName: string;
};

export default function TaskColumn({
  tasks,
  classStyle,
  columnName,
}: ColumnTasksProps) {
  return (
    <>
      <div className={`task-page-column ${classStyle}`}>
        <p className="column-caption">{columnName}</p>
        <Droppable droppableId={columnName} type="group">
          {(provided) => (
            <div
              className="task-card-wrapper"
              ref={provided.innerRef}
              {...provided.droppableProps}>
              {tasks.map((task: TaskType, index) => (
                <DraggableTaskCard
                  key={task.taskNumber}
                  index={index}
                  task={task}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </>
  );
}
