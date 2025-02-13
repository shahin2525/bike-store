/* eslint-disable @typescript-eslint/no-explicit-any */
import Shurjopay, { PaymentResponse } from 'shurjopay';
import config from '../../config';

const shurjopay = new Shurjopay();

shurjopay.config(
  config.sp.sp_endpoint!,
  config.sp.sp_username!,
  config.sp.sp_password!,
  config.sp.sp_prefix!,
  config.sp.sp_return_url!,
);

console.log(shurjopay);
const makePaymentAsync = async (
  paymentPayload: any,
): Promise<PaymentResponse> => {
  return new Promise((resolve, reject) => {
    shurjopay.makePayment(
      paymentPayload,
      (response) => resolve(response),
      (error) => reject(error),
    );
  });

  //   const paymentResult = await shurjopay.makePayment(
  //     paymentPayload,
  //     (response) => {
  //       sendResponse(res, {
  //         statusCode: 200,
  //         message: "Order placed successfully",
  //         data: response,
  //       });
  //     },
  //     (error) => console.log(error)
  //   );
  //   return paymentResult;
};

export const orderUtils = {
  makePaymentAsync,
};
