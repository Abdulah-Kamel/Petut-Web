import React from 'react';

const AddressesTab = ({ addresses }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Addresses</h2>
        <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
          Add New Address
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map(address => (
          <div key={address.id} className="border border-gray-200 rounded-lg p-4 relative">
            {address.isDefault && (
              <span className="absolute top-4 right-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Default
              </span>
            )}
            <h3 className="font-semibold text-lg mb-1">{address.name}</h3>
            <p className="text-gray-600 mb-4">
              {address.address}<br />
              {address.city}, {address.postalCode}
            </p>
            <div className="flex space-x-3">
              <button className="text-primary hover:underline text-sm">
                Edit
              </button>
              <button className="text-red-500 hover:underline text-sm">
                Delete
              </button>
              {!address.isDefault && (
                <button className="text-primary hover:underline text-sm">
                  Set as Default
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddressesTab;
