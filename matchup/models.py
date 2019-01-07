from django.db import models

# Create your models here.
class Speech(models.Model):
	path = models.CharField(max_length=300)
	speaker = models.CharField(max_length=300)
	year = models.CharField(max_length=300)
	division = models.CharField(max_length=300)
	score = models.FloatField()