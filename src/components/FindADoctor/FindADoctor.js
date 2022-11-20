import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import CommonTableComponent from '../../commoncontrols/CommonTableComponent';
import Button from 'react-bootstrap/Button';
import CommonModal from '../../commoncontrols/commonModal';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from 'react-redux';
import { get } from '../../api/api';
import { PATIENT_API } from '../../api/baseUrl';
import Spinner from 'react-bootstrap/Spinner';
import StackingToast from '../../commoncontrols/commonToastMessage';
import TimePicker from 'react-time-picker';

const FindADoctor = () => {
  const tableCol = [
    {
      dataField: "id",
      text: "ID",
    },
    {
      dataField: "name",
      text: "Name",
      sort: true,
    },
    {
      dataField: "age",
      text: "age",
    },
    {
      dataField: "email",
      text: "email",
    },
    {
      dataField: "phone",
      text: "phone",
    },
    {
      dataField: "medicalConditions",
      text: "medicalConditions",
    },

    {
      dataField: "status",
      text: "Status",
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return (
          <>
            <div
              style={{
                textAlign: "center",
                cursor: "pointer",
                lineHeight: "normal"
              }}>

              <Button variant={'primary'} size="sm" onClick={() => captureData(row)}>Book</Button>
            </div>
          </>
        );
      }
    }
  ];
  const modalData = {
    modalTitle: 'Select your slot',
    modalSaveBtnTitle: 'Confirm Booking',
    modalClose: 'Close'
  }
  const toastTextData = {
    toastHeader: "Book Appointment",
    toastBody: "Your appointment is booked successfully"
  }
  const [columnState, setColumnState] = useState(tableCol);
  const [doctorData, setDoctorData] = useState({});
  const [startDate, setStartDate] = useState(new Date());
  const [findDoctorData, setFindDoctorData] = useState([]);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const modalSate = useSelector((state) => state.modalShowHide);
  const [toastShowHide, setToastShowHide] = useState(false);
  const [bookingTime, setBookingTime] = useState('01:00');

  const captureData = (data) => {
    dispatch({ type: "ISOPEN" });
    setDoctorData(data)
  }
  const saveBooking = async () => {
    console.log("saveBooking", doctorData, startDate, bookingTime);
    dispatch({ type: "ISHIDE" });
    setToastShowHide(true)
  }

  const showHideToast = () => {
    setToastShowHide(false)
  }

  const fetchDoctorData = async () => {
    setLoader(true)
    await get(PATIENT_API).then(res => {
      // res.data = [];
      if (res.data !== 'undefined' && res.data != null) {
        setFindDoctorData(res.data);
        setLoader(false);
      }
    }).catch(err => {
      console.log("error in api response", err);
    });
  }

  useEffect(() => {
    fetchDoctorData();
  }, []);

  return (
    <>
      <Container fluid className='w-75 my-5'>
        {loader && <div className='spinnerOuter'><Spinner animation="grow" variant="primary" className='spinnerClass' /></div>}
        <CommonTableComponent
          data={findDoctorData}
          columns={columnState}
          pagination={findDoctorData.length > 10 ? 10 : findDoctorData.length}
        />
        <StackingToast showToast={toastShowHide} showHideToast={showHideToast} toastData={toastTextData} />
      </Container>
      <CommonModal showModal={modalSate.isOpenHide} modalData={modalData} onSaveChanges={saveBooking}>
        <DatePicker selected={startDate} onChange={(date: Date) => setStartDate(date)} minDate={new Date()} />
        <div className='timeOuter w-100 my-10'>
          {/* <input id="appt-time" type={'time'} name={'appt-time'} value={bookingTime} onChange={setBookingTime} className='w-100' /> */}
          <TimePicker onChange={setBookingTime} value={bookingTime} disableClock={true} />
        </div>
      </CommonModal>
    </>
  );
}

export default FindADoctor;
