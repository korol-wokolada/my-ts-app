import React, { useEffect } from "react";
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
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import store, { useAppDispatch } from "../../store";
import { taskPageAction } from "../../store/taskPageReducer/action";
import { SubTaskType, TaskType } from "../../store/taskPageReducer/types";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { idText } from "typescript";

export default function ModalAddTask() {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
    keyName: String(Date.now()),
  });

  const firstField = React.useRef(null);

  const onSubmit = (data: TaskType) => {
    const subtasksWithId = data.subtasks.map((task, index) => ({
      ...task,
      id: Date.now() + index,
    }));

    console.log(subtasksWithId);
    const editDate = {
      ...data,
      taskNumber: String(Date.now()).slice(-5),
      timeInWork: Date.now(),
      comment: [],
      subtasks: subtasksWithId,
    };
    console.log(editDate);
    dispatch(taskPageAction.addTaskAction(editDate));
    onClose();
  };

  return (
    <>
      <Button
        size="sm"
        leftIcon={<AddIcon />}
        colorScheme="teal"
        onClick={onOpen}
        fontSize={1.5 + "vw"}
        width={20 + "%"}>
        Create new task
      </Button>

      <Drawer
        isOpen={isOpen}
        placement="bottom"
        initialFocusRef={firstField}
        onClose={onClose}>
        <DrawerOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <DrawerContent>
            <DrawerCloseButton />

            <DrawerHeader borderBottomWidth="1px">
              Create a new task
            </DrawerHeader>

            <DrawerBody>
              <Stack spacing="24px">
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
                    rules={{
                      required: "Обязательное поле",
                    }}
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
                    rules={{
                      required: "Обязательное поле",
                    }}
                    name="taskDescription"
                    control={control}
                  />
                  {errors.taskDescription && (
                    <Text color="red">{errors.taskDescription?.message}</Text>
                  )}
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
                    onClick={() => append({ subtaskName: "", ready: false })}
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
                            required: "Обязательное поле",
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
                            required: "Обязательное поле",
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
                  <FormLabel htmlFor="status">Task priority</FormLabel>
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
                      rules={{
                        required: "Обязательное поле",
                      }}
                    />
                    {errors.priority && (
                      <Text color="red">{errors.priority?.message}</Text>
                    )}
                  </FormLabel>
                </Box>
              </Stack>
            </DrawerBody>

            <DrawerFooter borderTopWidth="1px">
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue" type="submit">
                Submit
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </form>
      </Drawer>
    </>
  );
}
