import config from "../../config";
import { getBkashIdToken } from "../../lib/bkash";

const bookAppointment = async () => {
  // business logic

  const bkashIdToken = await getBkashIdToken();

  if (!bkashIdToken) {
    throw new Error("No Bkash Access Token Found!");
  }

  const bkashCreatePaymentResponse = await fetch(
    `${config.bkash_base_url}/tokenized/checkout/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application / json",
        Authorization: bkashIdToken,
        "X-App-Key": config.bkash_app_key,
      },
      body: JSON.stringify({      
        mode: "0000",
        payerReference: "0173499999",
        callbackURL: `${config.bkash_callback_url}//appointment/book-appointment/payment/callback`,
        amount : "1200",
        currency : "BDT",
        intent : "sale",
        merchantInvoiceNumber : ""
      }),
    },
  );
  

  const bkashCreatePaymentResult = await bkashCreatePaymentResponse.json()

  console.log(bkashCreatePaymentResult)

  return bkashCreatePaymentResult



};

export const AppointmentServices = {
  bookAppointment,
};
