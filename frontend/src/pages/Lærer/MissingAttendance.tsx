import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "../../components/ui/table";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";

const ApiUrl = import.meta.env.VITE_BACKEND_API;

type MissingAttendance = {
  id: string;
  name: string;
  phoneNumber: string;
  createdAt: string;
  isDeleted: boolean;
};

export default function MissingAttendance() {
  const { courseHourId } = useParams<{ courseHourId: string }>();
  const [attendances, setAttendances] = useState<MissingAttendance[]>([]);
  const navigate = useNavigate();


  useEffect(() => {
    if (!courseHourId) return;
    getCourseHoursById(courseHourId);
  }, [courseHourId]);

  const getCourseHoursById = async (id: string) => {
    const res = await fetch(`${ApiUrl}CourseAttendance/GetLackingAttendancesByCourseHourId/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!res.ok) {
      console.error("Failed to fetch course hours", res.status);
      return;
    }

    const data = (await res.json()) as MissingAttendance[];
    setAttendances(data.filter(x => !x.isDeleted));
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
          <h2 style={{ fontWeight: "500" }}>Manglende oppmøte loggføring</h2>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Navn</TableHead>
              <TableHead>Telefonnummer</TableHead>
              <TableHead>Innfør oppmøte</TableHead>
              <TableHead className="text-right">Opprettet</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {attendances.map((h) => (
              <TableRow key={h.id}>
                <TableCell>{h.name}</TableCell>
                <TableCell>{h.phoneNumber}</TableCell>
                <TableCell
                    key={h.id}
                    >
                        <Link
                        to={`/laerer/create-attendance/${courseHourId}/${h.id}`}>
                         registrer
                        </Link>
                   
                </TableCell>
                <TableCell className="text-right">
                  {new Date(h.createdAt).toLocaleDateString("no-NB")}
                </TableCell>
              </TableRow>
            ))}

            {attendances.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-center">
                  Ingen manglende oppmøte registreringer
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
