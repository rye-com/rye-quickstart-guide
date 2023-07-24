import React, {useEffect, useState} from "react";
import {RyePay} from "@rye-api/rye-pay";
import {Button, Container, Stack, TextField} from "@mui/material";

const ryePay = new RyePay();
const apiKey = "<RYE_API_TOKEN>";

export const Payment = () => {
  const [cartId, setCartId] = useState('');
  const [firstName, setName] = useState('John');
  const [month, setMonth] = useState('04');
  const [year, setYear] = useState('2025');
  const [lastName, setLastName] = useState('Doe');
  const [address1, setAddress1] = useState('7662 159th NE');
  const [address2, setAddress2] = useState('1');
  const [city, setCity] = useState('Redmond');
  const [state, setState] = useState('WA');
  const [country, setCountry] = useState('US');
  const [zip, setZip] = useState('98052');
  const [phone, setPhone] = useState('4255108551');
  const [submitResult, setSubmitResult] = useState(null);
  const [loadingResult, setLoadingResult] = useState(false);

  useEffect(() => {
    const loadRyePay = () => {
      ryePay.init({
        apiKey,
        environment: 'prod',
        cvvEl: 'payment-cvv',
        numberEl: 'payment-number',
        onReady: () => {
          ryePay.setStyle(
            'number',
            'display:inline; width: 400px; height: 50px; border-radius: 3px; border: 1px solid #ccc;',
          );
          ryePay.setStyle(
            'cvv',
            'display: inline; width: 400px; height: 50px; border-radius: 3px; border: 1px solid #ccc;',
          );
          ryePay.setValue('number', 4242424242424242);
          ryePay.setValue('cvv', 123);
        },
        onErrors: (errors) => {
          for (const { key, message, attribute } of errors) {
            console.log(`new error: ${key}-${message}-${attribute}`);
            alert(`new error: ${key}-${message}-${attribute}`)
          }
        },
        enableLogging: true,
        onIFrameError: (err) => {
          console.log(`frameError: ${JSON.stringify(err)}`);
        },
        onCartSubmitted: (result) => {
          setLoadingResult(false);
          let displayResult = "";
          result.cart.stores.map((store) => {
            displayResult += `Submission status for the store ${store.store.store}: ${store.status}\n`;
          });
          setSubmitResult(displayResult);
        },
      });
    };
    loadRyePay();
  }, []);

  const submit = () => {
    ryePay.submit({
      first_name: firstName,
      last_name: lastName,
      month,
      year,
      cartId,
      address1,
      address2,
      zip,
      city,
      country,
      state,
      phone_number: phone,
      shopperIp: '192.168.0.1',
    });
    setLoadingResult(true);
  };

  return (
    <Container style={{ border: "1px solid black", borderRadius: "20px", marginBottom: "50px" }}>
      <h3>Step 7: Payment + Submit cart</h3>
      <h5>Customer information needed for Rye Pay</h5>
      <Stack spacing={1} style={{ width: "300px" }}>
        <TextField id="outlined-basic" label="Cart ID" variant="outlined" value={cartId} onInput={(e) => setCartId(e.target.value)} />
        <Stack direction="row" spacing={1} style={{ width: "300px" }}>
          <TextField id="outlined-basic" label="First name" variant="outlined" value={firstName} onInput={(e) => setName(e.target.value)} />
          <TextField id="outlined-basic" label="Last name" variant="outlined" value={lastName} onInput={(e) => setLastName(e.target.value)} />
        </Stack>
        <TextField id="outlined-basic" label="Address 1" variant="outlined" value={address1} onInput={(e) => setAddress1(e.target.value)} />
        <TextField id="outlined-basic" label="Address 2" variant="outlined" value={address2} onInput={(e) => setAddress2(e.target.value)} />
        <Stack direction="row" spacing={1} style={{ width: "300px" }}>
          <TextField id="outlined-basic" label="City" variant="outlined" value={city} onInput={(e) => setCity(e.target.value)} />
          <TextField id="outlined-basic" label="State" variant="outlined" value={state} onInput={(e) => setState(e.target.value)} />
        </Stack>
        <Stack direction="row" spacing={1} style={{ width: "300px" }}>
          <TextField id="outlined-basic" label="Zip code" variant="outlined" value={zip} onInput={(e) => setZip(e.target.value)} />
          <TextField id="outlined-basic" label="Country" variant="outlined" value={country} onInput={(e) => setCountry(e.target.value)} />
        </Stack>
        <TextField id="outlined-basic" label="Phone number" variant="outlined" value={phone} onInput={(e) => setPhone(e.target.value)} />
      </Stack>
      <h5>Credit card information needed</h5>
      <Stack spacing={1} style={{ width: "400px" }}>
        <div style={{ height: "100px"}}>
          Card number:
          <div id="payment-number" />
        </div>
        <div style={{ height: "100px"}}>
          CVV:
          <div id="payment-cvv" />
        </div>
        <Stack direction="row" spacing={1}>
          <TextField id="outlined-basic" label="Expiration Month (eg. '04')" variant="outlined" value={month} onInput={(e) => setMonth(e.target.value)} />
          <TextField id="outlined-basic" label="Expiration Year (eg. '2025')" variant="outlined" value={year} onInput={(e) => setYear(e.target.value)} />
        </Stack>
        <Button variant="contained" onClick={submit}>Submit cart!</Button>
      </Stack>
      <br/>
      {loadingResult && (
        <div style={{ paddingBottom: "20px"}}>
          <h3>Loading result...</h3>
        </div>
      )}
      {
        submitResult && (
          <div style={{ paddingBottom: "20px"}}>
            <h3>Submit result:</h3>
            {submitResult}
          </div>
        )
      }
    </Container>
  )
}