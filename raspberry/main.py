import RPi.GPIO as GPIO
import time
import datetime
import requests

GPIO.setmode(GPIO.BCM)
GPIO.setup(17,GPIO.IN)
last = None
while True:
	if GPIO.input(17) == 1:
		current = time.time()
		if last != None and 0.1 < (current-last) < 4: 
			print("Delta : {}".format((current-last)))
			requests.post("https://moussimousse.louvainlinux.org/add_record", json={"time": round(datetime.datetime.now().timestamp()), "speed": 1 / (current - last)})
			last = None
		else:                      
			last = current