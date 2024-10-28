import styled from "styled-components";
import { FatText } from "../shared";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

const CommentContainer = styled.div``;
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

function Comment({ author, payload }) {
  // const cleanPayload = sanitizeHtml(
  //   payload?.replace(/#[\w]+/g, "<mark>$&</mark>"),
  //   {
  //     allowedTags: ["mark"],
  //   }
  // ); // mark라는 html 태그 둘러싸서 Html를 보호해준다. 즉 mark로 둘러싸인 것만 신뢰를 할 수 있따.
  return (
    <CommentContainer>
      <FatText>{author}</FatText>
      <CommentCaption>
        {payload?.split(" ").map((word, index) =>
          /#[\w]+/.test(word) ? (
            <React.Fragment key={index}>
              <Link to={`/hashtags/${word}`}>{word}</Link>{" "}
            </React.Fragment>
          ) : (
            <React.Fragment key={index}>{word} </React.Fragment>
          )
        )}
      </CommentCaption>
    </CommentContainer>
  ); // dangerouslySetInnerHTML => 텍스트가 아니라 html로 해석될 수 있도록 만들어준다.
}
Comment.prototype = {
  author: PropTypes.string.isRequired,
  payload: PropTypes.string.isRequired,
};
export default Comment;
