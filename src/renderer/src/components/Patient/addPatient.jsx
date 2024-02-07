/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { addPatient } from '../../redux/PatientSlice'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'

export default function FormDialog({ handleClose, open }) {
  const [name, setName] = React.useState('')
  const [dispute_file, setDispute_file] = React.useState('')
  const [judgment_date, setJudgment_date] = React.useState('')
  const [notification_date, setNotification_date] = React.useState('')
  const [reminder_rereport_date, setReminder_rereport_date] = React.useState('')
  const patients = useSelector((state) => state.patients.patients)
  const dispatch = useDispatch()
  var isBetween = require('dayjs/plugin/isBetween')
  dayjs.extend(isBetween)
  dayjs.locale('fr')
  const handleSave = () => {
    dispatch(
      addPatient({
        id: patients.length + 1,
        name: name,
        dispute_file: dispute_file,
        judgment_date: judgment_date,
        reminder_rereport_date: reminder_rereport_date,
        notification_date: notification_date
    
      })
    )
    handleClose()
  }

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>اضافة متابع جديد</DialogTitle>
        <DialogContent>
          <table className="table">
            <tr>
              <th>اسم المخالف </th>
              <td>
                <input
                  className="form-control"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value)
                  }}
                />
              </td>
            </tr>
            <tr>
              <th>ملف المنازعة </th>
              <td>
                {' '}
                <input
                  className="form-control"
                  type="text"
                  value={dispute_file}
                  onChange={(e) => {
                    setDispute_file(e.target.value)
                  }}
                />
              </td>
            </tr>
            <tr>
              <th>تاريخ الحكم </th>
              <td>
                <input
                  className="form-control"
                  type="datetime-local"
                  value={judgment_date}
                  onChange={(e) => {
                    setJudgment_date(dayjs(e.target.value).format('YYYY-MM-DDTHH:mm'))
                  }}
                />
              </td>
            </tr>
            <tr>
              <th>تاريخ التبليغ </th>
              <td>
                <input
                  className="form-control"
                  type="datetime-local"
                  value={notification_date}
                  onChange={(e) => {
                    setNotification_date(dayjs(e.target.value).format('YYYY-MM-DDTHH:mm'))
                  }}
                />
              </td>
            </tr>
            <tr>
              <th>التذكير باعادة التبليغ </th>
              <td>
                <input
                  className="form-control"
                  type="datetime-local"
                  value={reminder_rereport_date}
                  onChange={(e) => {
                    setReminder_rereport_date(dayjs(e.target.value).format('YYYY-MM-DDTHH:mm'))
                  }}
                />
              </td>
            </tr>
          </table>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>الغاء</Button>
          <Button onClick={handleSave}>حفظ</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
