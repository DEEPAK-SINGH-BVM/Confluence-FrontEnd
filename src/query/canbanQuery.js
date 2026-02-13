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

export const updateCanbanMutation = ` 
  mutation updateTask(
    $id : ID!,
    $status: Status!
  ){
    updateCanbanTask(
      id: $id
      status: $status
    ){
      id
      title
      description
      status
      assignedTo
      reporter
      priority
      dueDate
      labels
      comments {
        author
        text
        createdAt
      }
      attachments
      subtasks {
        title
        status
      }
      image
      createdAt
      issueType
      project
      sprint
      epic
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

export const createProjectMutation = `
mutation createProject($title: String!) {
  createProject(title: $title) {
    id    
    title
    createdAt
  }
}
`;

export const getProjectsQuery = `
  query getProjects {
    getProjects {
      id
      title
    }
  }
`;
