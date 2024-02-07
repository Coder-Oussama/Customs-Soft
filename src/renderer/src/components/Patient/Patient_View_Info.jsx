/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/fr'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { useSelector, useDispatch } from 'react-redux'
import FormDialog from './addPatient'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import ModeIcon from '@mui/icons-material/Mode'
import DeleteIcon from '@mui/icons-material/Delete'
import {
  updatePatient,
  deletePatient,
  addSession,
  updateSession,
  deleteSession
} from '../../redux/PatientSlice'
var isBetween = require('dayjs/plugin/isBetween')
dayjs.extend(isBetween)
dayjs.locale('fr')
const PatientViewInfo = (prop) => {
  const [open, setOpen] = React.useState(false)
  const [open2, setOpen2] = React.useState(false)

  // Dont Forge to change setting
  const [ShowPatientInfo, setShowPatientInfo] = React.useState(false)
  const [patientID, setPatientID] = React.useState('')
  // until here

  const patients = useSelector((state) => state.patients.patients)

  const [DateValue, setDateValue] = React.useState(dayjs(Date.now()))


  const [newName, setNewName] = React.useState('')
  const [newDispute_file, setNewDispute_file] = React.useState('')
  const [newJudgment_date, setnewJudgment_date] = React.useState('')
  const [newNotification_date, setNewNotification_date] = React.useState('')
  const [newReminder_rereport_date, setNewReminder_rereport_date] = React.useState('')


  // const [localPatients, setLocalPatients] = React.useState(patients);
  const dispatch = useDispatch()

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleClose2 = () => {
    setOpen2(false)
  }
  const updatePatientInfo = () => {
    dispatch(
      updatePatient({
        id: patientID,
        name: newName,
        dispute_file: newDispute_file,
        judgment_date: newJudgment_date,
        reminder_rereport_date: newReminder_rereport_date,
        notification_date:newNotification_date,
      })
    )
    setShowPatientInfo(false)
  }
  const showPatientInfo = (id) => {
    setPatientID(id)
    setNewName(patients[id - 1].name)
    setNewDispute_file(patients[id - 1].dispute_file)
    setnewJudgment_date(patients[id - 1].judgment_date)
    setNewNotification_date(patients[id - 1].notification_date)
    setNewReminder_rereport_date(patients[id - 1].reminder_rereport_date)
    setShowPatientInfo(true)
  }

  return (
    <div className="container">
      {ShowPatientInfo === false ? (
        <>
          <button onClick={handleClickOpen} className="btn btn-success my-3 float-right">
            <h5>اضافة تبليغ</h5>
          </button>
          <FormDialog handleClose={handleClose} open={open} />
          <table className="table ">
            <thead className="bg-primary text-white">
              <tr>
                <th>ID</th>
                <th> اسم المخالف </th>
                <th>ملف المنازعة </th>
                <th>تاريخ الحكم </th>
                <th>تاريخ التبليغ</th>
                <th> التذكير باعادة التبليغ </th>
                <th>التعديل والحذف</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient, index) => (
                <tr key={index}>
                  <td>{patient.id}</td>
                  <td>{patient.name}</td>
                  <td>{patient.dispute_file}</td>
                  <td>{patient.judgment_date}</td>
                  <td>{patient.notification_date}</td>
                  <td>{patient.reminder_rereport_date}</td>
                  <td>
                    <button
                      onClick={() => showPatientInfo(patient.id)}
                      className="btn btn-sm btn-primary"
                    >
                      المزيد
                    </button>
                    <button
                      onClick={() => {
                        dispatch(deletePatient(patient.id))
                      }}
                      className="btn btn-sm btn-danger mr-2"
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <>
          <button
            onClick={() => setShowPatientInfo(!ShowPatientInfo)}
            className="btn btn-success my-3   "
          >
            <ArrowBackIcon />
            عودة
          </button>
          <h4 className=" font-weight-bold text-info float-right">
            {`${patients[patientID - 1].name}`}
          </h4>
          <table className="table ">
            <tr>
              <th>اسم المخالف</th>
              <td>
                <input
                  className="form-control"
                  type="text"
                  value={newName}
                  onChange={(e) => {
                    setNewName(e.target.value)
                  }}
                />
              </td>
            </tr>
            <tr>
              <th>ملف المنازعة</th>
              <td>
                {' '}
                <input
                  className="form-control"
                  type="text"
                  value={newDispute_file}
                  onChange={(e) => {
                    setNewDispute_file(e.target.value)
                  }}
                />
              </td>
            </tr>

            <tr>
              <th>تاريخ الحكم</th>
              <td>
                <input
                  className="form-control"
                  type="datetime-local"
                  value={newJudgment_date}
                  onChange={(e) => {
                    setnewJudgment_date(dayjs(e.target.value).format('YYYY-MM-DDTHH:mm'))
                  }}
                />
              </td>
            </tr>
            <tr>
              <th>تاريخ التبليغ</th>
              <td>
                <input
                  className="form-control"
                  type="datetime-local"
                  value={newNotification_date}
                  onChange={(e) => {
                    setNewNotification_date(dayjs(e.target.value).format('YYYY-MM-DDTHH:mm'))
                  }}
                />
              </td>
            </tr>
            <tr>
              <th>التذكير باعادة التبليغ</th>
              <td>
                {' '}
                <input
                  className="form-control"
                  type="datetime-local"
                  value={newReminder_rereport_date}
                  onChange={(e) => {
                    setNewReminder_rereport_date(dayjs(e.target.value).format('YYYY-MM-DDTHH:mm'))
                  }}
                />
              </td>
            </tr>
          </table>

          <button
            onClick={updatePatientInfo}
            className="btn btn-primary my-3 float-right  cursor-pointer"
          >
            حفظ
          </button>
        </>
      )}
    </div>
  )
}

export default PatientViewInfo
