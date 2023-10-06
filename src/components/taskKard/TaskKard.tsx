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

export type TaskCardPropsType = {
  task: TaskType;
};

export default function TaskKard({ task }: TaskCardPropsType) {
  const dispatch = useAppDispatch();
  const [time, setTime] = useState<string>();

  const timeInWork = () => {
    const creationDate = new Date(task.timeInWork);
    const currentDate = new Date();

    const timeDiff = currentDate.getTime() - creationDate.getTime();

    const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
    const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    setTime(`дней:${days} часов:${hours} минут:${minutes} `);
  };

  useEffect(() => {
    timeInWork();

    const intervalID = setInterval(timeInWork, 60000);
    return () => {
      clearInterval(intervalID);
    };
  });

  function isSubTaskReadyHandler(id: number | undefined, taskNumber: string) {
    if (id) {
      dispatch(taskPageAction.editSubtaskAction(id, taskNumber));
    }
  }

  function deleteSubtaskHandler(id: number | undefined) {
    if (id) {
      dispatch(taskPageAction.deleteSubtaskAction(id, task.taskNumber));
    }
  }

  function deleteTaskHandler(taskNumber: string) {
    dispatch(taskPageAction.deleteTaskAction(taskNumber));
  }

  return (
    <Card maxW="full" padding={5 + "%"}>
      <CardHeader padding={0}>
        <Flex justifyContent="space-between">
          <Box>
            <Text fontSize={1 + "vw"}>{task.dateOfCreation}</Text>

            <Text fontSize={1 + "vw"}>{task.dateOfEnd}</Text>
          </Box>
          <Heading
            size="ml"
            borderRadius={30}
            padding={1}
            fontSize={1.5 + "vw"}>
            {task.status}
          </Heading>
          <Text fontSize={1.5 + "vw"}>{task.taskNumber}</Text>
        </Flex>
      </CardHeader>

      <CardBody padding={0}>
        <Text fontSize={1.5 + "vw"} align="center">
          {task.taskCaption}
        </Text>

        <Text mb={5} fontSize={1 + "vw"}>
          {task.taskDescription}
        </Text>

        <Box mb={5}>
          <List spacing={3}>
            {task.subtasks?.map((subtask) => (
              <ListItem key={subtask.id}>
                <Flex gap={2}>
                  <ListIcon
                    as={subtask.ready ? CheckIcon : MdSettings}
                    width={5 + "%"}
                    height={5 + "%"}
                    color="green.500"
                    onClick={() =>
                      isSubTaskReadyHandler(subtask?.id, task.taskNumber)
                    }
                  />
                  <Text fontSize={1 + "vw"}>{subtask.subtaskName}</Text>

                  <DeleteIcon
                    boxSize={5 + "%"}
                    onClick={() => deleteSubtaskHandler(subtask.id)}
                  />
                </Flex>
              </ListItem>
            ))}
          </List>
        </Box>

        <Flex justifyContent="space-between" width={100 + "%"}>
          <ModalTaskComment cardNumber={task.taskNumber} />
          <ModalEditTask cardNumber={task.taskNumber} />
          <IconButton
            aria-label="delete"
            size="xs"
            icon={
              <DeleteIcon onClick={() => deleteTaskHandler(task.taskNumber)} />
            }
          />
        </Flex>
      </CardBody>

      <CardFooter
        justify="space-between"
        flexWrap="wrap"
        padding={2}
        sx={{
          "& > button": {
            minW: "100%",
          },
        }}>
        <Text fontSize={1 + "vw"}>{time}</Text>

        <Text fontSize={1 + "vw"}>{task.priority}</Text>
      </CardFooter>
    </Card>
  );
}
