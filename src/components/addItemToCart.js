import {gql, useMutation} from "@apollo/client";
import React, {useState} from "react";
import {Button, Container, Stack, TextField} from "@mui/material";

export const ADD_ITEM_TO_CART = gql`
  mutation addCartItems($input: CartItemsAddInput!) {
    addCartItems(input: $input) {
      cart {
        id
        stores {
          ... on ShopifyStore {
            errors {
              code
              message
              details {
                variantIds
              }
            }
            store
            cartLines {
              quantity
              variant {
                id
              }
            }
            offer {
              subtotal {
                value
                displayValue
                currency
              }
            }
          }
        }
      }
    }
  }
`;

export const AddItemToCart = () => {
  const [cartId, setCartId] = useState('');
  const [variantId, setVariantId] = useState('');
  const [quantity, setQuantity] = useState();
  const [addItemToCart, { data: addItemToCartData, loading: addItemToCartLoading }] = useMutation(ADD_ITEM_TO_CART);

  const onAddItemToCart = () => {
    const input = {
      id: cartId,
      items: {
        shopifyCartItemsInput: [{
          quantity: Number(quantity),
          variantId: variantId
        }]
      }
    };
    addItemToCart({ variables: { input }})
  };

  return (
    <Container style={{ border: "1px solid black", borderRadius: "20px", marginBottom: "50px", paddingBottom: "20px" }}>
      <h2>Step 4: Add an item to cart</h2>
      <Stack direction="row" spacing={1}>
        <TextField id="outlined-basic" label="Cart ID" variant="outlined" value={cartId} onInput={(e) => setCartId(e.target.value)} />
        <TextField id="outlined-basic" label="Variant ID" variant="outlined" value={variantId} onInput={(e) => setVariantId(e.target.value)} />
        <TextField id="outlined-basic" label="Quantity" variant="outlined" value={quantity} onInput={(e) => setQuantity(e.target.value)} />
        <Button variant="contained" onClick={onAddItemToCart}>Add item to cart</Button>
      </Stack>
      {addItemToCartLoading && <h3>Adding item to cart...</h3>}
      {(addItemToCartData && addItemToCartData.addCartItems) && <h3>Item added to cart!</h3>}
    </Container>
  )
}