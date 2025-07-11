import React from 'react';

const DeliveryMethodSelector = ({ deliveryMethods, selectedMethod, handleChange }) => {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-4">Delivery Method</h2>
      <div className="space-y-3">
        {deliveryMethods.map(method => (
          <label
            key={method.id}
            className={`block p-4 border rounded-lg cursor-pointer transition-colors ${selectedMethod === method.id ? 'border-primary bg-primary/5' : 'border-gray-200 hover:bg-gray-50'}`}
          >
            <div className="flex items-center">
              <input
                type="radio"
                name="deliveryMethod"
                value={method.id}
                checked={selectedMethod === method.id}
                onChange={handleChange}
                className="h-5 w-5 text-primary focus:ring-primary"
              />
              <div className="ml-3 flex-1">
                <div className="flex justify-between">
                  <span className="font-medium">{method.name}</span>
                  <span className="font-medium">
                    {method.price === 0 ? 'Free' : `${method.price.toFixed(2)} €`}
                  </span>
                </div>
                <p className="text-sm text-gray-500">{method.description}</p>
              </div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default DeliveryMethodSelector;
