import React, {useState} from "react";
import {gql, useMutation} from "@apollo/client";
import {Button, Container, Stack, TextField} from "@mui/material";

const REQUEST_PRODUCT = gql`
  mutation RequestProductByURL($input: RequestProductByURLInput!) {
    requestProductByURL(input: $input) {
      productID
    }
  }
`;

export const RequestProduct = () => {
  const [productUrl, setProductUrl] = useState('');
  const [requestProduct, { data: requestProductData, loading: loadingProductData }] = useMutation(REQUEST_PRODUCT);

  const onRequestProduct = () => {
    const input = {
      url: productUrl,
      marketplace: "SHOPIFY",
    };
    requestProduct({ variables: { input }})
  };

  return (
    <Container style={{ border: "1px solid black", borderRadius: "20px", marginBottom: "50px", paddingBottom: "20px" }}>
      <h2>Step 1: Add product to Rye</h2>
      Example: <a href="https://www.bbcicecream.com/collections/billionaire-boys-club-x-yankees/products/new-york-yankees-x-bbc-og-nyc-loopwheel-hoodie-navy-f22-jul">https://www.bbcicecream.com/collections/billionaire-boys-club-x-yankees/products/new-york-yankees-x-bbc-og-nyc-loopwheel-hoodie-navy-f22-jul</a><br/><br/>
      <Stack direction="row" spacing={1}>
        <TextField id="outlined-basic" label="Product URL" variant="outlined" value={productUrl} onInput={(e) => setProductUrl(e.target.value)} />
        <Button variant="contained" onClick={onRequestProduct}>Add product to Rye</Button>
      </Stack>
      {loadingProductData && (<h3 style={{ marginTop: "30px" }}>Loading...</h3>)}
      {(requestProductData && requestProductData.requestProductByURL) && (<h3 style={{ marginTop: "30px" }}>Product ID: {requestProductData.requestProductByURL.productID} </h3>)}
    </Container>
  )
}