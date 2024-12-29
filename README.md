# Automated Library Management System

## Overview

The **Automated Library Management System** is an innovative solution to streamline the management of library resources, borrowing, and security. Utilizing **RFID technology** and **QR code scanning**, this system automates the process of book borrowing, returning, and student verification. The system ensures secure access, efficient book tracking, and a user-friendly interface.

### Key Features

- **RFID-Based Authentication**:  
  Students authenticate their identity by inserting their RFID cards into a card reader. If they are valid, the door unlocks, allowing access to books.

- **QR Code Scanning for Books**:  
  Books are tagged with unique QR codes. When a student scans a book, the system registers the borrowing action and updates the database.

- **Automated Door Locking**:  
  The solenoid lock ensures that the door is automatically locked when unauthorized access is detected or after a book has been borrowed.

- **Web Interface**:  
  A web interface is available for students and administrators to check book availability, manage borrowed books, and handle user accounts.

- **Database Integration**:  
  The system integrates with a MongoDB database to manage student and book records. The data is updated in real time to reflect borrowing actions.

## Technologies Used

- **Hardware**:  
  - **ESP32**: Main controller for the system.  
  - **MFRC522 RFID Module**: For student verification.  
  - **QR Code Scanner**: For scanning books.  
  - **Solenoid Lock**: For controlling access to the library.  
  - **LCD Display**: For providing feedback to users.

- **Software**:  
  - **Frontend**:  
    - **HTML**: For structuring the web interface.  
    - **CSS**: For styling the web pages and ensuring responsive design.  
    - **JavaScript**: For handling dynamic actions and interacting with the backend via API calls.
  
  - **Backend**:  
    - **Node.js**: JavaScript runtime for building the server.  
    - **Express.js**: Framework for building the API and handling HTTP requests.  
    - **MongoDB**: Database for managing student and book data.

  - **Libraries**:  
    - **HTTPClient Library**: For sending HTTP requests to the backend from the ESP32.  
    - **Arduino IDE**: For programming the ESP32.

## How It Works

1. **Student Verification**:  
   The system checks the student's RFID tag against a MongoDB database. If the student is valid, the door unlocks.

2. **Book Borrowing**:  
   After the door is opened, the student scans the QR code of the book they wish to borrow. The system updates the database and locks the door once the transaction is complete.

3. **System Feedback**:  
   LCD displays feedback to the user throughout the process, indicating whether access is granted, books are borrowed, or any errors have occurred.

## Installation

### 1. Hardware Setup

Follow the instructions to set up the hardware components for the **Automated Library Management System**:

1. **ESP32 Setup**:  
   - Ensure you have an **ESP32** development board.
   - Connect the following hardware components to the ESP32:

     - **MFRC522 RFID Reader**:
       - **SDA** → **GPIO5**
       - **SCK** → **GPIO18**
       - **MOSI** → **GPIO23**
       - **MISO** → **GPIO19**
       - **RST** → **GPIO22**

     - **QR Code Scanner**:
       - **TX** → **GPIO17** (or any other RX pin)
       - **RX** → **GPIO16** (or any other TX pin)
     
     - **Solenoid Lock**:
       - Connect the solenoid lock to a relay or directly to **GPIO23** on the ESP32 for controlling the door lock.
     
     - **LCD Display** (Optional):
       - Connect the LCD to the **I2C interface** on the ESP32:
         - **SDA** → **GPIO21**
         - **SCL** → **GPIO22**

2. **Connect the ESP32 to Your Computer**:  
   Connect the **ESP32** to your computer using a USB cable.

---

### 2. Software Setup

#### A. Frontend Setup (Web Interface)

1. **Clone the Frontend Repository**:  
   Clone the frontend repository from GitHub:
   ```bash
   git clone https://github.com/your-username/frontend.git
2.  ## Installation

### 1. Hardware Setup

Follow the instructions to set up the hardware components for the **Automated Library Management System**:

1. **ESP32 Setup**:  
   - Ensure you have an **ESP32** development board.
   - Connect the following hardware components to the ESP32:

     - **MFRC522 RFID Reader**:
       - **SDA** → **GPIO5**
       - **SCK** → **GPIO18**
       - **MOSI** → **GPIO23**
       - **MISO** → **GPIO19**
       - **RST** → **GPIO22**

     - **QR Code Scanner**:
       - **TX** → **GPIO17** (or any other RX pin)
       - **RX** → **GPIO16** (or any other TX pin)
     
     - **Solenoid Lock**:
       - Connect the solenoid lock to a relay or directly to **GPIO23** on the ESP32 for controlling the door lock.
     
     - **LCD Display** (Optional):
       - Connect the LCD to the **I2C interface** on the ESP32:
         - **SDA** → **GPIO21**
         - **SCL** → **GPIO22**

2. **Connect the ESP32 to Your Computer**:  
   Connect the **ESP32** to your computer using a USB cable.

---

### 2. Software Setup

#### A. Frontend Setup (Web Interface)

1. **Clone the Frontend Repository**:  
   Clone the frontend repository from GitHub:
   ```bash
   git clone https://github.com/your-username/frontend.git
2. **Install Dependencies**:
    Navigate to the frontend directory and install the dependencies using npm:
    ```bash
    cd frontend
    npm install
3. **Run the Frontend**:
    Start the frontend server to view the web interface:
    ```bash
    npm start
    The frontend should now be available at http://localhost:3000 in your browser.

#### B. Backend Setup (API Server)
1. **Clone the Backend Repository**:
    Clone the backend repository from GitHub:
   ```bash
   git clone https://github.com/your-username/backend.git
2. **Install Dependencies**:
    Navigate to the backend directory and install the dependencies using npm:
   ```bash
    cd backend
    npm install
3. **Configure API Endpoints**:
In the backend folder, open the config.js (or similar) file and configure your MongoDB connection and API endpoints:
    js
    Copy code
    const mongoURI = 'mongodb://localhost:27017/library'; // or use a remote database
    const apiEndpoint = 'http://localhost:5000/api'; // or your deployed server's URL
4. **Run the Backend Server**:
    Start the backend server:
    ```bash
    npm start
    The backend API should now be available at http://localhost:5000 (or the configured URL).


REST OF THE DETAILS ABOUT THE PROJECT WILL BE SHOWCASE ON **NEUROVERSE** - *NEUROSPARKS'S OWN WEBSITE(COMMING SOON.........)*.
THANK YOU.
RADHE RADHE 🙏🙏
HARE KRISHNA🙏🙏

