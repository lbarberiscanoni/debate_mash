from django.db import models

# Create your models here.
class MentalModel(models.Model):
	name = models.CharField(max_length=300)
	definition = models.CharField(max_length=300)
	explanation = models.CharField(max_length=300)
