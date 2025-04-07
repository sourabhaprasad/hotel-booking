import BookingConfirmation from "@/app/components/BookingConfirmation";

const booking = {
  title: "Cozy Villa by the Beach",
  type: "Villa",
  address: "123 Beach Road",
  city: "Goa",
  state: "Goa",
  pinCode: "403001",
  checkIn: "2025-04-10",
  checkOut: "2025-04-15",
  totalPrice: 17500,
};

const BookingConfirmedPage = () => {
  return (
    <div className="p-6">
      <BookingConfirmation booking={booking} />
    </div>
  );
};

export default BookingConfirmedPage;
