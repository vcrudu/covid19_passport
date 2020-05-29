/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPassport = /* GraphQL */ `
  query GetPassport($id: ID!) {
    getPassport(id: $id) {
      userId
      state
      timestamp
      createdAt
      updatedAt
    }
  }
`;
export const listPassports = /* GraphQL */ `
  query ListPassports(
    $filter: ModelPassportFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPassports(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        userId
        state
        timestamp
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
