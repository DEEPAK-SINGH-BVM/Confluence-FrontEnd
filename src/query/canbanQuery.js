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
       project {
        id
        name
      }
      sprint
      epic
    }  
  }
`;


// export const getAllCanbanTasksQuery = `
// query getCanbanTask($projectId: ID!) {
//   getCanbanTask(projectId: $projectId) {
//     id
//     title
//     description
//     status
//     assignedTo
//     reporter
//     priority
//     dueDate
//     labels
//     image
//     attachments
//     subtasks {
//       title
//       status
//     }
//     comments {
//       author
//       text
//       createdAt
//     }
//     issueType
//     project {
//       id
//       name
//     }
//     sprint
//     epic
//     createdAt
//   }
// }
// `;
export const getAllCanbanTasksQuery = `
  query getAllCanbanTask {
    getAllCanbanTask {
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
      project {
        id
        name
      }
      sprint
      epic
      createdAt
    }
  }
`;

export const createProjectMutation = `
  mutation createProject($name: String!) {
    createProject(name: $name) {
      id
      name
    }
  }
`;

export const getProjectsQuery = `
  query getAllProjects {
    getAllProjects {
      id
      name
    }
  }
`;