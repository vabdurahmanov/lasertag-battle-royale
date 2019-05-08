#include <WiFi.h>
#include <HTTPClient.h>

#define RECV_PIN 22  // 22 on esp32, 9 on uno

const char* ssid = ""; 
const char* pass = "";

int values = 0; 

void setup() {
Serial.begin(115200);
pinMode(RECV_PIN, INPUT); //receiver = input
WiFi.begin(ssid, pass); 
  while (WiFi.status() != WL_CONNECTED)
  {
  delay(1000);
  Serial.print(".");
  }
  Serial.println("WiFi connected"); 
}

void loop(){
   values = digitalRead(RECV_PIN);
     if (values != 1){
     Serial.println("...Incoming...");  
     Serial.println(values); 
      if (WiFi.status() == WL_CONNECTED){
          HTTPClient http; 

          http.begin("https://us-central1-lasertag-battle-royale.cloudfunctions.net/decrementHealth"); 
          http.addHeader("Content-Type", "application/x-www-form-urlencoded"); 
          int httpResponseCode = http.POST("vestID=1"); 

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
   
}