/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { useGetAllRidesAdminQuery } from "@/redux/features/rider/riderApi";
import { Ride } from "@/types";

export default function AllRides() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [driverFilter, setDriverFilter] = useState("All");
  const [riderFilter, setRiderFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");

  const [page, setPage] = useState(1);
  const pageSize = 8;

  const { data, isLoading } = useGetAllRidesAdminQuery(undefined, {
    pollingInterval: 5000,
  });

  const rides = data?.rides || [];

  const filteredData = useMemo(() => {
    let list = [...rides];

    if (search.trim()) {
      list = list.filter(
        (r) =>
          r.driver?.name?.toLowerCase().includes(search.toLowerCase()) ||
          r.rider?.name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (statusFilter !== "All") {
      list = list.filter((r) => r.status === statusFilter);
    }

    if (driverFilter !== "All") {
      list = list.filter((r) => r.driver?.name === driverFilter);
    }

    if (riderFilter !== "All") {
      list = list.filter((r) => r.rider?.name === riderFilter);
    }

    if (dateFilter) {
      list = list.filter(
        (r) => format(new Date(r.createdAt), "yyyy-MM-dd") === dateFilter
      );
    }

    return list;
  }, [rides, search, statusFilter, driverFilter, riderFilter, dateFilter]);

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginated = filteredData.slice((page - 1) * pageSize, page * pageSize);

  if (isLoading) {
    return (
      <div className="p-6 space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-12 bg-gray-800 animate-pulse rounded" />
        ))}
      </div>
    );
  }

  // STATUS COLOR MAP
  const statusColor = (status: string) => {
    switch (status) {
      case "requested":
        return "text-yellow-400";
      case "accepted":
      case "picked_up":
      case "in_transit":
        return "text-blue-400";
      case "completed":
        return "text-green-400";
      case "cancelled":
      case "rejected":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-4">
      {/* -------- FILTER BAR -------- */}
      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-6">
        <Input
          placeholder="Search by driver or rider..."
          className="w-full md:w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex gap-5 flex-wrap">
          <select
            className="border rounded p-1 bg-gray-900 text-white"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="requested">Requested</option>
            <option value="accepted">Accepted</option>
            <option value="picked_up">Picked Up</option>
            <option value="in_transit">In Transit</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            <option value="rejected">Rejected</option>
          </select>

          <select
            className="border rounded p-1 bg-gray-900 text-white"
            value={driverFilter}
            onChange={(e) => setDriverFilter(e.target.value)}
          >
            <option value="All">All Drivers</option>
            {rides.map((r :Ride) => r.driver?.name).filter(Boolean)
              .filter((v: string | undefined, i:number | undefined, a :(string | undefined)[]) =>v && a.indexOf(v) === i)
              .map((name :string | undefined) => (
                <option key={name} value={name}>{name}</option>
              ))}
          </select>

          <select
            className="border rounded p-1 bg-gray-900 text-white"
            value={riderFilter}
            onChange={(e) => setRiderFilter(e.target.value)}
          >
            <option value="All">All Riders</option>
            {rides.map((r :Ride) => r.rider?.name).filter(Boolean)
              .filter((v:string |undefined, i:number, a:(string | undefined)[]) =>v && a.indexOf(v) === i)
              .map((name : string | undefined) => (
                <option key={name} value={name}>{name}</option>
              ))}
          </select>

          <Input
            type="date"
            className="bg-gray-900 text-white border rounded p-1 md:w-fit"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
        </div>
      </div>

      {/* -------- DESKTOP TABLE -------- */}
      <div className="hidden md:block border border-gray-800 rounded-lg overflow-x-auto">
        <Table className="min-w-[900px]">
          <TableHeader>
            <TableRow>
              <TableHead>Driver</TableHead>
              <TableHead>Rider</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Pickup</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Fare</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginated.map((ride: any) => (
              <TableRow key={ride._id}>
                <TableCell>{ride.driver?.name || "N/A"}</TableCell>
                <TableCell>{ride.rider?.name || "N/A"}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-sm bg-black ${statusColor(ride.status)}`}>
                    {ride.status}
                  </span>
                </TableCell>
                <TableCell>{ride.pickupLocation}</TableCell>
                <TableCell>{ride.destinationLocation}</TableCell>
                <TableCell>{format(new Date(ride.createdAt), "yyyy-MM-dd")}</TableCell>
                <TableCell>৳ {ride.fare || 0}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* -------- MOBILE CARDS -------- */}
      <div className="md:hidden grid grid-cols-1 gap-4">
        {paginated.map((ride: any) => (
          <div key={ride._id} className="bg-gray-900 border border-gray-800 rounded-xl p-4 space-y-2">
            <p><b>Driver:</b> {ride.driver?.name || "N/A"}</p>
            <p><b>Rider:</b> {ride.rider?.name || "N/A"}</p>
            <p>
              <b>Status:</b>{" "}
              <span className={`px-2 py-1 rounded-full text-sm bg-black ${statusColor(ride.status)}`}>
                {ride.status}
              </span>
            </p>
            <p><b>Pickup:</b> {ride.pickupLocation}</p>
            <p><b>Destination:</b> {ride.destinationLocation}</p>
            <p><b>Date:</b> {format(new Date(ride.createdAt), "yyyy-MM-dd")}</p>
            <p><b>Fare:</b> ৳ {ride.fare || 0}</p>
          </div>
        ))}
      </div>

      {/* -------- PAGINATION -------- */}
      <div className="flex justify-center gap-4 mt-4">
        <Button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</Button>
        <Button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</Button>
      </div>
    </div>
  );
}
