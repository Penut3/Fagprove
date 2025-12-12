import React, { useEffect, useMemo, useState } from "react";

import Form from "@/components/Form/Form"

const ApiUrl = import.meta.env.VITE_BACKEND_API


 type CourseDto = {
  id: string;
  name: string;
};

type FormValues = Record<string, string | string[]>;

export default function Registrer() {

  const [courses, setCourses] = useState<CourseDto[]>([]);

  useEffect(() => {
    getCourses();
  }, []);
  

  const getCourses = async () => {
    const res = await fetch(`${ApiUrl}course/GetAllCourses`, {
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


   const CreateParticipant = async (payload: {
    name: string;
    phoneNumber: string;
    courseIds: string[];
  }) => {
    const res = await fetch(`${ApiUrl}participant`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.error("Failed to post", res.status);
      return;
    }

    // optional:
    // const result = await res.json();
  };

  
 const handleSubmit = (values: FormValues) => {
    const payload = {
      name: (values.name as string) ?? "",
      phoneNumber: (values.password as string) ?? "", // you named the field "password" but it holds phone
      courseIds: (values.courses as string[]) ?? [],
    };

    CreateParticipant(payload);
  };

  return(
   
      <div className='contentWidth'>
        <div style={{display:"flex", alignItems:"center", height:"100%"}}>
         <Form
          fields={[
            { type: "title", name: "title", label: "Registrer" },
            { type: "text", name: "name", label: "Navn", required: true },
            { type: "password", name: "password", label: "Telefon", required: true },
            {
              name: "courses",
              label: "Courses",
              type: "multiselect" as const,
              options: courses.map((c) => ({ id: c.id, label: c.name })),
            },
          ]}
          onSubmit={handleSubmit}
          
        />
        </div>
      </div>
  
 

  ) 
}

