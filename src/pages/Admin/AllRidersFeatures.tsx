/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useBlockUserAdminMutation, useGetRidersAdminQuery, useUnblockUserAdminMutation, useUpdateUserAdminMutation } from "@/redux/features/rider/riderApi";
export default function AllRiders() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 8;
  const [selectedRider, setSelectedRider] = useState<any>(null);
  const [actionClicked, setActionClicked] = useState<{ [key: string]: "Blocked" | "Active" }>({});

  const { data, isLoading, refetch } = useGetRidersAdminQuery(undefined, {
    pollingInterval: 5000,
  });

  const [blockRider] = useBlockUserAdminMutation();
  const [unblockRider] = useUnblockUserAdminMutation();
  const [updateRider] = useUpdateUserAdminMutation();

  const riders = data?.users || [];

  const filteredData = useMemo(() => {
    let list = [...riders];
    if (search.trim()) {
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(search.toLowerCase()) ||
          r.email.toLowerCase().includes(search.toLowerCase()) ||
          r._id.includes(search)
      );
    }
    return list;
  }, [riders, search]);

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginated = filteredData.slice((page - 1) * pageSize, page * pageSize);

  const handleAction = async (id: string, type: "block" | "unblock") => {
    if (type === "block") await blockRider({ id });
    if (type === "unblock") await unblockRider({ id });

    setActionClicked((prev) => ({
      ...prev,
      [id]: type === "block" ? "Blocked" : "Active",
    }));

    refetch();
  };

  const handleUpdate = async () => {
    if (!selectedRider) return;

    await updateRider({ id: selectedRider._id, data: { name: selectedRider.name, email: selectedRider.email } });
    setSelectedRider(null);
    refetch();
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
    <div className="p-4 md:p-6 space-y-4">
      {/* -------- FILTER BAR -------- */}
      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-6">
        <Input
          placeholder="Search rider by name, email, or ID..."
          className="w-full md:w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* -------- DESKTOP TABLE -------- */}
      <div className="hidden md:block border border-gray-800 rounded-lg overflow-x-auto">
        <Table className="min-w-[800px]">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginated.map((rider: any) => (
              <TableRow key={rider._id}>
                <TableCell
                  className="cursor-pointer"
                  onClick={() => setSelectedRider(rider)}
                >
                  {rider.name}
                </TableCell>
                <TableCell>{rider.email}</TableCell>
                <TableCell>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      actionClicked[rider._id]
                        ? actionClicked[rider._id] === "Blocked"
                          ? "bg-red-600 text-white"
                          : "bg-green-600 text-white"
                        : rider.blocked
                        ? "bg-red-600 text-white"
                        : "bg-green-600 text-white"
                    }`}
                  >
                    {actionClicked[rider._id] || (rider.blocked ? "Blocked" : "Active")}
                  </span>
                </TableCell>
                <TableCell className="text-right ">
                  <div className="flex md:flex-row gap-2 md:justify-end">
                    {!rider.blocked && (
                    <Button
                      className="bg-red-600"
                      onClick={() => handleAction(rider._id, "block")}
                    >
                      Block
                    </Button>
                  )}
                  {rider.blocked && (
                    <Button
                      className="bg-green-600"
                      onClick={() => handleAction(rider._id, "unblock")}
                    >
                      Unblock
                    </Button>
                  )}
                  <Button
                    className="bg-blue-600"
                    onClick={() => setSelectedRider(rider)}
                  >
                    Edit
                  </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* -------- MOBILE CARDS -------- */}
      <div className="md:hidden grid grid-cols-1 gap-4">
        {paginated.map((rider: any) => (
          <div key={rider._id} className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex flex-col gap-4">
            <p><b>Name:</b> {rider.name}</p>
            <p><b>Email:</b> {rider.email}</p>
            <p>
              <b>Status:</b>{" "}
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  actionClicked[rider._id]
                    ? actionClicked[rider._id] === "Blocked"
                      ? "bg-red-600 text-white"
                      : "bg-green-600 text-white"
                    : rider.blocked
                    ? "bg-red-600 text-white"
                    : "bg-green-600 text-white"
                }`}
              >
                {actionClicked[rider._id] || (rider.blocked ? "Blocked" : "Active")}
              </span>
            </p>
            <div className="flex-col gap-4">
              {!rider.blocked && (
                <Button
                  className="bg-red-600 w-full mb-3"
                  onClick={() => handleAction(rider._id, "block")}
                >
                  Block
                </Button>
              )}
              {rider.blocked && (
                <Button
                  className="bg-green-600 w-full "
                  onClick={() => handleAction(rider._id, "unblock")}
                >
                  Unblock
                </Button>
              )}
              <Button
                className="bg-blue-600 w-full"
                onClick={() => setSelectedRider(rider)}
              >
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* -------- PAGINATION -------- */}
      <div className="flex justify-center gap-4 mt-4">
        <Button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</Button>
        <Button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</Button>
      </div>

      {/* -------- EDIT RIDER MODAL -------- */}
      <Dialog open={!!selectedRider} onOpenChange={() => setSelectedRider(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Rider</DialogTitle>
          </DialogHeader>
          {selectedRider && (
            <div className="space-y-4">
              <Input
                value={selectedRider.name}
                onChange={(e) => setSelectedRider({ ...selectedRider, name: e.target.value })}
                placeholder="Name"
              />
              <Input
                value={selectedRider.email}
                onChange={(e) => setSelectedRider({ ...selectedRider, email: e.target.value })}
                placeholder="Email"
              />
            </div>
          )}
          <DialogFooter className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setSelectedRider(null)}>Cancel</Button>
            <Button onClick={handleUpdate} className="bg-blue-600">Update</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
