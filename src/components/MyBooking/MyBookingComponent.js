import React, {useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import CommonTableComponent from '../../commoncontrols/CommonTableComponent';
import { AiFillEdit } from "react-icons/ai";
import CommonModal from '../../commoncontrols/commonModal';
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { get } from '../../api/api';
import { PATIENT_API } from '../../api/baseUrl';
import { Button } from 'react-bootstrap';
import StackingToast from '../../commoncontrols/commonToastMessage';

const MyBookingComponent = () => {
  const tableCol = [
    {
      dataField: "id",
      text: "ID",
    },
    {
      dataField: "first_name",
      text: "Doctor Name",
      sort: true,
    },
    {
      dataField: "email",
      text: "For Counsaltation",
    },
    {
      dataField: "status",
      text: "Status",
      formatter: (cell, row, rowIndex, formatExtraData) => {
        console.log("row data", row)
        return (
          <>
            <div
              style={{
                textAlign: "center",
                cursor: "pointer",
                lineHeight: "normal"
              }}>
              {row && row.status ? "Completed" : <><span>Inprogress</span>{'  '}<Button variant={'primary'} size="sm" onClick={() => captureData(row)}>Cancel Booking</Button> </>
              }
            </div>
          </>
        );
      }
    }
  ];
  const modalData = {
    modalTitle: 'Are you sure want to cancel booking?',
    modalSaveBtnTitle: 'Cancel Booking',
    modalClose: 'Close'
  }
  const toastTextData = {
    toastHeader: "Cancel Booking",
    toastBody: "Booking is cancel successfully"
  }
  const [openModal, setOpenModal] = useState(false);
  const [columnState, setColumnState] = useState(tableCol);
  const [bookingData, setBookingData] = useState([]);
  const [currentBooking, setCurrentBooking] = useState({});
  const [loader, setLoader] = useState(false);
  const [toastShowHide, setToastShowHide] = useState(false);
  const dispatch = useDispatch();
  const modalSate = useSelector((state) => state.modalShowHide);

  const captureData = (data) =>{
    dispatch({ type: "ISOPEN" });
    setCurrentBooking(data)
  }

  const cancelBooking = () =>{
    console.log("cancel booking", currentBooking);
    dispatch({ type: "ISHIDE" });
    setToastShowHide(true)
  }

  const fetchBookingData = async() =>{
    setLoader(true)
    await get(PATIENT_API).then(res => {
      if(res.data !== 'undefined' && res.data != null){
        let mappedData = res.data.map((user, index) => ({ ...user, status: index % 2 === 0 ? true: false }));
        setBookingData(mappedData);
        setLoader(false);
      }
    }).catch(err => {
      console.log("error in api response", err);
    });
  }
  const showHideToast = () =>{
    setToastShowHide(false)
  }
  useEffect(() => {
      fetchBookingData();
  }, []);
  
  return (
    <>
      <Container fluid className='w-75 my-5'>
      {loader && <div className='spinnerOuter'><Spinner animation="grow" variant="primary" className='spinnerClass' /></div>}
        <CommonTableComponent
          data={bookingData}
          columns={columnState}
          pagination={10}
        />
        <StackingToast showToast={toastShowHide} showHideToast={showHideToast}  toastData={toastTextData} />
      </Container>
      <CommonModal showModal={modalSate.isOpenHide} modalData={modalData} onSaveChanges={cancelBooking}>
        <h3>Cancel My Booking</h3>
      </CommonModal>
    </>
  );
}

export default MyBookingComponent;
