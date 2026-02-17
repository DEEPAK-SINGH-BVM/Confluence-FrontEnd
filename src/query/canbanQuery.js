export const createTaskMutation = `
mutation createTask(
  $title: String!
  $description: String
  $status: String!
  $assignedTo: String
  $reporter: String
  $priority: String
  $dueDate: String
  $labels: [String]
  $subtasks: [SubtaskInput]
  $comments: [CommentInput]
  $issueType: IssueType
  $project: ID!
  $sprint: String
  $epic: String
  $image: String
) {
  createCanbanTask(
    title: $title
    description: $description
    status: $status
    assignedTo: $assignedTo
    reporter: $reporter
    priority: $priority
    dueDate: $dueDate
    labels: $labels
    subtasks: $subtasks
    comments: $comments
    issueType: $issueType
    project: $project
    sprint: $sprint
    epic: $epic
    image: $image
  ) {
    id
    title
    description
    status
    assignedTo
     reporter
    priority
    dueDate
    labels
    subtasks { title status }
    comments { author text createdAt }
    issueType
    project { id name }
    sprint
    epic
    image
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