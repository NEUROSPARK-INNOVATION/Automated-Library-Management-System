#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <SPI.h>
#include <MFRC522.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <SoftwareSerial.h>

// Pin Definitions
#define SS_PIN 5
#define RST_PIN 22
#define SOLENOID_PIN 23
#define BUZZER_PIN 19
#define DOOR_SENSOR_PIN 21

// Initialization
MFRC522 mfrc522(SS_PIN, RST_PIN);


LiquidCrystal_I2C lcd(0x27, 16, 2);

// Wi-Fi Credentials
const char* ssid = "your_SSID";
const char* password = "your_PASSWORD";

// API Endpoints
const String apiEndpoint = "https://your-api-endpoint";
const String bookScanEndpoint = "https://your-book-scan-endpoint";

// QR Code Reader (using SoftwareSerial)
SoftwareSerial qrSerial(10, 11); // RX, TX pins for QR scanner
String qrCode = "";

// Flags and Timing Variables
bool cardLocked = false;
bool doorOpen = false;
unsigned long lastLCDUpdateTime = 0;
const unsigned long lcdMessageDuration = 2000;
unsigned long doorUnlockTime = 0;
const unsigned long doorOpenDuration = 5000;

void setup() {
    Serial.begin(9600);
    SPI.begin();
    mfrc522.PCD_Init();
    lcd.begin(16, 2);
    lcd.backlight();

    pinMode(SOLENOID_PIN, OUTPUT);
    pinMode(BUZZER_PIN, OUTPUT);
    pinMode(DOOR_SENSOR_PIN, INPUT);

    connectToWiFi();
    qrSerial.begin(9600); // Initialize the QR scanner on the specified serial pins
}

void loop() {
    // RFID Handling
    if (mfrc522.PICC_IsNewCardPresent() && mfrc522.PICC_ReadCardSerial() && !cardLocked) {
        String rfidTag = getRFIDTag();
        lockCard();
        validateStudent(rfidTag);
    }

    // QR Code Handling
    if (doorOpen && qrSerial.available()) {
        qrCode = qrSerial.readStringUntil('\n'); // Read QR code as string
        if (!qrCode.isEmpty()) {
            registerBook(qrCode);
        }
    }

    // Check Door State
    if (doorOpen && millis() - doorUnlockTime >= doorOpenDuration) {
        closeDoor();
    }

    // Handle LCD Message Timeout
    if (millis() - lastLCDUpdateTime >= lcdMessageDuration) {
        lcd.clear();
    }
}

void connectToWiFi() {
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
        Serial.println("Connecting to WiFi...");
    }
    Serial.println("WiFi Connected");
}

String getRFIDTag() {
    String tag = "";
    for (byte i = 0; i < mfrc522.uid.size; i++) {
        tag += String(mfrc522.uid.uidByte[i], HEX);
    }
    tag.toUpperCase();
    return tag;
}

void lockCard() {
    cardLocked = true;
    digitalWrite(SOLENOID_PIN, LOW); // Lock card slot
}

void unlockCard() {
    cardLocked = false;
    digitalWrite(SOLENOID_PIN, HIGH); // Unlock card slot
}

void validateStudent(String tag) {
    HTTPClient http;
    http.begin(apiEndpoint);
    http.addHeader("Content-Type", "application/json");
    
    String payload = "{\"rfid_tag\":\"" + tag + "\"}";
    
    int responseCode = http.POST(payload);
    
    if (responseCode == 200) {
        String response = http.getString();
        
        if (response == "Student Found") {
            lcd.setCursor(0, 0);
            lcd.print("Access Granted");
            lastLCDUpdateTime = millis(); // Update time when displaying new message
            
            openDoor(); // Open the door for the student to enter
            
        } else {
            lcd.setCursor(0, 0);
            lcd.print("Access Denied");
            lastLCDUpdateTime = millis(); // Update time when displaying new message
        }
        
    } else {
        lcd.setCursor(0, 0);
        lcd.print("HTTP Error");
        lastLCDUpdateTime = millis(); // Update time when displaying new message
        Serial.println("Error in HTTP request: " + String(responseCode));
    }
    
    http.end();
}

void registerBook(String qrCode) {
    HTTPClient http;
    
    http.begin(bookScanEndpoint);
    http.addHeader("Content-Type", "application/json");
    
    String payload = "{\"book_qr_code\":\"" + qrCode + "\"}";
    
    int responseCode = http.POST(payload);
    
    if (responseCode == 200) {
        String response = http.getString();
        
        lcd.setCursor(0, 0);
        lcd.print(response); // Display server response on LCD
        
        lastLCDUpdateTime = millis(); // Update time when displaying new message
        
    } else {
        lcd.setCursor(0, 0);
        lcd.print("HTTP Error");
        lastLCDUpdateTime = millis(); // Update time when displaying new message
        
        Serial.println("Error in HTTP request: " + String(responseCode));
        
     }
     
     http.end();
}

void openDoor() {
    digitalWrite(SOLENOID_PIN, HIGH); // Unlock the door solenoid
    doorOpen = true; // Set door state to open
    doorUnlockTime = millis(); // Store the time of unlocking
}

void closeDoor() {
    digitalWrite(SOLENOID_PIN, LOW); // Lock the door solenoid
    unlockCard(); // Unlock the student card after closing the door
    doorOpen = false; // Set door state to closed
}
