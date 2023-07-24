import {gql, useMutation} from "@apollo/client";
import React, {useState} from "react";
import {Button, Container, Stack, TextField} from "@mui/material";

export const SELECT_SHIPPING_METHOD = gql`
  mutation ($input: UpdateCartSelectedShippingOptionsInput!) {
    updateCartSelectedShippingOptions(input: $input) {
      cart {
        id
        stores {
          ... on ShopifyStore {
            store
            offer {
              selectedShippingMethod {
                id
                label
                price {
                  displayValue
                  value
                  currency
                }
                taxes {
                  displayValue
                  value
                  currency
                }
                total {
                  displayValue
                  value
                  currency
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const SelectShippingMethod = () => {
  const [cartId, setCartId] = useState('');
  const [store, setStore] = useState("");
  const [shippingId, setShippingId] = useState("");
  const [selectShippingMethod, { data: selectShippingMethodData, loading: selectShippingMethodLoading }] = useMutation(SELECT_SHIPPING_METHOD);
  const [selectedShippingOptions, setSelectedShippingOptions] = useState([]);

  const onSelectShippingMethod = () => {
    if (selectedShippingOptions.find((option) => option.shippingId === shippingId)) {
      console.log("Already selected shipping method for this store.");
    } else {
      setSelectedShippingOptions([...selectedShippingOptions, {
        store: store,
        shippingId: shippingId
      }]);
    }

    const input = {
      id: cartId,
      shippingOptions: [
        {
          store: store,
          shippingId: shippingId
        }
      ]
    };
    selectShippingMethod({ variables: { input }})
  };

  return (
    <Container style={{ border: "1px solid black", borderRadius: "20px", marginBottom: "50px", paddingBottom: "20px" }}>
      <h2>Step 6: Select shipping method</h2>
      <h4>Note: Please select a shipping method for each store if there are multiple stores</h4>
      <Stack direction="row" spacing={1}>
        <TextField id="outlined-basic" label="Cart ID" variant="outlined" value={cartId} onInput={(e) => setCartId(e.target.value)} />
        <TextField id="outlined-basic" label="Store URL" variant="outlined" value={store} onInput={(e) => setStore(e.target.value)} />
        <TextField id="outlined-basic" label="Shipping ID" variant="outlined" value={shippingId} onInput={(e) => setShippingId(e.target.value)} />
        <Button variant="contained" onClick={onSelectShippingMethod}>Submit shipping method selection</Button>
      </Stack>
      {selectShippingMethodLoading && <h3>Loading...</h3>}
      {
        (selectShippingMethodData && selectShippingMethodData.updateCartSelectedShippingOptions) && (
          selectShippingMethodData.updateCartSelectedShippingOptions.cart.stores.map((store, index) => {
            if (store.offer.selectedShippingMethod) {
              return (
                <div key={index}>
                  <br/>
                  <div><h3>Selected shipping method #{index + 1}:</h3></div>
                  <ul>
                    <li><b>Store: {store.store}</b></li>
                    <li><b>Shipping method: {store.offer.selectedShippingMethod.label}</b></li>
                    <li><b>Shipping price: {store.offer.selectedShippingMethod.price.displayValue}</b></li>
                    <li><b>Taxes: {store.offer.selectedShippingMethod.taxes.displayValue}</b></li>
                    <li><b>Total price: {store.offer.selectedShippingMethod.total.displayValue}</b></li>
                  </ul>
                </div>
              )
            }
          })
        )
      }
    </Container>
  )
}