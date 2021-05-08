int pinAnalogInput = A0;
int LEDOutput = 13;
int valueLight = 0;

void setup() {
  pinMode(LEDOutput, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  valueLight = analogRead(pinAnalogInput);
  Serial.println(valueLight);
  if (valueLight < 500) {
    digitalWrite(LEDOutput, LOW);
  } else {
    digitalWrite(LEDOutput, HIGH);
  }
  delay(500);
}
