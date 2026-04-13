import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  createPaymentIntent,
  confirmPayment as confirmPaymentApi,
} from "../../api/paymentApi";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const cardElementOptions = {
  hidePostalCode: true,
  style: {
    base: {
      fontSize: "16px",
      color: "#1f2937",
      "::placeholder": {
        color: "#9ca3af",
      },
    },
    invalid: {
      color: "#d32f2f",
    },
  },
};

const CheckoutForm = ({ orderId, amount, onSuccess, onClose }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState("");
  const [loadingIntent, setLoadingIntent] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const initPaymentIntent = async () => {
      try {
        setLoadingIntent(true);
        setError("");

        const response = await createPaymentIntent({ orderId });
        setClientSecret(response.data.clientSecret);
      } catch (err) {
        console.error("Failed to create payment intent:", err);
        setError(
          err?.response?.data?.message || "Failed to initialize payment",
        );
      } finally {
        setLoadingIntent(false);
      }
    };

    if (orderId) {
      initPaymentIntent();
    }
  }, [orderId]);

  const handlePay = async () => {
    if (!stripe || !elements || !clientSecret) return;

    try {
      setProcessing(true);
      setError("");

      const cardElement = elements.getElement(CardElement);

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (result.error) {
        setError(result.error.message || "Payment failed");
        return;
      }

      if (result.paymentIntent?.status === "succeeded") {
        await confirmPaymentApi({
          orderId,
          paymentIntentId: result.paymentIntent.id,
        });

        onSuccess();
      } else {
        setError("Payment was not successful");
      }
    } catch (err) {
      console.error("Payment confirmation failed:", err);
      setError(err?.response?.data?.message || "Payment confirmation failed");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Box sx={{ pt: 1 }}>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        Secure payment for this order
      </Typography>

      <Typography variant="h5" sx={{ fontWeight: 800, mb: 3 }}>
        ₹ {Number(amount || 0).toFixed(2)}
      </Typography>

      {error ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error.includes("200 fils")
            ? "Online payment requires a slightly higher order total. Please increase the total and try again."
            : error}
        </Alert>
      ) : null}

      <Box
        sx={{
          p: 2,
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
          bgcolor: "background.paper",
          mb: 3,
        }}
      >
        <CardElement options={cardElementOptions} />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1.5 }}>
        <Button onClick={onClose} disabled={processing}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handlePay}
          disabled={!stripe || loadingIntent || processing || !clientSecret}
        >
          {processing ? "Processing..." : "Pay Now"}
        </Button>
      </Box>
    </Box>
  );
};

const PaymentDialog = ({ open, onClose, orderId, amount, onSuccess }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Complete Payment</DialogTitle>
      <DialogContent>
        <Elements stripe={stripePromise}>
          <CheckoutForm
            orderId={orderId}
            amount={amount}
            onSuccess={onSuccess}
            onClose={onClose}
          />
        </Elements>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;
