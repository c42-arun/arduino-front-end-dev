int buttonInput = 2;
int LEDOutput = 13;

void setup() {
  pinMode(buttonInput, INPUT_PULLUP);
  pinMode(LEDOutput, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int sensorVal = digitalRead(buttonInput);
  if (sensorVal == HIGH) {
    digitalWrite(13, LOW);
    Serial.println("HIGH");
  } else {
    digitalWrite(13, HIGH);
    Serial.println("LOW");
  }
}
