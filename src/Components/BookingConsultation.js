import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import FindDoctorSearch from './FindDoctorSearch/FindDoctorSearch';
import DoctorCard from './DoctorCard/DoctorCard';

const BookingConsultation = () => {
    const [searchParams] = useSearchParams();
    const [doctor, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [isSearched, setIsSearched] = useState(false);

    const getDoctorDetails = () => {
        fetch('https://api.npoint.io/9a5543d36f1460da2f63')
        .then(res => res.json())
        .then(data => {
            if (searchParams.get('speciality')) {
                // window.reload()
                const filtered = data.filter(doctor => doctor.speciality.toLowerCase() === searchParams.get('speciality').toLowerCase());

                setFilteredDoctors(filtered);
                
                setIsSearched(true);
                window.reload()
            } else {
                setFilteredDoctors([]);
                setIsSearched(false);
            }
            setDoctors(data);
        })
        .catch(err => console.log(err));
    }

    const handleSearch = (searchText) => {
        if (searchText === '') {
            setFilteredDoctors([]);
            setIsSearched(false);
            } else {
                
            const filtered = doctor.filter(
                (doctor) =>
                // 
                doctor.speciality.toLowerCase().includes(searchText.toLowerCase())
                
            );
                
            setFilteredDoctors(filtered);
            setIsSearched(true);
            window.location.reload()
        }
    };

    const navigate = useNavigate();
    useEffect(() => {
        getDoctorDetails();
        // const authtoken = sessionStorage.getItem("auth-token");
        // if (!authtoken) {
        //     navigate("/login");
        // }
    }, [searchParams])
  return (
    <center>
        <div className='searchpage-container'>
            <FindDoctorSearch onSearch={handleSearch} />
            <div className='search-result-container'>
                {isSearched ? (
                    <center>
                        <h2>{filteredDoctors.length} doctors are avilable {searchParams.get('location')}</h2>
                        <h3>Book appointment with minimum wait-time & verified doctor details</h3>
                        {filteredDoctors.length > 0 ? (
                            filteredDoctors.map(doctor => <DoctorCard className="doctorcard" {...doctor} key={doctor.name} />)
                        ) : (
                            <p>No Doctors Found.</p>
                        )}
                    </center>
                ) : (
                    ''
                )}
            </div>
        </div>
    </center>
  )
}

export default BookingConsultation;