import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Form from "@/components/Form/Form";
import { useNavigate } from "react-router-dom";

const ApiUrl = import.meta.env.VITE_BACKEND_API


type FormValues = Record<string, string | string[]>;

export default function CreateAttendance() {
     const navigate = useNavigate();


const { courseHourId, participantId } = useParams<{
  courseHourId: string;
  participantId: string;
}>();

const CreateAttendance = async (payload: {
  participantId: string;
  courseHoursId: string;
  wasPresent: boolean;
}) => {
  const res = await fetch(`${ApiUrl}CourseAttendance`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if(res.ok){
    navigate(-1)
  }
};

  

const handleSubmit = (values: Record<string, string | string[]>) => {
  const wasPresentStr = values.wasPresent as string; // "true" | "false"

  const payload = {
    courseHoursId: courseHourId!,
    participantId: participantId!,
    wasPresent: wasPresentStr === "true",
  };

  CreateAttendance(payload);
};

  return(
   
      <div className='contentWidth'>
        <div style={{display:"flex", alignItems:"center", height:"100%"}}>
         <Form
          fields={[
            { type: "title", name: "title", label: "Registrer" },
            {
              type: 'radio',
              name: 'wasPresent',
              label: 'Var tilstedet?',
                options: [
                    { id: "true", label: "ja" },
                    { id: "false", label: "nei" },
                ],
            },
          ]}
          onSubmit={handleSubmit}
          
        />
        </div>
      </div>
  
 

  ) 
}

