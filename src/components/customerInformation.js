import {gql, useMutation} from "@apollo/client";
import React, {useState} from "react";
import {Button, Container, Stack, TextField} from "@mui/material";

export const UPDATE_BUYER_IDENTITY = gql`
  mutation updateCartBuyerIdentity($input: CartBuyerIdentityUpdateInput!) {
    updateCartBuyerIdentity(input: $input) {
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
              shippingMethods {
                id
                label
                price {
                  value
                  displayValue
                  currency
                }
                taxes {
                  value
                  displayValue
                  currency
                }
                total {
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
  }
`;

export const CustomerInformation = () => {
  const [cartId, setCartId] = useState('');
  const [email, setEmail] = useState('dev@rye.com');
  const [phone, setPhone] = useState('4255108551');
  const [firstName, setName] = useState('John');
  const [lastName, setLastName] = useState('Doe');
  const [address1, setAddress1] = useState('7662 159th NE');
  const [address2, setAddress2] = useState('1');
  const [city, setCity] = useState('Redmond');
  const [provinceCode, setProvinceCode] = useState('WA');
  const [country, setCountry] = useState('US');
  const [zip, setZip] = useState('98052');
  const [updateBuyerIdentity, { data: updateBuyerIdentityResult, loading: updateBuyerIdentityLoading }] = useMutation(UPDATE_BUYER_IDENTITY);

  const onSubmitCartInformation = () => {
    const input = {
      id: cartId,
      buyerIdentity: {
        city,
        address1,
        address2,
        firstName,
        lastName,
        email,
        phone,
        postalCode: zip,
        provinceCode,
        countryCode: country,
      },
    };
    updateBuyerIdentity({ variables: { input }})
  };

  return (
    <Container style={{ border: "1px solid black", borderRadius: "20px", marginBottom: "50px", paddingBottom: "10px" }}>
      <h2>Step 5: Add shipping information for the cart</h2>
      <Stack direction="row" style={{ display: "flex", gap: "30px" }}>
        <Stack spacing={1} style={{ width: "300px" }}>
          <TextField id="outlined-basic" label="Cart ID" variant="outlined" value={cartId} onInput={(e) => setCartId(e.target.value)} />
          <Stack direction="row" spacing={1} style={{ width: "300px" }}>
            <TextField id="outlined-basic" label="First name" variant="outlined" value={firstName} onInput={(e) => setName(e.target.value)} />
            <TextField id="outlined-basic" label="Last name" variant="outlined" value={lastName} onInput={(e) => setLastName(e.target.value)} />
          </Stack>
          <TextField id="outlined-basic" label="Email" variant="outlined" value={email} onInput={(e) => setEmail(e.target.value)} />
          <TextField id="outlined-basic" label="Address 1" variant="outlined" value={address1} onInput={(e) => setAddress1(e.target.value)} />
          <TextField id="outlined-basic" label="Address 2" variant="outlined" value={address2} onInput={(e) => setAddress2(e.target.value)} />
          <Stack direction="row" spacing={1} style={{ width: "300px" }}>
            <TextField id="outlined-basic" label="City" variant="outlined" value={city} onInput={(e) => setCity(e.target.value)} />
            <TextField id="outlined-basic" label="State" variant="outlined" value={provinceCode} onInput={(e) => setProvinceCode(e.target.value)} />
          </Stack>
          <Stack direction="row" spacing={1} style={{ width: "300px" }}>
            <TextField id="outlined-basic" label="Zip code" variant="outlined" value={zip} onInput={(e) => setZip(e.target.value)} />
            <TextField id="outlined-basic" label="Country" variant="outlined" value={country} onInput={(e) => setCountry(e.target.value)} />
          </Stack>
          <TextField id="outlined-basic" label="Phone number" variant="outlined" value={phone} onInput={(e) => setPhone(e.target.value)} />
          <Button variant="contained" onClick={onSubmitCartInformation}>Update shipping information for cart</Button>
        </Stack>
        <br/>
        {updateBuyerIdentityLoading && <h3>Loading...</h3>}
        {(updateBuyerIdentityResult && updateBuyerIdentityResult.updateCartBuyerIdentity) && (
          <>
            {
              updateBuyerIdentityResult.updateCartBuyerIdentity.cart.stores.map((store, index) => (
                <div key={index}>
                  <br/>
                  <div><h3>Subtotal: {store.offer.subtotal.displayValue}</h3></div>
                  <div><h3>Variants in cart: </h3></div>
                  <ul>
                    {
                      store.cartLines.map((cartLine, index) => (
                        <li><h4>Variant ID: {cartLine.variant.id}</h4></li>
                      ))
                    }
                  </ul>
                  <div><h3>Store URL: {store.store}</h3></div><br/>
                  <div><h3>Shipping methods: </h3></div>
                  <ul>
                    {
                      store.offer.shippingMethods.map((shippingMethod, index) => (
                        <li>
                          <div key={index}>
                            <h4>Shipping Method #{index + 1}:</h4>
                            <ul>
                              <li><b>Shipping ID: {shippingMethod.id}</b></li>
                              <li><b>Price: {shippingMethod.price.displayValue}</b></li>
                            </ul>
                          </div>
                        </li>
                      ))
                    }
                  </ul>
                </div>
              ))
            }
          </>
        )}
      </Stack>
    </Container>
  )
}