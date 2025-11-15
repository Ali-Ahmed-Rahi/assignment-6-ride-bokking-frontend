/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useApproveDriverMutation, useGetAllDriversAdminQuery, useSuspendDriverMutation } from "@/redux/features/drivers/driverApi";

export default function AllDrivers() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedDriver, setSelectedDriver] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [actionLoading, setActionLoading] = useState<any>({});
  const pageSize = 8;

  const { data, isLoading } = useGetAllDriversAdminQuery(undefined);
  const [approveDriver] = useApproveDriverMutation();
  const [suspendDriver] = useSuspendDriverMutation();

  const drivers = data?.drivers || [];

  // ----------------- FILTERED DATA -----------------
  const filteredData = useMemo(() => {
    let list = [...drivers];

    if (search.trim()) {
      list = list.filter((d) => (d.name || "").toLowerCase().includes(search.toLowerCase()));
    }

    if (statusFilter !== "All") {
      list = list.filter((d) => (statusFilter === "Available" ? d.approved : !d.approved));
    }

    return list;
  }, [drivers, search, statusFilter]);

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginated = filteredData.slice((page - 1) * pageSize, page * pageSize);

  // ----------------- HANDLE APPROVE -----------------
  const handleApprove = async (id: string) => {
    setActionLoading((prev: any) => ({ ...prev, [id]: true }));
    try {
      await approveDriver(id).unwrap();
    } catch (error) {
      console.error("Approve failed:", error);
    } finally {
      setActionLoading((prev: any) => ({ ...prev, [id]: false }));
    }
  };

  // ----------------- HANDLE SUSPEND -----------------
  const handleSuspend = async (id: string) => {
    setActionLoading((prev: any) => ({ ...prev, [id]: true }));
    try {
      await suspendDriver(id).unwrap();
    } catch (error) {
      console.error("Suspend failed:", error);
    } finally {
      setActionLoading((prev: any) => ({ ...prev, [id]: false }));
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-12 bg-gray-800 animate-pulse rounded" />
        ))}
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      {/* ---------- FILTER BAR ---------- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <Input
          placeholder="Search driver..."
          className="w-full md:w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Filter: {statusFilter}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setStatusFilter("All")}>All</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("Available")}>Available</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setStatusFilter("Suspended")}>Suspended</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* =============== DESKTOP TABLE =============== */}
      <div className="hidden md:block border border-gray-800 rounded-lg overflow-x-auto">
        <Table className="min-w-[800px]">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Online</TableHead>
              <TableHead>Balance</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.map((driver: any) => (
              <TableRow key={driver._id}>
                <TableCell onClick={() => setSelectedDriver(driver)} className="cursor-pointer">{driver.name || "N/A"}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${driver.approved ? "bg-green-600 text-white" : "bg-red-700 text-white"}`}>
                    {driver.approved ? "Available" : "Unknown"}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${driver.online ? "bg-green-600 text-white" : "bg-red-700 text-white"}`}>
                    {driver.online ? "Online" : "Offline"}
                  </span>
                </TableCell>
                <TableCell>৳ {driver.balance || 0}</TableCell>
                <TableCell className="flex gap-2">
                  <Button size="sm" className="bg-green-600" disabled={actionLoading[driver._id]} onClick={() => handleApprove(driver._id)}>Approve</Button>
                  <Button size="sm" className="bg-red-600" disabled={actionLoading[driver._id]} onClick={() => handleSuspend(driver._id)}>Suspend</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* =============== MOBILE CARD VIEW =============== */}
      <div className="md:hidden grid grid-cols-1 gap-4">
        {paginated.map((driver: any) => (
          <div key={driver._id} className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold cursor-pointer" onClick={() => setSelectedDriver(driver)}>{driver.name || "N/A"}</h3>
              <span className={`px-2 py-1 rounded-full text-xs ${driver.approved ? "bg-green-600 text-white" : "bg-red-700 text-white"}`}>
                {driver.approved ? "Available" : "Suspended"}
              </span>
            </div>
            <div className="text-sm">
              <p><b>Online:</b> <span className={`px-2 py-1 rounded-full text-xs ${driver.online ? "bg-green-600 text-white" : "bg-red-700 text-white"}`}>{driver.online ? "Online" : "Offline"}</span></p>
              <p><b>Balance:</b> ৳ {driver.balance || 0}</p>
            </div>
            <div className="md:flex flex-col gap-2 pt-2">
              <Button className="bg-green-600 w-full" disabled={actionLoading[driver._id]} onClick={() => handleApprove(driver._id)}>Approve</Button>
              <Button className="bg-red-600 w-full  mt-4" disabled={actionLoading[driver._id]} onClick={() => handleSuspend(driver._id)}>Suspend</Button>
            </div>
          </div>
        ))}
      </div>

      {/* ---------- PAGINATION ---------- */}
      <div className="flex justify-center gap-4 mt-4">
        <Button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</Button>
        <Button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</Button>
      </div>

      {/* ---------- DRIVER PROFILE MODAL ---------- */}
      <Dialog open={!!selectedDriver} onOpenChange={() => setSelectedDriver(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Driver Profile</DialogTitle>
          </DialogHeader>
          {selectedDriver && (
            <div className="space-y-2">
              <p><b>Name:</b> {selectedDriver.name || "N/A"}</p>
              <p><b>Status:</b> {selectedDriver.approved ? "Available" : "Suspended"}</p>
              <p><b>Online:</b> {selectedDriver.online ? "Yes" : "No"}</p>
              <p><b>Balance:</b> ৳ {selectedDriver.balance || 0}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
