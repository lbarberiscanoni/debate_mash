from django.core.management import BaseCommand
from matchup.models import Speech
import subprocess
import os

class Command(BaseCommand):

	def handle(self, *args, **kwargs):

		Speech.objects.all().delete()

		subprocess.call("aws s3 ls s3://congress-rounds/ > video_list.txt", shell=True)

		videos = []
		with open("video_list.txt", "r") as f:
			txt = f.read()
			raw_list = txt.split("\n")
			raw_list.pop(len(raw_list) - 1)

			for x in raw_list:
				el = [x for x in x.split(" ") if ".mp4" in x]
				videos.append(el[0])

		print(len(videos))
		base_url = "https://s3-us-west-1.amazonaws.com/congress-rounds/"

		for video in videos:
			
			Speech.objects.create(
				path = base_url + video,
				speaker = "unknown",
				year = video.split("_")[1],
				division = video.split("_")[0],
				score = 1500,
			)