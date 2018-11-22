import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import { CURRENT_USER_QUERY } from './User';
import SignIn from './SignIn';

export const PleaseSignIn = props => {
  return (
    <Query query={CURRENT_USER_QUERY}>
      {({ data, loading }) => {
        if (loading) return <p>Loading...</p>;
        if (!data.me) {
          return (
            <div>
              <p>Plase Sign In before continuing</p>
              <SignIn />
            </div>
          );
        }
        return props.children;
      }}
    </Query>
  );
};
