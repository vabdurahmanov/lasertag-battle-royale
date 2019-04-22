//#define EM_PIN 22 // for ESP32
#define EM_PIN 9  // for testing on arduino uno
const int buttonPin = 8;    // the number of the pushbutton pin
int buttonState = 0;        // variable for reading the pushbutton status
bool pressed = false;       // boolean to indicate whether or not the button is released
long lastDebounceTime = 0;  // the last time the output pin was toggled
long debounceDelay = 50;    // this is the interval between consecutive presses

void setup(){ 
  Serial.begin(115200);
  pinMode(EM_PIN, OUTPUT);    // emitter = output
  pinMode(buttonPin, INPUT);  // trigger = input
}

void loop(){ 
  buttonState = digitalRead(buttonPin);
  if ((millis() - lastDebounceTime) > debounceDelay){
    if (buttonState == HIGH && !pressed){
         digitalWrite(EM_PIN, HIGH);
         Serial.println("...Start emitting..."); 
         delay(10000);
         digitalWrite(EM_PIN, LOW);
         Serial.println("...Stop emitting...");
         pressed = true;
     }
     else if (buttonState == HIGH && pressed){
         digitalWrite(EM_PIN, LOW); 
         pressed = !pressed; 
         lastDebounceTime = millis();
      }
   }
}