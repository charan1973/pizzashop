const AddressPreview = ({address}) => {
  return (
    <div>
      <p>{address.buildingNumber}</p>
      <p>{address.streetName}</p>
      <p>{address.area}</p>
      <p>{address.city}</p>
      <p>{address.zipcode}</p>
      <p>{address.phoneNumber}</p>
    </div>
  );
};

export default AddressPreview;
