import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import AppointmentForm from "../AppointmentForm/AppoinmentForm";
import { v4 as uuidv4 } from 'uuid';
import Popup from 'reactjs-popup';

const DoctorCard = ({ name, speciality, experience, clinic, ratings, profilePic}) => {
    const [showModal, setShowModal] = useState(false);
    const [appointments, setAppoinments] = useState([]);

    //Check if appointments data exist in localStorage
    useEffect(() => {
        const storedAppointments = JSON.parse(localStorage.getItem(name));
        if (storedAppointments) {
            storedAppointments(storedAppointments);
        }
    }, [name]);

    const handleCancel = (appointmentId) => {
        const updatedAppoinments = appointments.filter(appointments => appointments.id !== appointmentId);
        setAppoinments(updatedAppoinments);
        localStorage.setItem(name, JSON.stringify(updatedAppoinments));
        //remove item from localStorage
        if (updatedAppoinments.length === 0) {
            localStorage.removeItem(name);
            localStorage.removeItem("doctorData");
        }
        console.log("Cancel Clikced");
        window.location.reload();
    };

    const handleFormSubmit = (appointmentData) => {
        const newAppointment = {
            id: uuidv4(),
            ...appointmentData
        };
        const doctorData = {
            name: name,
            speciality: speciality,
        };
        localStorage.setItem('doctorData', JSON.stringify(doctorData));
        const updatedAppoinments = [...appointmentData, newAppointment];
        setAppoinments(updatedAppoinments);
        localStorage.setItem(name, JSON.stringify(updatedAppoinments));
        setShowModal(false);
        window.location.reload();
    };
  return (
    <div className='doctor-card-container'>
        <div className='doctor-card-details-container'>
            <div className='doctor-card-profile-image-container'>
                <img src={profilePic} alt={name} />
            </div>
            <div className='doctor-card-details'>
            <div className="doctor-card-detail-name">{name}</div>
                    <div className="doctor-card-detail-speciality">{speciality}</div>
                    <div className="doctor-card-detail-experience">{experience} years experience</div>
                    {/* <div className="doctor-card-detail-location">{location}</div> */}
                    {/* <div className="doctor-card-detail-clinic">Stay healthy</div> */}
                    <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>
            </div>
            <Popup
                style={{ backgroundColor: '#fff' }}
                trigger={
                    <button className={`book-appoinment-btn ${appointments.length > 0 ? 'cancel-appoinment' : ''}` }>
                        {appointments.length > 0 ? (
                            <div>Cancel Appointment</div>
                        ) : (
                            <div>Book Appointment</div>
                        )}
                            <div>No Booking</div>
                    </button>
                }
                modal
                open={showModal}
                onClass={() => setShowModal(false)}
            >
                {(close) => (
                        <div className="doctorbg" style={{ height: '100vh', overflow: 'scroll', backgroundColor: 'white' }}>
                            <div>
                                <div className="doctor-card-profile-image-container">
                                    <img src={profilePic} alt={name} />
                                </div>
                                <div className="doctor-card-details">
                                    <div className="doctor-card-detail-name">{name}</div>
                                    <div className="doctor-card-detail-speciality">{speciality}</div>
                                    <div className="doctor-card-detail-experience">{experience} years experience </div>
                                    {/* <div className="doctor-card-detail-location">{location}</div>/ */}
                                    <div className="doctor-card-detail-clinic">{clinic}</div>
                                    <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>
                                </div>
                            </div>

                            {appointments.length > 0 ? (
                                <>
                                    <input type="text" />
                                    <h3 style={{ textAlign: 'center' }}>Appointment Booked!</h3>
                                    {appointments.map(appointment => (
                                        // <center>
                                        <div className="bookedInfo" key={appointment.id}>
                                            <p>Name: {appointment.name}</p>
                                            <p>Phone Number: {appointment.phoneNumber}</p>
                                            <p>Date of Appointment: {appointment.date}</p>
                                            <p>Time Slot: {appointment.time}</p>
                                            <button onClick={() => handleCancel(appointment.id)}>Cancel Appointment</button>
                                        </div>
                                        // </center>
                                    ))}
                                </>
                            ) : (
                                <AppointmentForm doctorName={name} doctorSpeciality={speciality} onSubmit={handleFormSubmit}/>
                            )}
                        </div>
                    )}
            </Popup>
        </div>
    </div>
  )
}

export default DoctorCard;