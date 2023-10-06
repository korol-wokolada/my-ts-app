import {
  Badge,
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  List,
  ListIcon,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { CheckIcon, DeleteIcon } from "@chakra-ui/icons";
import { MdSettings } from "react-icons/md";

import React, { useEffect, useState } from "react";
import ModalTaskComment from "../modal/ModalTaskComment";
import ModalEditTask from "../modal/ModalEditTask";
import { TaskType } from "../../store/taskPageReducer/types";
import { useAppDispatch } from "../../store";
import { taskPageAction } from "../../store/taskPageReducer/action";
import { Draggable } from "react-beautiful-dnd";
import TaskKard from "./TaskKard";

export type DraggableTaskCardPropsType = {
  task: TaskType;
  index?: number;
};

export default function DraggableTaskCard({
  task,
  index,
}: DraggableTaskCardPropsType) {
  const dragIndex = index ? index : 0;

  return (
    <Draggable draggableId={`${task.taskNumber}`} key={index} index={dragIndex}>
      {(provided, snapshot) => (
        <div
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}>
          <TaskKard task={task} />
        </div>
      )}
    </Draggable>
  );
}
