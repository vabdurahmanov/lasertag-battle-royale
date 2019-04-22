#define RECV_PIN 22  // 22 on esp32, 9 on uno
int values = 0; 

void setup() {
Serial.begin(115200);
pinMode(RECV_PIN, INPUT); //receiver = input
}

void loop(){
   values = digitalRead(buttonPin);
   while (values != 0){
     Serial.println("...Incoming...");  
     Serial.println(values);  
   }
}