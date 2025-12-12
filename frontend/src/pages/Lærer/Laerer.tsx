import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

type Course = {
  id: string;
  name: string;
  createdAt: string;
  isDeleted: boolean;
};



function Laerer() {
  const [courses, setCourses] = useState<Course[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getMyCourses();
  }, []);

  const getMyCourses = async () => {
    const res = await fetch(`${ApiUrl}Course/GetMyCourses`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!res.ok) {
      console.error("Failed to fetch participants", res.status);
      return;
    }

    const data = (await res.json()) as Course[];
    setCourses(data.filter(p => !p.isDeleted)); // optional
  };


  return (
    <section>
      <div className="contentWidth">
        <div style={{display:"flex", justifyContent:"flex-left"}}>
          <h2 style={{ fontWeight:"500"}}>Mine Kurs</h2>
        </div>
        <Table>
          

          <TableHeader>
            <TableRow>
              <TableHead>Kurs tittel</TableHead>
              <TableHead className="text-right">Opprettet</TableHead>
            </TableRow>
          </TableHeader>

         <TableBody>
          {courses.map((c) => (
            <TableRow
              key={c.id}
              onClick={() => navigate(`/laerer/${c.id}`)}
              style={{ cursor: "pointer" }}
            >
              <TableCell className="underline">{c.name}</TableCell>
              <TableCell className="text-right">
                {new Date(c.createdAt).toLocaleDateString("no-NB")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        </Table>
      </div>
    </section>
  );
}

export default Laerer
