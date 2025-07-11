import React from 'react';

const PaymentOrderSummary = ({ totalAmount }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
      <h3 className="font-semibold mb-4">Order Summary</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Total Amount</span>
          <span>{totalAmount.toFixed(2)} €</span>
        </div>
        <div className="border-t border-gray-200 pt-2 mt-2">
          <div className="flex justify-between font-bold">
            <span>Amount to Pay</span>
            <span>{totalAmount.toFixed(2)} €</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentOrderSummary;
