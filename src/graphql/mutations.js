/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPassport = /* GraphQL */ `
  mutation CreatePassport(
    $input: CreatePassportInput!
    $condition: ModelPassportConditionInput
  ) {
    createPassport(input: $input, condition: $condition) {
      userId
      state
      timestamp
      createdAt
      updatedAt
    }
  }
`;
export const updatePassport = /* GraphQL */ `
  mutation UpdatePassport(
    $input: UpdatePassportInput!
    $condition: ModelPassportConditionInput
  ) {
    updatePassport(input: $input, condition: $condition) {
      userId
      state
      timestamp
      createdAt
      updatedAt
    }
  }
`;
export const deletePassport = /* GraphQL */ `
  mutation DeletePassport(
    $input: DeletePassportInput!
    $condition: ModelPassportConditionInput
  ) {
    deletePassport(input: $input, condition: $condition) {
      userId
      state
      timestamp
      createdAt
      updatedAt
    }
  }
`;
