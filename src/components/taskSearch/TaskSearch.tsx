import React, { ChangeEvent, useState } from "react";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormLabel,
  Text,
  Input,
  Select,
  Stack,
  Textarea,
  useDisclosure,
  List,
  ListItem,
  IconButton,
  TableContainer,
  Table,
  Thead,
  Th,
  Tr,
  Tbody,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react";
import { useAppSelector } from "../../store";
import { TaskType } from "../../store/taskPageReducer/types";
import TaskKard from "../taskKard/TaskKard";
import { relative } from "path";

export default function TaskSearch() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSearchOnFocus, setIsSearchOnFocus] = useState(false);
  const [findTask, setFindTask] = useState<TaskType[]>();
  const [selectedTask, setSelectedTask] = useState<TaskType>();
  const tasks = useAppSelector((state) => state.taskPage.tasks);

  const searchTask = (value: string) => {
    const str = value.toLowerCase();
    const searchedTasks = tasks.filter(
      (task) =>
        task.taskNumber.match(str) || task.taskCaption.toLowerCase().match(str)
    );
    setFindTask(searchedTasks);
    console.log(searchedTasks);
  };

  function searchChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    searchTask(value);
  }

  function openCardmodal(
    task: TaskType,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    e.preventDefault();
    setSelectedTask(task);
    setIsSearchOnFocus(false);
    onOpen();
  }
  return (
    <>
      <Flex position="relative" width={35 + "%"}>
        <Input
          onFocus={() => setIsSearchOnFocus(true)}
          onChange={(e) => searchChangeHandler(e)}
          placeholder="Search"></Input>
        {isSearchOnFocus && (
          <TableContainer
            zIndex={10}
            bgColor="white"
            position="absolute"
            overflowY="scroll"
            top={10}
            width={100 + "%"}
            height="auto">
            <Table>
              <Thead>
                <Tr>
                  <Th fontSize={1.5 + "vw"} padding={2.5}>
                    TaskNumber
                  </Th>
                  <Th fontSize={1.5 + "vw"} padding={2.5}>
                    TaskCaption
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {!findTask
                  ? tasks.map((task) => (
                      <Tr key={task.taskNumber}>
                        <Th fontSize={1.5 + "vw"} padding={2.5}>
                          <Button
                            onClick={(e) => openCardmodal(task, e)}
                            fontSize={1.5 + "vw"}
                            padding={0}>
                            {task.taskNumber}
                          </Button>
                        </Th>
                        <Th fontSize={1.5 + "vw"} padding={2.5}>
                          <Button
                            onClick={(e) => openCardmodal(task, e)}
                            fontSize={1.5 + "vw"}
                            padding={0}>
                            {task.taskCaption}
                          </Button>
                        </Th>
                      </Tr>
                    ))
                  : findTask?.map((task) => (
                      <Tr key={task.taskNumber}>
                        <Th fontSize={1.5 + "vw"} padding={2.5}>
                          <Button
                            onClick={(e) => openCardmodal(task, e)}
                            fontSize={1.5 + "vw"}
                            padding={0}>
                            {task.taskNumber}
                          </Button>
                        </Th>
                        <Th fontSize={1.5 + "vw"} padding={2.5}>
                          <Button
                            onClick={(e) => openCardmodal(task, e)}
                            fontSize={1.5 + "vw"}
                            padding={0}>
                            {task.taskCaption}
                          </Button>
                        </Th>
                      </Tr>
                    ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
        <Button
          onClick={() => setIsSearchOnFocus(false)}
          m={2}
          size="xs"
          fontSize={1.2 + "vw"}>
          Close
        </Button>
      </Flex>

      {selectedTask && (
        <Modal
          onClose={onClose}
          size="md"
          isOpen={isOpen}
          scrollBehavior="inside">
          <ModalOverlay
            bg="blackAlpha.300"
            backdropFilter="blur(10px) hue-rotate(90deg)"
          />
          <ModalContent>
            <ModalBody>
              <TaskKard task={selectedTask} />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
