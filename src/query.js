import { gql } from '@apollo/client';

export const NEW_USER = gql`
    mutation PostMutation(
        $name:String!,
        $role:String!,
        $number:String!,
        $position:String!,
        $status:String!,
        $gender:String!,
    ) {
        createUser(name:$name, role:$role ,position:$position ,status:$status ,gender:$gender,number:$number) {
            name
            role
            position
            status
            gender
            number
        }
    }
`;
