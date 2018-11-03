import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';

const SIGN_IN_MUTATION = gql`
  mutation SIGN_IN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      name
      email
    }
  }
`;

class SignIn extends Component {
  state = {
    email: '',
    password: ''
  };

  saveToState = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <Mutation
        mutation={SIGN_IN_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signup, { loading, error }) => (
          <Form
            method="post"
            onSubmit={e => {
              e.preventDefault();
              const response = signup()
                .then(res => {
                  // console.log(res);
                  this.setState({ email: '', password: '' });
                })
                .catch(e => console.log(e));
            }}
          >
            <fieldset aria-busy={loading}>
              <h2>Sign Into Your Account</h2>
              <Error error={error} />

              <label htmlFor="email">
                Email
                <input
                  type="text"
                  name="email"
                  placeholder="email"
                  value={this.state.email}
                  onChange={this.saveToState}
                />
              </label>
              <label htmlFor="password">
                Password
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  value={this.state.password}
                  onChange={this.saveToState}
                />
              </label>
              <button type="submit">Sign In</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default SignIn;
