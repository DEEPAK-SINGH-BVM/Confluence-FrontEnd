export const getCommentQuery = `
  query getComment($taskId: ID!) {
    getComment(taskId: $taskId) {
      id
      authore
      text
      createdAt
    }
  }
`;

export const addCommentMutation = `
  mutation addComment($taskId: ID!, $comment: AddCommentInput!) {
    addComment(taskId: $taskId, comment: $comment) {
      id
      authore
      text
      createdAt
    }
  }
`;
