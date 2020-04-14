from django.db import models

# Create your models here.
class Speech(models.Model):
	path = models.CharField(max_length=300)
	speaker = models.CharField(max_length=300)
	year = models.CharField(max_length=300)
	division = models.CharField(max_length=300)
	score = models.FloatField()

class User(models.Model):
	name = models.CharField(max_length=300)
	password = models.CharField(max_length=20, default="rhswarriors")

#https://able.bio/rhett/how-to-order-by-count-of-a-foreignkey-field-in-django--26y1ug1
class ViewRecord(models.Model):
	viewer = models.ForeignKey(User, on_delete=models.CASCADE)
	speech = models.ForeignKey(Speech, on_delete=models.CASCADE)
	date = models.DateTimeField(auto_now_add=True, blank=True)