import React, {useState} from "react";
import {gql, useLazyQuery} from "@apollo/client";
import {Box, Button, Card, CardContent, CardMedia, Container, Stack, TextField, Typography} from "@mui/material";

const FETCH_PRODUCT_DATA = gql`
  query FetchProductData($input: ProductByIDInput!) {
    productByID(input: $input) {
      marketplace
      title
      vendor
      price {
        displayValue
      }
      images {
        url
      }
      variants {
        ... on ShopifyVariant {
          id
        } 
        title
      }
    }
  }
`;

export const FetchProductData = () => {
  const [productId, setProductId] = useState('');
  const [fetchProduct, { data: fetchProductData, loading: fetchProductLoading }] = useLazyQuery(FETCH_PRODUCT_DATA);

  const onFetchProduct = () => {
    const input = {
      id: productId,
      marketplace: "SHOPIFY",
    };
    fetchProduct({ variables: { input }})
  };

  return (
    <Container style={{ border: "1px solid black", borderRadius: "20px", marginBottom: "50px", paddingBottom: "20px" }}>
      <h2>Step 2: Get product data</h2>
      <Stack direction="row" spacing={1}>
        <TextField id="outlined-basic" label="Product ID" variant="outlined" value={productId} onInput={(e) => setProductId(e.target.value)} />
        <Button variant="contained" onClick={onFetchProduct}>Fetch product details</Button>
      </Stack>
      {fetchProductLoading && (<h3 style={{ marginTop: "30px" }}>Loading...</h3>)}
      {(fetchProductData && fetchProductData.productByID) && (
        <>
          <Card sx={{ display: 'flex', width: "500px", border: "1px solid black", borderRadius: "12px", padding: "10px", marginTop: "20px" }}>
            <CardMedia component="img" sx={{ width: 151, border: "1px solid black", borderRadius: "12px" }} image={fetchProductData.productByID.images[0].url}/>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <b>Title: {fetchProductData.productByID.title}</b><br/><br/>
                <b>Vendor: {fetchProductData.productByID.vendor}</b><br/><br/>
                <b>Price: {fetchProductData.productByID.price.displayValue}</b><br/><br/>
              </CardContent>
            </Box>
          </Card>
          <Stack style={{ paddingTop: "30px" }}>
            <h4>Available variants:</h4>
            {fetchProductData.productByID.variants.map((variant) => (<div key={variant.id}><b>Variant ID: {variant.id}, Title: {variant.title}</b></div>))}
          </Stack>
        </>
      )}
    </Container>
  )
}