import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "../../components/ui/table";

const ApiUrl = import.meta.env.VITE_BACKEND_API;

type User = {
  id: string;
  email: string;
  createdAt: string;
  isDeleted: boolean;
};



function AllUsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    const res = await fetch(`${ApiUrl}Users/All`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!res.ok) {
      console.error("Failed to fetch participants", res.status);
      return;
    }

    const data = (await res.json()) as User[];
    setUsers(data.filter(p => !p.isDeleted)); // optional
  };


  return (
    <section>
      <div className="contentWidth">
        <div style={{display:"flex", justifyContent:"flex-left"}}>
          <h2 style={{ fontWeight:"500"}}>Alle brukere</h2>
        </div>
        <Table>
          

          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Opprettet</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.email}</TableCell>
                <TableCell className="text-right">
                  {new Date(p.createdAt).toLocaleDateString("no-NB")}
                </TableCell>
              </TableRow>
            ))}

            {users.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-center">
                  Ingen deltakere funnet
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}

export default AllUsersPage
