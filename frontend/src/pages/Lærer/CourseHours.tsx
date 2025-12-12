import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "../../components/ui/table";
import { Tab } from "@mui/material";

const ApiUrl = import.meta.env.VITE_BACKEND_API;

type CourseHour = {
  id: string;
  startTime: string;
  durationInMinutes: string;
  createdAt: string;
  isDeleted: boolean;
};

export default function CourseHours() {
  const { courseId } = useParams<{ courseId: string }>();
  const [courseHours, setCourseHours] = useState<CourseHour[]>([]);
    const navigate = useNavigate();

  useEffect(() => {
    if (!courseId) return;
    getCourseHoursById(courseId);
  }, [courseId]);

  const getCourseHoursById = async (id: string) => {
    const res = await fetch(`${ApiUrl}Course/GetCourseHours/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!res.ok) {
      console.error("Failed to fetch course hours", res.status);
      return;
    }

    const data = (await res.json()) as CourseHour[];
    setCourseHours(data.filter(x => !x.isDeleted));
  };

  return (
    <section>
      <div className="contentWidth">
        <div style={{ display: "flex", justifyContent: "flex-left" }}>
          <h2 style={{ fontWeight: "500" }}>Kurstimer</h2>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Start</TableHead>
              <TableHead>Varighet i minutter</TableHead>
              <TableHead>Fravær og tilstedeværelse</TableHead>
              <TableHead className="text-right">Opprettet</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {courseHours.map((h) => (
              <TableRow key={h.id}>
                <TableCell>{h.startTime}</TableCell>
                <TableCell>{h.durationInMinutes}</TableCell>
               <TableCell>
                <div style={{ display: "flex", gap: "8px" }}>
                    <Link
                    to={`/laerer/${courseId}/${h.id}/attendances`}
                    style={{ textDecoration: "underline" }}
                    >
                    se innførte
                    </Link>

                    <span>/</span>

                    <Link
                    to={`/laerer/${courseId}/${h.id}/missing-attendances`}
                    style={{ textDecoration: "underline" }}
                    >
                    se manglende
                    </Link>
                </div>
                </TableCell>

                <TableCell className="text-right">
                  {new Date(h.createdAt).toLocaleDateString("no-NB")}
                </TableCell>
              </TableRow>
            ))}

            {courseHours.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-center">
                  Ingen kurstimer funnet
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
