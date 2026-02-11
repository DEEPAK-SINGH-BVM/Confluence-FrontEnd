export const createTaskMutation = `
mutation createTask(
  $title: String!
  $description: String
  $status: String!
  $assignedTo: String
) {
  createCanbanTask(
    title: $title
    description: $description
    status: $status
    assignedTo: $assignedTo
  ) {
    id
    title
    description
    status
    assignedTo
    createdAt
  }
}
`;

export const getCanbanTasksQuery = `
query getCanbanTasks {
  getCanbanTask {
    id
    title
    description
    status
    assignedTo
    reporter
    priority
    dueDate
    labels
    image
    attachments
    subtasks {
      title
      status
    }
    comments {
      author
      text
      createdAt
    }
    issueType
    project
    sprint
    epic
    createdAt
  }
}
`;

