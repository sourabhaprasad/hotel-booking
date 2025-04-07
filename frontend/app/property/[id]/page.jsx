import PropertyDetails from "@/app/components/PropertyDetails";

// Dummy property for now — replace with fetch in the future
const property = {
  title: "Cozy Villa by the Beach",
  description: "Beautiful sea-facing villa with pool.",
  type: "Villa",
  guestsAllowed: 6,
  bedrooms: 3,
  amenities: ["Pool", "Wi-Fi", "Kitchen"],
  address: "123 Beach Road, Goa",
  contact: "9876543210",
  pricePerNight: 3500,
};

const PropertyPage = () => {
  return (
    <div className="p-6">
      <PropertyDetails property={property} />
    </div>
  );
};

export default PropertyPage;
