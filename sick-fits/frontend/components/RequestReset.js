import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

class RequestReset extends Component {
  state = {
    email: ''
  };

  saveToState = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <Mutation mutation={REQUEST_RESET_MUTATION} variables={this.state}>
        {(requestReset, { loading, error, called }) => (
          <Form
            method="post"
            onSubmit={e => {
              e.preventDefault();
              const response = requestReset()
                .then(res => {
                  // console.log(res);
                  this.setState({
                    email: '',
                    password: '',
                    confirmPassword: ''
                  });
                })
                .catch(e => console.log(e));
            }}
          >
            <fieldset aria-busy={loading}>
              <h2>Request Password Reset Email</h2>
              <Error error={error} />
              {!error &&
                !loading &&
                called && <p>Sucess! Check your email for a reset link.</p>}

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
              <button type="submit">Request Email</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default RequestReset;
