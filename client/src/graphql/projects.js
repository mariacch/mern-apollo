import {gql} from '@apollo/client'

//consult get projects
export const GET_PROJECTS=gql`
{
    projects{
        _id
        name
        description
    }
}`
//consult post (create)
export const CREATE_PROJECT = gql`
	mutation CreateProject($name: String!, $description: String!) {
		createProject(name: $name, description: $description) {
			_id
			name
			description
		}
	}
`;

//consult get project
export const GET_PROJECT = gql`
	query getProject($id: ID!) {
		project(_id: $id) {
			_id
			name
			description
			createdAt
			updatedAt
			tasks {
				_id
				title
			}
		}
	}
`;