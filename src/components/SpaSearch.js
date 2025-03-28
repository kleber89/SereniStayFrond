import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from './auth';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

const INITIAL_SPAS = [
  {
    id: 1,
    name: "Serenity Spa",
    location: "Medellin (Colombia)",
    rating: 4.5,
    price: "$20/hour",
    description: "Experience maximum relaxation at our luxury spa",
    imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800",
    services: ["Massages", "Sauna", "Facial treatments"]
  },
  {
    id: 2,
    name: "Wellness Center",
    location: "Bogota (Colombia)",
    rating: 4.8,
    price: "$25/hour",
    description: "Holistic center for your complete wellbeing",
    imageUrl: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800",
    services: ["Hydrotherapy", "Yoga", "Massages"]
  },
  {
    id: 3,
    name: "Mountain View Spa",
    location: "Cartagena (Colombia)",
    rating: 4.2,
    price: "$30/hour",
    description: "Relax at our spa with mountain views",
    imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800",
    services: ["Massages", "Heated pool", "Body treatments"]
  },
  {
    id: 4,
    name: "Beauty Spa",
    location: "Monteria (Colombia)",
    rating: 4.2,
    price: "$18/hour",
    description: "Your place for beauty and wellness",
    imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800",
    services: ["Manicure", "Pedicure", "Facial treatments"]
  },
  {
    id: 5,
    name: "Zen Spa",
    location: "Cali (Colombia)",
    rating: 4.6,
    price: "$22/hour",
    description: "An oasis of tranquility in the heart of the city",
    imageUrl: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800",
    services: ["Massages", "Yoga", "Sauna"]
  },
  {
    id: 6,
    name: "Nature Spa",
    location: "Cartagena (Colombia)",
    rating: 4.9,
    price: "$28/hour",
    description: "Relax in harmony with nature",
    imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800",
    services: ["Massages", "Heated pool", "Facial treatments"]
  },
];

function SpaSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [spas] = useState(INITIAL_SPAS);
  const navigate = useNavigate();
  const [selectedSpa, setSelectedSpa] = useState(null);
  const [reservationDate, setReservationDate] = useState(() => dayjs());
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  const filteredSpas = spas.filter(spa =>
    spa.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    spa.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleReserveClick = (spa) => {
    if (!isAuthenticated()) {
      navigate('/login', {
        state: { from: '/spa', message: 'You must log in to make a reservation' }
      });
      return;
    }
    setSelectedSpa(spa);
    setOpenDialog(true);
  };

  const handleReserveConfirm = () => {
    if (!name || !phone) {
      alert('Please complete your name and phone number');
      return;
    }
    const reservationData = {
      spa: selectedSpa.name,
      date: reservationDate.format('YYYY-MM-DD HH:mm'),
      name,
      phone,
      notes,
      price: selectedSpa.price
    };
    console.log('Reservation made:', reservationData);
    alert(`Reservation confirmed at ${selectedSpa.name} for ${reservationDate.format('MM/DD/YYYY at HH:mm')}`);
    // Here you could send the data to your API
    setOpenDialog(false);
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setPhone('');
    setNotes('');
    setReservationDate(dayjs());
  };

  return (
    <div className="spa-search">
      {/* Search bar */}
      <div className="search-header">
        <h2>Find Your Ideal Spa</h2>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>
      
      {/* Filtered spa listing */}
      <div className="spa-grid">
        {filteredSpas.map(spa => (
          <div key={spa.id} className="spa-card">
            <div className="spa-image">
              <img
                src={spa.imageUrl}
                alt={spa.name}
                loading="lazy"
              />
              <div className="spa-price">{spa.price}</div>
            </div>
            <div className="spa-info">
              <h3>{spa.name}</h3>
              <p className="location">📍 {spa.location}</p>
              <p className="rating">⭐ {spa.rating}</p>
              <p className="description">{spa.description}</p>
              <div className="services">
                {spa.services?.map((service, index) => (
                  <span key={index} className="service-tag">{service}</span>
                ))}
              </div>
              <button
                className="book-button"
                onClick={() => handleReserveClick(spa)}
              >
                {isAuthenticated() ? "Book Now" : "book now"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Reservation dialog */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Reservation at {selectedSpa?.name}</DialogTitle>
          <DialogContent>
            <div style={{ margin: '20px 0' }}>
              <DateTimePicker
                label="Reservation date and time"
                value={reservationDate}
                onChange={(newValue) => setReservationDate(newValue)}
                minDate={dayjs()}
                minutesStep={30}
                format="MM/DD/YYYY HH:mm"
              />
            </div>
            <TextField
              label="Your full name"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
              label="Contact phone"
              fullWidth
              margin="normal"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <TextField
              label="Additional notes (optional)"
              fullWidth
              margin="normal"
              multiline
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            <p style={{ marginTop: '15px' }}>
              <strong>Price:</strong> {selectedSpa?.price}
            </p>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button
              onClick={handleReserveConfirm}
              variant="contained"
              color="primary"
            >
              Confirm Reservation
            </Button>
          </DialogActions>
        </Dialog>
      </LocalizationProvider>
    </div>
  );
}

export default SpaSearch;