import React, { useState, useEffect } from "react";
import "./Payment.css";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import CurrencyFormat from "react-currency-format";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { getBasketTotal } from "./reducer";
import axios from "./axios";
import { db } from "./firebase";

function Payment() {
  const history = useHistory();
  const [{ basket, user }, dispatch] = useStateValue();

  const stripe = useStripe();
  const elements = useElements();
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    //generate the special stripe secret which allows us to chage a customer
    const getClientSecret = async () => {
      const response = await axios({
        methos: "post",
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });

      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [basket]);
  console.log("the secret is >>", clientSecret);
  console.log("person", user);

  const handleSubmit = async (e) => {
    //do all the fancy stuff ...
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        //paymentIntent= payment confirmation
        db.collection("user")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });
        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: "EMPTY_BASKET",
        });
        history.replace("/orders");
      });
  };

  const handleChange = (e) => {
    //listen to changge on the card element
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          {" "}
          Checkout (<Link to="/checkout"> {basket?.length} items </Link>){" "}
        </h1>
        {/* payment section delivery address */}
        <div className="payment__section">
          <div className="payment__title">
            <h3> Delivery address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email} </p>
            <p>123 React lane</p>
            <p>los angeles , CA </p>
          </div>
        </div>

        {/* payment section -review items */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        {/* payment section - payment method */}
        <div className="payment__section">
          <div className="payment__title">
            <h3> Payment Method </h3>
          </div>
          <div className="payment__details">
            {/* stripe funtionality comes here */}
            <form onSubmit={() => handleSubmit()}>
              <CardElement onChange={() => handleChange()} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value} </h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeperator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span> {processing ? <p>Processing </p> : "Buy Now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
