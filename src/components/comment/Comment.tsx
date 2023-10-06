import {
  Box,
  Flex,
  Avatar,
  Text,
  Input,
  Button,
  Tooltip,
} from "@chakra-ui/react";
import { FaReply } from "react-icons/fa";
import { CommentType } from "../../store/taskPageReducer/types";
import { ChangeEvent, useState } from "react";

export type CommentPropsType = {
  comment: CommentType;
  cardNumber: string;
  onReplyClick: (comment: CommentType, value: string | null) => void;
};

function Comment({ comment, cardNumber, onReplyClick }: CommentPropsType) {
  const [isOpenInput, setIsOpenInput] = useState(false);
  const [value, setValue] = useState<string | null>(null);
  function changeHandler(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  return (
    <Box borderWidth="1px" borderRadius="md" p={3} mb={1}>
      <Flex align="center">
        <Avatar name={comment.author} src="src" size="sm" mr={2} />
        <Tooltip label={comment.author} aria-label="A tooltip">
          {`${comment.author.slice(0, 4)}...`}
        </Tooltip>

        <Text fontSize="sm" ml={2} color="gray.500">
          {comment.date}
        </Text>
      </Flex>
      <Text mt={2}>{comment.text}</Text>

      <Button
        size="sm"
        leftIcon={<FaReply />}
        onClick={() => setIsOpenInput((prev) => !prev)}
        variant="link">
        Reply
      </Button>
      {isOpenInput && (
        <Box>
          <Input
            placeholder="Write comment"
            mt={5}
            onChange={(value) => changeHandler(value)}></Input>
          <Flex gap={5}>
            <Button
              type="submit"
              colorScheme="blue"
              mt={5}
              onClick={() => {
                onReplyClick(comment, value);
                setIsOpenInput((prev) => !prev);
              }}>
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
      )}

      {comment.replies?.map((reply) => (
        <Comment
          key={reply.id}
          comment={reply}
          onReplyClick={onReplyClick}
          cardNumber={cardNumber}
        />
      ))}
    </Box>
  );
}

export default Comment;
