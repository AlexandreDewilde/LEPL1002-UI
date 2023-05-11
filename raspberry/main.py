import RPi.GPIO as GPIO
import time
GPIO.setmode(GPIO.BCM)
GPIO.setup(17,GPIO.IN)
last = None
while True:
	if GPIO.input(17) == 1:
                current = time.time()
                if last != None and 0.1 < (current-last) < 2: 
                        print("Delta : {}".format((current-last)))
			last = None
		else:                      
			last = current