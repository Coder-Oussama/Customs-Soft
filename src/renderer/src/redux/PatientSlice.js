/* eslint-disable prettier/prettier */
import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
// import Session from "../models/Session";
export const PatientSlice = createSlice({
  name: "patients",
  initialState: {
    patients: [
      // {
      //   id: 1,
      //   name: "Aymen ",
      //   surname: "Mebark",
      //   adress: "adrar",
      //   PhoneNum1: "0668463947",
      //   PhoneNum2: "0742463935",
      //   Ill_Type: "Handicap du doc",
      //   Sessions_Num: 22,
      //   Session_Price: 1500,
      //   Appoinemnt_Price: 200,
      //   appointment_date: null,
      //   sessions: [
      //     { id: 1, date: "2023-10-12T21:22", isDone: false, state: 5 },
      //     { id: 2, date: "2022-08-09T21:22", isDone: true, state: 5 },
      //     { id: 3, date: "2023-12-13T21:22", isDone: false, state: 5 },
      //   ],
      // },
      // {
      //   id: 2,
      //   name: "Imad ",
      //   surname: "Bentarek",
      //   adress: "adrar",
      //   PhoneNum1: "0568463947",
      //   PhoneNum2: "0642463935",
      //   Ill_Type: "Paralyse des articulations",
      //   Sessions_Num: 22,
      //   Session_Price: 1500,
      //   Appoinemnt_Price: 200,
      //   appointment_date: null,
      //   sessions: [
      //     { id: 1, date: "2023-10-22T21:22", isDone: false, state: 17 },
      //     { id: 2, date: "2022-08-09T21:22", isDone: true, state: 32 },
      //     { id: 3, date: "2023-12-13T21:22", isDone: false, state: 10 },
      //   ],
      // },
      // {
      //   id: 3,
      //   name: "Noury",
      //   surname: "Yasser",
      //   adress: "adrar",
      //   PhoneNum1: "0768463947",
      //   PhoneNum2: "0542463935",
      //   Ill_Type: "Deficience intellectuelle",
      //   Sessions_Num: 22,
      //   Session_Price: 1500,
      //   Appoinemnt_Price: 200,
      //   appointment_date: null,
      //   sessions: [
      //     { id: 1, date: "2023-10-22T21:22", isDone: false, state: 5 },
      //     { id: 2, date: "2022-08-09T21:22", isDone: true, state: 10 },
      //     { id: 3, date: "2023-12-23T21:22", isDone: false, state: 22 },
      //   ],
      // },
    ],
  },

  reducers: {
    addPatient: (state, action) => {
      state.patients.push(action.payload);
    },
    updatePatient: (state, action) => {
      const {
        id,
        violator_name,
        dispute_file,
        judgment_date,
        notification_date,
        PhoneNum2,
        Session_Price,
        Appoinemnt_Price,
        Sessions_Num,
        Ill_Type,
        appointment_date,
        sessions
      } = action.payload
      state.patients.map((patient) => {
        if (patient.id === id) {
          patient.violator_name = violator_name
          patient.dispute_file = dispute_file
          patient.judgment_date = judgment_date
          patient.notification_date = notification_date
          patient.PhoneNum2 = PhoneNum2;
          patient.Session_Price = Session_Price;
          patient.Sessions_Num = Sessions_Num;
          patient.Ill_Type = Ill_Type;
          patient.appointment_date = appointment_date;
          patient.Appoinemnt_Price = Appoinemnt_Price;
          patient.sessions = sessions;
        }
        return "";
      });
    },
    deletePatient: (state, action) => {
      state.patients = state.patients.filter(
        (patient) => patient.id !== action.payload
      );

      // state.patients.map((patient) => {
      //   if (patient.id === action.payload.id) {
      //     state = state.slice(action.payload.id - 1);
      //   }
      // });

      // console.log(state[0]);
    },
    addSession: (state, action) => {
      const { patientID, date } = action.payload;
      const patient = state.patients.find(
        (patient) => patient.id === patientID
      );

      if (patient && date) {
        // const dateObject = dayjs(date).toDate(); // Convert the date string to a Date object
        const newSession = {
          id: patient.sessions.length + 1,
          // id: uuidv4(),
          date: date,
          isDone: true, // or set your desired value here
          state: calculateSessionCount(state.patients, date),
        };
        patient.sessions.push(newSession);
      }
      // console.log(patient);
    },
    updateSession: (state, action) => {
      const { patientID, sessionID, newDate } = action.payload;
      const patient = state.patients.find(
        (patient) => patient.id === patientID
      );

      if (patient) {
        const session = patient.sessions.find((s) => s.id === sessionID);

        if (session) {
          session.date = newDate;
        }
      }
    },
    deleteSession: (state, action) => {
      const { patientID, sessionID } = action.payload;
      const patient = state.patients.find(
        (patient) => patient.id === patientID
      );

      if (patient) {
        patient.sessions = patient.sessions.filter(
          (session) => session.id !== sessionID
        );
      }
    },
  },
});
function calculateSessionCount(allPatients, date) {
  const sessions = allPatients.flatMap((patient) => [] || patient.sessions);
  return sessions.filter(
    (session) =>
      dayjs(session.date).format("DD/MM/YYYY") ===
      dayjs(date).format("DD/MM/YYYY")
  ).length;
}
export const {
  addPatient,
  updatePatient,
  deletePatient,
  addSession,
  updateSession,
  deleteSession,
} = PatientSlice.actions;
export default PatientSlice.reducer;
