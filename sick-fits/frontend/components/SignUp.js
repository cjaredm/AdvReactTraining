import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';

const SIGN_UP_MUTATION = gql`
  mutation SIGN_UP_MUTATION(
    $name: String!
    $email: String!
    $password: String!
  ) {
    signup(name: $name, email: $email, password: $password) {
      id
      name
      email
    }
  }
`;

class SignUp extends Component {
  state = {
    email: '',
    name: '',
    password: ''
  };

  saveToState = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <Mutation mutation={SIGN_UP_MUTATION} variables={this.state}>
        {(signup, { loading, error }) => (
          <Form
            method="post"
            onSubmit={e => {
              e.preventDefault();
              const response = signup()
                .then(res => {
                  console.log(res);
                  this.setState({ name: '', email: '', password: '' });
                })
                .catch(e => console.log(e));
            }}
          >
            <fieldset aria-busy={loading}>
              <h2>Sign Up For An Account</h2>
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
              <label htmlFor="name">
                Name
                <input
                  type="text"
                  name="name"
                  placeholder="name"
                  value={this.state.name}
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
              <button type="submit">Sign Up</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default SignUp;
