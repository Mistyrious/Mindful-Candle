#include <RunningAverage.h>

const int sound = A7;

unsigned long lastDebounce = 0;
unsigned long debounceDelay = 1000;

//running average of last minute
RunningAverage rmSound(60);

void setup() {
  pinMode(sound, INPUT);
  Serial.begin(9600);
  rmSound.clear();
  rmSound.addValue(0); //so that value isn't null
}

void loop() {
  if((millis() - lastDebounce) > debounceDelay){
    rmSound.addValue(analogRead(sound));
    long soundData = rmSound.getAverage();
    Serial.println(soundData);
    lastDebounce = millis();
  }
}
