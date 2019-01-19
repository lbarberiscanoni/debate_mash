from django.core.management import BaseCommand
from matchup.models import Speech
import subprocess
import os

class Command(BaseCommand):

	def handle(self, *args, **kwargs):

		Speech.objects.all().delete()

		videos = os.listdir("static/matchup")

		print(videos)

		for video in videos:

			print(video, video.split("_"))

			Speech.objects.create(
				path = video.replace(".mp4", ""),
				speaker = "unknown",
				year = video.split("_")[1],
				division = video.split("_")[0],
				score = 1500,
			)