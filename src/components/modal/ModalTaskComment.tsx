import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Box,
  Flex,
} from "@chakra-ui/react";
import React, { ChangeEvent, useState } from "react";

import Comment from "../comment/Comment";
import store, { useAppDispatch, useAppSelector } from "../../store";
import { taskPageAction } from "../../store/taskPageReducer/action";
import { CommentType } from "../../store/taskPageReducer/types";

export type ModalTaskCommentPropsType = {
  cardNumber: string;
};

export default function ModalTaskComment({
  cardNumber,
}: ModalTaskCommentPropsType) {
  const dispatch = useAppDispatch();

  const [isOpenInput, setIsOpenInput] = useState(false);
  const [value, setValue] = useState<string | null>(null);

  const task = useAppSelector((state) =>
    state.taskPage.tasks.find((task) => task.taskNumber === cardNumber)
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  function changeHandler(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  function submitComment() {
    setIsOpenInput((prev) => !prev);
    if (value) {
      const date = new Date().toDateString();
      console.log(store.getState());
      const newComment = {
        id: Date.now(),
        author: "author",
        avatarUrl: "Avatar",
        date: date,
        text: value,
        replies: [],
      };
      dispatch(
        taskPageAction.addCommentAction({
          comment: newComment,
          cardNumber: cardNumber,
        })
      );
    }
  }
  const handleReplyClick = (comment: CommentType, value: string | null) => {
    if (value) {
      const newReply: CommentType = {
        id: Date.now(),
        text: value,
        author: "Пользователь",
        replies: [],
      };

      dispatch(
        taskPageAction.addReplyCommentAction(comment.id, newReply, cardNumber)
      );
    }
  };
  return (
    <>
      <Button onClick={onOpen} size="xs" fontSize={1 + "vw"}>
        Comment
      </Button>

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
          <ModalHeader>Comments</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {task?.comment?.map((comment, index) => (
              <Comment
                key={index}
                comment={comment}
                cardNumber={cardNumber}
                onReplyClick={handleReplyClick}
              />
            ))}
            {isOpenInput ? (
              <Box>
                <Input
                  placeholder="Write comment"
                  mt={5}
                  onChange={(value) => changeHandler(value)}></Input>
                <Flex gap={5}>
                  <Button
                    type="submit"
                    onClick={submitComment}
                    colorScheme="blue"
                    mt={5}>
                    Submit
                  </Button>
                  <Button
                    onClick={() => setIsOpenInput((prev) => !prev)}
                    colorScheme="orange"
                    mt={5}>
                    Close
                  </Button>
                </Flex>
              </Box>
            ) : (
              <Button onClick={() => setIsOpenInput((prev) => !prev)}>
                Add Comment
              </Button>
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
