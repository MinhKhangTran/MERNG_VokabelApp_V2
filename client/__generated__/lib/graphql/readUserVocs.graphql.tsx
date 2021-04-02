/* 49e53f2cff4433a31648ed64de53a2c2b4d1b7f5
 * This file is automatically generated by graphql-let. */

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Mongo id scalar type */
  ObjectId: any;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createVoc: Vokabel;
  deleteVok: Scalars['Boolean'];
  login: UserResponse;
  register: UserResponse;
  udpateVok: Vokabel;
};


export type MutationCreateVocArgs = {
  input: VokabelInput;
};


export type MutationDeleteVokArgs = {
  vokId: Scalars['ObjectId'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationUdpateVokArgs = {
  input: VokabelInput;
};


export type Query = {
  __typename?: 'Query';
  getLoggedUser?: Maybe<User>;
  readUserVoks: Array<Vokabel>;
  readVoc: Vokabel;
  readVocs: Array<Vokabel>;
  user?: Maybe<User>;
};


export type QueryReadUserVoksArgs = {
  userId: Scalars['ObjectId'];
};


export type QueryReadVocArgs = {
  vokId: Scalars['ObjectId'];
};


export type QueryUserArgs = {
  userId: Scalars['ObjectId'];
};

export type RegisterInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

/** User */
export type User = {
  __typename?: 'User';
  _id: Scalars['ObjectId'];
  email: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  token?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

/** Vokabel */
export type Vokabel = {
  __typename?: 'Vokabel';
  _id: Scalars['ObjectId'];
  creator: User;
  deutsch: Scalars['String'];
  koreanisch: Scalars['String'];
};

export type VokabelInput = {
  _id?: Maybe<Scalars['ObjectId']>;
  deutsch: Scalars['String'];
  koreanisch: Scalars['String'];
};

export type Read_User_VocsQueryVariables = Exact<{
  userId: Scalars['ObjectId'];
}>;


export type Read_User_VocsQuery = (
  { __typename?: 'Query' }
  & { readUserVoks: Array<(
    { __typename?: 'Vokabel' }
    & Pick<Vokabel, '_id' | 'deutsch' | 'koreanisch'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, '_id' | 'username' | 'email'>
    ) }
  )> }
);


export const Read_User_VocsDocument = gql`
    query READ_USER_VOCS($userId: ObjectId!) {
  readUserVoks(userId: $userId) {
    _id
    deutsch
    koreanisch
    creator {
      _id
      username
      email
    }
  }
}
    `;

/**
 * __useRead_User_VocsQuery__
 *
 * To run a query within a React component, call `useRead_User_VocsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRead_User_VocsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRead_User_VocsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useRead_User_VocsQuery(baseOptions: Apollo.QueryHookOptions<Read_User_VocsQuery, Read_User_VocsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Read_User_VocsQuery, Read_User_VocsQueryVariables>(Read_User_VocsDocument, options);
      }
export function useRead_User_VocsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Read_User_VocsQuery, Read_User_VocsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Read_User_VocsQuery, Read_User_VocsQueryVariables>(Read_User_VocsDocument, options);
        }
export type Read_User_VocsQueryHookResult = ReturnType<typeof useRead_User_VocsQuery>;
export type Read_User_VocsLazyQueryHookResult = ReturnType<typeof useRead_User_VocsLazyQuery>;
export type Read_User_VocsQueryResult = Apollo.QueryResult<Read_User_VocsQuery, Read_User_VocsQueryVariables>;