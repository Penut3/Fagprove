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
import { Link } from "react-router-dom";

const ApiUrl = import.meta.env.VITE_BACKEND_API;

type Participant = {
  id: string;
  name: string;
  phoneNumber: string;
  createdAt: string;
  isDeleted: boolean;
};



function AllParticpants() {
  const [participants, setParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    getAllParticipants();
  }, []);

  const getAllParticipants = async () => {
    const res = await fetch(`${ApiUrl}Participant/All`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!res.ok) {
      console.error("Failed to fetch participants", res.status);
      return;
    }

    const data = (await res.json()) as Participant[];
    setParticipants(data.filter(p => !p.isDeleted)); // optional
  };


  return (
    <section>
      <div className="contentWidth">
        
         <div style={{display:"flex", justifyContent:"flex-left"}}>
          <h2 style={{ fontWeight:"500"}}>Alle deltagere</h2>
        </div>
        <Table>
          

          <TableHeader>
            <TableRow>
              <TableHead>Navn</TableHead>
              <TableHead>Telefon</TableHead>
              <TableHead>Kurs</TableHead>
              <TableHead className="text-right">Opprettet</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {participants.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.phoneNumber}</TableCell>
                <TableCell>
                  <Link
                 
                  to={`/kontor/participants/participant-courses/${p.id}`}>
                  <p >kurs</p>
                  </Link>
                </TableCell>
                <TableCell className="text-right">
                 
                    {new Intl.DateTimeFormat("nb-NO", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                    }).format(new Date(p.createdAt))}
                 
                </TableCell>
              </TableRow>
            ))}

            {participants.length === 0 && (
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

export default AllParticpants
