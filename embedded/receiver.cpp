#include <WiFi.h>
#include <HTTPClient.h>

#define RECV_PIN 22  // 22 on esp32, 9 on uno
#define RECV2_PIN 39 // 2nd receiver
#define LED_PIN 14

const int buttonPin = 23;    // for ESP32
const char* ssid = "AndroidAP"; 
const char* pass = "3a3a540cb0c9";

int values = 0; 
int values2 = 0; 
int buttonState = 0; 
int buttonState2 = 0; 
bool pressed = false;       // boolean to indicate whether or not the button is released
long lastDebounceTime = 0;  // the last time the output pin was toggled
long debounceDelay = 50;   // variable for reading the pushbutton status


void setup(){
Serial.begin(115200);
pinMode(RECV_PIN, INPUT); //receiver = input
pinMode(LED_PIN, OUTPUT); 
pinMode(RECV2_PIN, INPUT); 
pinMode(buttonPin, INPUT);  // button to drain the power

WiFi.begin(ssid, pass); 
  while (WiFi.status() != WL_CONNECTED){
  delay(1000);
  Serial.print(".");
  }
  Serial.println("WiFi connected"); 
}

void loop(){
    buttonState = digitalRead(buttonPin);
    while (1){
        if (millis()){
        if (buttonState == HIGH || buttonState == LOW){
            values = digitalRead(RECV_PIN);
            values2 = digitalRead(RECV2_PIN); 
        if (values != 1 && values2 !=1){
                Serial.println("...Incoming...");  
                Serial.println(values); 
                Serial.println(values2); 
                digitalWrite(LED_PIN, HIGH); 

            if (WiFi.status() == WL_CONNECTED){
                HTTPClient http; 
                http.begin("https://us-central1-lasertag-battle-royale.cloudfunctions.net/decrementHealth"); 
                http.addHeader("Content-Type", "application/x-www-form-urlencoded"); 
                int httpResponseCode = http.POST("vestID=3");     
                http.end(); 
            }
            else{
                Serial.println("Error in WiFi connection"); 
            }
                digitalWrite(LED_PIN, LOW);
        }
      }
   }
}
}