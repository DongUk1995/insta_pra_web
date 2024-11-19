import styled from "styled-components";
import { FatText } from "../shared";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      ok
    }
  }
`;
const CommentContainer = styled.div`
  margin-top: 7px;
`;
const CommentCaption = styled.span`
  margin-left: 10px;
  a {
    background-color: inherit;
    color: ${(props) => props.theme.accent};
    cursor: pointer;
    & :hover {
      text-decoration: underline;
    }
  }
`;

function Comment({ id, photoId, isMine, author, payload }) {
  const updateDeleteComment = (cache, result) => {
    const {
      data: {
        deleteComment: { ok },
      },
    } = result;
    if (ok) {
      cache.evict({ id: `Comment:${id}` });
      cache.modify({
        id: `Photo:${photoId}`,
        fields: {
          commentNumber(prev) {
            return prev - 1;
          },
        },
      });
    }
  };
  const [deleteCommentMutation] = useMutation(DELETE_COMMENT_MUTATION, {
    variables: {
      id,
    },
    update: updateDeleteComment,
  });
  const onDeleteClick = () => {
    deleteCommentMutation();
  };
  return (
    <CommentContainer>
      <Link to={`/users/${author}`}>
        <FatText>{author}</FatText>
      </Link>
      <FatText>{author}</FatText>
      <CommentCaption>
        {payload?.split(" ").map((word, index) =>
          /#[\w]+/.test(word) ? (
            <React.Fragment key={index}>
              <Link to={`/hashtags/${word}`}>{word}</Link>
            </React.Fragment>
          ) : (
            <React.Fragment key={index}>{word}</React.Fragment>
          )
        )}
      </CommentCaption>
      {isMine ? <button onClick={onDeleteClick}>x</button> : null}
    </CommentContainer>
  ); // dangerouslySetInnerHTML => 텍스트가 아니라 html로 해석될 수 있도록 만들어준다.
}
Comment.prototype = {
  isMine: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
  photoId: PropTypes.number,
  author: PropTypes.string.isRequired,
  payload: PropTypes.string.isRequired,
};
export default Comment;
