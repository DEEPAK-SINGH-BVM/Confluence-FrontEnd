export const createTaskMutation = `
mutation createTask(
  $title: String!
  $description: String
  $ticket:String
  $status: String!
  $assignedTo: String
  $reporter: String
  $priority: String
  $dueDate: String
  $labels: [String]
  $issueType: IssueType
  $project: ID!
  $sprint: String
  $epic: String
  $image: String
) {
  createCanbanTask(
    title: $title
    description: $description
    ticket:$ticket
    status: $status
    assignedTo: $assignedTo
    reporter: $reporter
    priority: $priority
    dueDate: $dueDate
    labels: $labels
    issueType: $issueType
    project: $project
    sprint: $sprint
    epic: $epic
    image: $image
  ) {
    id
    title
    description
    ticket
    status
    assignedTo
     reporter
    priority
    dueDate
    labels
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
      ticket
      status
      assignedTo
      reporter
      priority
      dueDate
      labels
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
export const getAllCanbanTasksQuery = `
  query getAllCanbanTask {
    getAllCanbanTask {
      id
      title
      description
      ticket
      status
      assignedTo
      reporter
      priority
      dueDate
      labels
      image
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