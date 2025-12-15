import React, { useState } from "react";
import Form from "@/components/Form/Form";

import dayjs, { Dayjs } from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const ApiUrl = import.meta.env.VITE_BACKEND_API;

type FormValues = Record<string, string | string[]>;

export default function CreateCourse() {
  const [draft, setDraft] = useState<Dayjs | null>(dayjs());
  const [courseHourDates, setCourseHourDates] = useState<Dayjs[]>([]);
  const [dateError, setDateError] = useState<string | null>(null);

  const addDate = () => {
    setDateError(null);
    if (!draft || !draft.isValid()) {
      setDateError("Velg en gyldig dato og tid.");
      return;
    }

    // prevent duplicates (same minute or exact ms — pick what you want)
    const exists = courseHourDates.some((d) => d.valueOf() === draft.valueOf());
    if (exists) {
      setDateError("Denne datoen er allerede lagt til.");
      return;
    }

    setCourseHourDates((prev) =>
      [...prev, draft].sort((a, b) => a.valueOf() - b.valueOf())
    );
  };

  const removeDate = (valueMs: number) => {
    setCourseHourDates((prev) => prev.filter((d) => d.valueOf() !== valueMs));
  };

  const HandleCreateCourse = async (payload: { name: string; courseHourDates: string[] }) => {
    const res = await fetch(`${ApiUrl}course/CreateCourse`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.error("Failed to post", res.status);
      return;
    }
  };

  const handleSubmit = (values: FormValues) => {
    if (courseHourDates.length === 0) {
      setDateError("Legg til minst én kursdato.");
      return;
    }

    const payload = {
      name: (values.name as string) ?? "",
      courseHourDates: courseHourDates.map((d) => d.toDate().toISOString()),
    };

    HandleCreateCourse(payload);
  };

  return (
    <div className="contentWidth">
      <Form
        fields={[
          { type: "title", name: "title", label: "Opprett kurs" },
          { type: "text", name: "name", label: "Navn", required: true },
        ]}
        onSubmit={handleSubmit}
      >
        <div style={{ marginTop: 16 }}>
           <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    label="Velg kursdato og tid"
                    value={draft}
                    onChange={setDraft}
                    slotProps={{ textField: { fullWidth: true } }}
                />
            </LocalizationProvider>
          <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
            <Button variant="contained" type="button" onClick={addDate}>
              Legg til dato
            </Button>
            <Button
              variant="outlined"
              type="button"
              onClick={() => setCourseHourDates([])}
              disabled={courseHourDates.length === 0}
            >
              Tøm liste
            </Button>
          </div>

          {dateError && (
            <p style={{ color: "red", marginTop: 8, fontSize: "0.9rem" }}>
              {dateError}
            </p>
          )}

          <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: "wrap" }}>
            {courseHourDates.map((d) => (
              <Chip
                key={d.valueOf()}
                label={d.format("DD.MM.YYYY HH:mm")}
                onDelete={() => removeDate(d.valueOf())}
                sx={{ mb: 1 }}
              />
            ))}
          </Stack>
        </div>
      </Form>
    </div>
  );
}
