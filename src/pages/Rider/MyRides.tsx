import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCancelRideMutation, useGetMyRidesQuery } from "@/redux/features/rider/riderApi";

export const MyAllRides = () => {
  const { data, isLoading , refetch} = useGetMyRidesQuery(undefined);
  const [cancelRide] = useCancelRideMutation();

  const [rideToCancel, setRideToCancel] = useState<string | null>(null);

  const handleCancelRide = async () => {
    if (!rideToCancel) return;
    await cancelRide({ id: rideToCancel });
    setRideToCancel(null);
    refetch()
  };

  const rides = data?.rides || [];

  if (isLoading) return <p className="text-center p-10">Loading...</p>;

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-semibold">My Rides</h1>

      {/* Desktop Table */}
      <div className="hidden md:block">
        <table className="w-full border rounded-lg overflow-hidden text-left">
          <thead className="bg-black">
            <tr>
              <th className="p-3">Pickup</th>
              <th className="p-3">Destination</th>
              <th className="p-3">Fare</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {rides.map((ride) => (
              <tr key={ride._id} className="border-b">
                <td className="p-3">{ride.pickupLocation}</td>
                <td className="p-3">{ride.destinationLocation}</td>
                <td className="p-3">${ride.fare}</td>
                <td className="p-3 capitalize">{ride.status}</td>
                <td className="p-3 text-right">
                  {ride.status === "requested" && (
                    <Button
                      size="sm"
                      
                      className="bg-red-600"
                      onClick={() => setRideToCancel(ride._id)}
                    >
                      Cancel
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="md:hidden space-y-4">
        {rides.map((ride) => (
          <Card key={ride._id} className="shadow-md">
            <CardContent className="p-4 space-y-3">
              <p><strong>Pickup:</strong> {ride.pickupLocation}</p>
              <p><strong>Destination:</strong> {ride.destinationLocation}</p>
              <p><strong>Fare:</strong> ${ride.fare}</p>
              <p><strong>Status:</strong> <span className="capitalize">{ride.status}</span></p>

              {ride.status === "requested" && (
                <Button
                  className="w-full bg-red-600"
                  onClick={() => setRideToCancel(ride._id)}
                >
                  Cancel Ride
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Confirmation Modalllllllll */}
      <Dialog open={!!rideToCancel} onOpenChange={() => setRideToCancel(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Ride</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to cancel this ride?</p>
          <div className="mt-4 flex justify-end gap-3">
            <Button variant="outline" onClick={() => setRideToCancel(null)}>
              No
            </Button>
            <Button className="bg-red-600" onClick={handleCancelRide}>
              Yes, Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};


