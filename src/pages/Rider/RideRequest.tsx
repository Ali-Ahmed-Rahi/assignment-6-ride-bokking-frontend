import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { useRequestRideMutation } from "@/redux/features/rider/riderApi";

export default function RideRequest() {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [fareEstimate, setFareEstimate] = useState(0);
  const [successModal, setSuccessModal] = useState(false);

  const [requestRide, { isLoading }] = useRequestRideMutation();

  const calculateEstimate = () => {
    if (pickup.length < 2 || destination.length < 2) return;
    const base = 50;
    const distance = Math.floor(Math.random() * 10) + 1;
    setFareEstimate(base + distance * 15);
  };

  const handleSubmit = async () => {
    if (!pickup || !destination) return;

    try {
      await requestRide({
        pickupLocation: pickup,
        destinationLocation: destination,
        fare: fareEstimate,
      });

      setSuccessModal(true);
      setPickup("");
      setDestination("");
      setFareEstimate(0);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen p-6 flex justify-center items-start bg-black text-white">
      <Card className="w-full max-w-lg bg-gray-900 border border-gray-800 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Request a Ride 🚖</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Pickup */}
          <div>
            <label className="text-sm">Pickup Location</label>
            <Input
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              placeholder="Enter pickup location"
              className="bg-gray-800 border-gray-700 text-white mt-1"
            />
          </div>

          {/* Destination */}
          <div>
            <label className="text-sm">Destination Location</label>
            <Input
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter destination location"
              className="bg-gray-800 border-gray-700 text-white mt-1"
            />
          </div>

          {/* Fare Estimate */}
          <div className="flex justify-between items-center mt-4 bg-gray-800 px-4 py-3 rounded-lg border border-gray-700">
            <span className="text-gray-300">Estimated Fare:</span>
            <span className="text-xl font-semibold">{fareEstimate || "--"} BDT</span>
          </div>

          <Button
            onClick={calculateEstimate}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Estimate Fare
          </Button>

          {/* Request Ride */}
          <Button
            disabled={isLoading || !pickup || !destination}
            onClick={handleSubmit}
            className="w-full bg-green-600 hover:bg-green-700 mt-2"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "Request Ride"}
          </Button>
        </CardContent>
      </Card>

      {/* Success Modal */}
      <Dialog open={successModal} onOpenChange={setSuccessModal}>
        <DialogContent className="bg-gray-900 border border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Ride Requested Successfully 🎉</DialogTitle>
          </DialogHeader>
          <p className="mt-2 text-gray-300">
            Your ride request has been created. A driver will accept your ride soon!
          </p>
          <Button
            onClick={() => setSuccessModal(false)}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
