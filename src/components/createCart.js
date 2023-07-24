import {gql, useMutation} from "@apollo/client";
import {Button, Container} from "@mui/material";

export const CREATE_CART = gql`
  mutation createCart($input: CartCreateInput!) {
    createCart(input: $input) {
      cart {
        id
      }
    }
  }
`;

export const CreateCart = () => {
  const [createCart, { data: createCartData, loading: createCartLoading }] = useMutation(CREATE_CART);

  const onCartCreate = () => {
    const input = {
      items: {}
    };
    createCart({ variables: { input }})
  };

  return (
    <Container style={{ border: "1px solid black", borderRadius: "20px", marginBottom: "50px", paddingBottom: "20px" }}>
      <h2>Step 3: Create an empty cart</h2>
      <Button variant="contained" onClick={onCartCreate}>Create empty cart</Button>
      {createCartLoading && (<h3 style={{ marginTop: "30px" }}>Loading...</h3>)}
      {(createCartData && createCartData.createCart) && <h3 style={{ marginTop: "30px"}}>Cart ID: {createCartData.createCart.cart.id} </h3>}
    </Container>
  )
}