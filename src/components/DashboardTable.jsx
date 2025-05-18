import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const allUsers = [
  { name: "bala ", email: "bala@example.com", status: "active" },
  { name: "rajiv pandit", email: "rajiv@example.com", status: "pending" },
  { name: "raghu shah", email: "raghu@example.com", status: "inactive" },
  { name: "bruce Lee", email: "bruce@example.com", status: "active" },
  { name: "Risabh tripathi", email: "tripathi@example.com", status: "active" },
  { name: "Ankit Singh", email: "Ankit@example.com", status: "active" },
  { name: "Harsh nadar", email: "Harsh@example.com", status: "inactive" },
  { name: "user1 ", email: "user1@example.com", status: "pending" },
  { name: "user2 ", email: "user2@example.com", status: "active" },
  { name: "user3 ", email: "user3@example.com", status: "inactive" },
  { name: "user4 ", email: "user4@example.com", status: "pending" },
  { name: "user5 ", email: "user5@example.com", status: "active" },
  { name: "user6 ", email: "user6@example.com", status: "pending" },
  { name: "user6 ", email: "user6@example.com", status: "inactive" },
];

export default function DashboardTable() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const rowsPerPage = 8;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // Simulate loading for 0.5 seconds

    return () => clearTimeout(timer);
  }, []);

  const filteredUsers = allUsers.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  const startIdx = (page - 1) * rowsPerPage;
  const endIdx = startIdx + rowsPerPage;
  const currentUsers = filteredUsers.slice(startIdx, endIdx);

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  // Simple skeleton row component
  const SkeletonRow = () => (
    <TableRow>
      {[...Array(3)].map((_, idx) => (
        <TableCell key={idx}>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-full max-w-[150px]"></div>
        </TableCell>
      ))}
    </TableRow>
  );

  return (
    <div className="space-y-4">
      {/* Heading + Search */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">User Overview</h2>
          <p className="text-muted-foreground text-sm">Manage your users efficiently</p>
        </div>
        <Input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1); // Reset page on search
          }}
          className="w-60"
          disabled={loading}
        />
      </div>

      {/* Table */}
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              // Show 8 skeleton rows while loading
              [...Array(rowsPerPage)].map((_, i) => <SkeletonRow key={i} />)
            ) : currentUsers.length > 0 ? (
              currentUsers.map((user, i) => (
                <TableRow key={i}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.status === "active"
                          ? "default"
                          : user.status === "pending"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-muted-foreground">
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </p>
        <div className="space-x-2">
          <Button onClick={handlePrev} disabled={page === 1 || loading} variant="outline">
            Previous
          </Button>
          <Button onClick={handleNext} disabled={page === totalPages || loading} variant="outline">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
