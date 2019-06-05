#include <WiFi.h>
#include <HTTPClient.h>
#define EM_PIN 1 // for ESP32

const char* ssid = "AndroidAP"; 
const char* pass = "3a3a540cb0c9";
const int buttonPin = 23;    // for ESP32
int buttonState = 0;        // variable for reading the pushbutton status
bool pressed = false;       // boolean to indicate whether or not the button is released
long lastDebounceTime = 0;  // the last time the output pin was toggled
long debounceDelay = 50;    // this is the interval between consecutive presses

void setup(){ 
    Serial.begin(115200);
    pinMode(EM_PIN, OUTPUT);    // emitter = output
    pinMode(buttonPin, INPUT);  // trigger = input
    WiFi.begin(ssid, pass); 
    while (WiFi.status() != WL_CONNECTED){
    delay(1000);
    Serial.print(".");
    }
    Serial.println("WiFi connected"); 
}

void loop(){ 
  buttonState = digitalRead(buttonPin);
  if ((millis() - lastDebounceTime) > debounceDelay){
    if (buttonState == HIGH && !pressed){
        digitalWrite(EM_PIN, HIGH);
        Serial.println("...Start emitting..."); 
        digitalWrite(EM_PIN, LOW);
        Serial.println("...Stop emitting...");
        pressed = true;
        if (WiFi.status() == WL_CONNECTED){
            HTTPClient http; 
            http.begin("https://us-central1-lasertag-battle-royale.cloudfunctions.net/decrementAmmo"); 
            http.addHeader("Content-Type", "application/x-www-form-urlencoded"); 
            int httpResponseCode = http.POST("laserGunID=3"); 
            if (httpResponseCode > 0){
                String response = http.getString(); 
                Serial.println(httpResponseCode); 
                Serial.println(response); 
            }
           else{
            Serial.println("Error on sending POST: "); 
            Serial.println(httpResponseCode); 
            } 
            http.end(); 
        }
        else{
            Serial.println("Error in WiFi connection"); 
        }  
     }
    else if (buttonState == HIGH && pressed){
        digitalWrite(EM_PIN, LOW); 
        pressed = !pressed; 
        lastDebounceTime = millis();
      }
   }
}