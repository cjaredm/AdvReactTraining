import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Router from "next/router";
import Form from "./styles/Form";
import gql from "graphql-tag";
import formatMoney from "../lib/formatMoney";
import Error from "./ErrorMessage";

export const CREATE_ITEM_MUITATION = gql`
  mutation CREATE_ITEM_MUITATION(
    $title: String!
    $description: String!
    $image: String
    $largeImage: String
    $price: Int!
  ) {
    createItem(
      title: $title
      description: $description
      image: $image
      largeImage: $largeImage
      price: $price
    ) {
      id
    }
  }
`;

class CreateItem extends Component {
  state = {
    title: "",
    description: "",
    image: "",
    largeImage: "",
    price: 0
  };

  handleChange = ({ target }) => {
    const { name, type, value } = target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  render() {
    return (
      <Mutation mutation={CREATE_ITEM_MUITATION} variables={this.state}>
        {(createItem, { loading, error }) => (
          <Form
            onSubmit={async e => {
              // Stop form from submitting
              e.preventDefault();
              // Call mutation
              const response = await createItem();
              // Send them to item page
              Router.push({
                pathname: "/item",
                query: { id: response.data.createitem.id }
              });
            }}
          >
            <Error error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="title">
                Title
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Title"
                  required
                  value={this.state.title}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="description">
                Description
                <textarea
                  type="text"
                  id="description"
                  name="description"
                  placeholder="description"
                  required
                  value={this.state.description}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="image">
                Image
                <input
                  type="text"
                  id="image"
                  name="image"
                  placeholder="image"
                  required
                  value={this.state.image}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="largeImage">
                Large Image
                <input
                  type="text"
                  id="largeImage"
                  name="largeImage"
                  placeholder="largeImage"
                  required
                  value={this.state.largeImage}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="price">
                Price
                <input
                  type="number"
                  id="price"
                  name="price"
                  placeholder="price"
                  required
                  value={this.state.price}
                  onChange={this.handleChange}
                />
              </label>
              <button type="submit">Submit</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default CreateItem;
