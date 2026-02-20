export const getSubTaskQuery = `
  query getSubtasks($taskId: ID!) {
    getSubtasks(taskId: $taskId) {
      id
      title
      status
      task
      createdAt
    }
  }
`;

export const addSubtaskMutation = `
  mutation addSubtask($taskId: ID!, $subtask: AddSubtaskInput!) {
    addSubtask(taskId: $taskId, subtask: $subtask) {
      id
      title
      createdAt
      task
    }
  }
`;
