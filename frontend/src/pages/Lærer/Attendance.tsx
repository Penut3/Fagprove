import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "../../components/ui/table";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";

const ApiUrl = import.meta.env.VITE_BACKEND_API;

type Attendance = {
  id: string;
  participantId: string;
  courseHoursId: string;
  wasPresent: boolean;
  createdAt: string;
  isDeleted: boolean;
  participantName: string;
};

export default function Attendance() {
  const { courseHourId } = useParams<{ courseHourId: string }>();
  const [attendances, setAttendances] = useState<Attendance[]>([]);
   const navigate = useNavigate();

  useEffect(() => {
    if (!courseHourId) return;
    getCourseHoursById(courseHourId);
  }, [courseHourId]);

  const getCourseHoursById = async (id: string) => {
    const res = await fetch(`${ApiUrl}CourseAttendance/GetAttendancesByCourseHourId/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!res.ok) {
      console.error("Failed to fetch course hours", res.status);
      return;
    }

    const data = (await res.json()) as Attendance[];
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
          <h2 style={{ fontWeight: "500" }}>Loggført tilstedeværelser</h2>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Deltakernavn</TableHead>
              <TableHead>Var tilstedet</TableHead>
              <TableHead className="text-right">Opprettet</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {attendances.map((h) => (
              <TableRow key={h.id}>
                <TableCell>{h.participantName}</TableCell>
                <TableCell>{h.wasPresent ? "Ja" : "Nei"}</TableCell>
                <TableCell className="text-right">
                  {new Date(h.createdAt).toLocaleDateString("no-NB")}
                </TableCell>
              </TableRow>
            ))}

            {attendances.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-center">
                  Ingen tilstedeværelser innført
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
