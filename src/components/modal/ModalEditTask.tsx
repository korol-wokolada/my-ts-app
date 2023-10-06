import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Textarea,
  useDisclosure,
  Text,
  IconButton,
} from "@chakra-ui/react";
import React from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { TaskType } from "../../store/taskPageReducer/types";
import { useAppDispatch, useAppSelector } from "../../store";
import { taskPageAction } from "../../store/taskPageReducer/action";

export type ModalEditTaskPropsType = {
  cardNumber: string;
};

export default function ModalEditTask({ cardNumber }: ModalEditTaskPropsType) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const task = useAppSelector((state) => state.taskPage.tasks).find(
    (obj) => obj.taskNumber === cardNumber
  );

  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<TaskType>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subtasks",
    keyName: "id",
  });

  const firstField = React.useRef(null);

  const onSubmit = (data: TaskType) => {
    const subtasksWithId = data.subtasks
      .filter((task) => {
        if (task.subtaskName) {
          return task.subtaskName.length >= 1;
        }
      })
      .map((task) => ({
        ...task,
        id: Date.now(),
      }));

    const task = { ...data, taskNumber: cardNumber, subtasks: subtasksWithId };

    dispatch(taskPageAction.editTaskAction(task));
    onClose();
  };

  return (
    <>
      <IconButton
        aria-label="edit"
        onClick={onOpen}
        icon={<EditIcon />}
        size="xs"></IconButton>
      <Modal
        onClose={onClose}
        size="xs"
        isOpen={isOpen}
        scrollBehavior="inside">
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader>Change task</ModalHeader>
            <ModalCloseButton />

            <ModalBody>
              <Stack spacing="22px">
                <Box>
                  <FormLabel htmlFor="taskName">Task name</FormLabel>
                  <Controller
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="taskName"
                        placeholder="Please enter task name"
                        ref={firstField}
                      />
                    )}
                    name="taskCaption"
                    control={control}
                  />
                  {errors.taskCaption && (
                    <Text color="red">{errors.taskCaption?.message}</Text>
                  )}
                </Box>

                <Box>
                  <FormLabel htmlFor="taskDescription">
                    Task description
                  </FormLabel>
                  <Controller
                    render={({ field }) => (
                      <Textarea
                        id="taskDescription"
                        {...field}
                        placeholder="Please enter task description"
                      />
                    )}
                    name="taskDescription"
                    control={control}
                  />
                </Box>

                <Box>
                  <FormLabel htmlFor="subtasks">Subtasks</FormLabel>

                  {fields.map((field, index) => (
                    <Box key={field.id}>
                      <Input {...register(`subtasks.${index}.subtaskName`)} />

                      <IconButton
                        aria-label="delete"
                        icon={<DeleteIcon />}
                        onClick={() => remove(index)}
                      />
                    </Box>
                  ))}
                  <IconButton
                    aria-label="add"
                    icon={<AddIcon />}
                    onClick={() =>
                      append({
                        subtaskName: "",
                        ready: false,
                      })
                    }
                  />
                </Box>

                <Box>
                  <Flex>
                    <Box>
                      <FormLabel htmlFor="startDate">
                        Start date
                        <Controller
                          name="dateOfCreation"
                          control={control}
                          render={({ field }) => (
                            <Input
                              {...field}
                              id="startDate"
                              placeholder="DD.MM.YYYY"
                            />
                          )}
                          rules={{
                            pattern: {
                              value: /^(\d{2}\.\d{2}.\d{4})$/,
                              message: "Uncorrect data format",
                            },
                          }}
                        />
                        {errors.dateOfCreation && (
                          <Text color="red">
                            {errors.dateOfCreation?.message}
                          </Text>
                        )}
                      </FormLabel>
                    </Box>

                    <Box>
                      <FormLabel htmlFor="endDate">
                        End date
                        <Controller
                          render={({ field }) => (
                            <Input
                              {...field}
                              id="endDate"
                              placeholder="DD.MM.YYYY"
                            />
                          )}
                          name="dateOfEnd"
                          control={control}
                          rules={{
                            pattern: {
                              value: /^(\d{2}\.\d{2}.\d{4})$/,
                              message: "Uncorrect data format",
                            },
                          }}
                        />
                        {errors.dateOfEnd && (
                          <Text color="red">{errors.dateOfEnd?.message}</Text>
                        )}
                      </FormLabel>
                    </Box>
                  </Flex>
                </Box>

                <Box>
                  <FormLabel htmlFor="status">Task status</FormLabel>
                  <Controller
                    name="status"
                    control={control}
                    defaultValue="Queue"
                    render={({ field }) => (
                      <Select {...field} id="status" maxW={250}>
                        <option value="Queue">Queue</option>
                        <option value="Development">Development</option>
                        <option value="Done">Done</option>
                      </Select>
                    )}
                  />
                </Box>

                <Box>
                  <FormLabel htmlFor="priority">
                    Priority
                    <Controller
                      render={({ field }) => (
                        <Input
                          {...field}
                          id="priority"
                          placeholder="priority"
                        />
                      )}
                      name="priority"
                      control={control}
                    />
                  </FormLabel>
                </Box>
              </Stack>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose} mr={5}>
                Close
              </Button>
              <Button colorScheme="blue" type="submit">
                Submit
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}
