from django.shortcuts import render
from .models import Speech
from django.core import serializers
from django.shortcuts import redirect
from .utils import elo

# Create your views here.
def index(request):
	return render(request, "home.html")

def search(request):
	return render(request, "search.html")

def matchup(request):
		

	if (request.method == "GET"):
		
		# #overthrow
		# incumbent = Speech.objects.order_by("score").last()
		# new_challenger = Speech.objects.all().exclude(id = incumbent.id).order_by('?')[0]

		#random
		incumbent = Speech.objects.order_by('?')[0]
		new_challenger = Speech.objects.order_by('?')[1]


		
		return render(request, "matchup.html", {"incumbent": incumbent, "challenger": new_challenger})
		
	elif(request.method == "POST"):
		r = dict(request.POST) # request.POST.get('key', 0)
		del r["csrfmiddlewaretoken"]
		winner = r["winner"][0]
		loser = [x for x in r.keys() if (x != "winner") and (x != winner) ][0]

		winner_score_new = elo(float(r[winner][0]), float(r[loser][0]), 1)
		loser_score_new = elo(float(r[winner][0]), float(r[loser][0]), 0)

		incumbent = Speech.objects.get(path=winner)
		defeated = Speech.objects.get(path=loser)

		incumbent.score = winner_score_new
		incumbent.save()

		defeated.score = loser_score_new
		defeated.save()

		new_challenger = Speech.objects.all().exclude(id = incumbent.id).exclude(id = defeated.id).order_by('?')[0]

		return render(request, "matchup.html", {"incumbent": incumbent, "challenger": new_challenger})

def ranking(request):

	ranked_list = Speech.objects.order_by("-score")

	return render(request, "ranking.html", {"ranked_list": ranked_list})
