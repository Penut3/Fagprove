import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "../../components/ui/table";

import { Button } from "../../components/ui/button";

const ApiUrl = import.meta.env.VITE_BACKEND_API;

 type CourseDto = {
  id: string;
  name: string;
  joinedAt: string;
};


export default function ParticipantCourses() {
  const { participantId } = useParams<{ participantId: string }>();
const [courses, setCourses] = useState<CourseDto[]>([]);
  const navigate = useNavigate();

   useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    const res = await fetch(`${ApiUrl}Course/GetCoursesByParticipantId/${participantId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!res.ok) {
      // optional: handle errors better
      console.error("Failed to fetch courses", res.status);
      return;
    }

    const data = (await res.json()) as CourseDto[];
    setCourses(data);
  };



  return (
    <>
        <Button
        variant="outline"
        onClick={() => navigate(-1)}
        >
        Tilbake
        </Button>

        <section>
        
        <div className="contentWidth">
            <div style={{ display: "flex", justifyContent: "flex-left" }}>
            <h2 style={{ fontWeight: "500" }}>Deltaker sine kurs</h2>
            </div>

            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Navn</TableHead>
                <TableHead>Ble med</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {courses.map((h) => (
                <TableRow key={h.id}>
                    <TableCell>{h.name}</TableCell>
                   <TableCell>
  {new Intl.DateTimeFormat("nb-NO", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(h.joinedAt))}
</TableCell>



                </TableRow>
                ))}

                {courses.length === 0 && (
                <TableRow>
                    <TableCell colSpan={3} className="text-center">
                    Ingen kurs funnet for denne deltakeren
                    </TableCell>
                </TableRow>
                )}
            </TableBody>
            </Table>
        </div>
        </section>
    </>
  );
}
