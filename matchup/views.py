from django.shortcuts import render
from .models import Speech
from django.core import serializers
from django.shortcuts import redirect

# Create your views here.
def main(request):
	fuck = Speech.objects.values()

	def generatePair():
		incumbent = Speech.objects.order_by("score").last()
		new_challenger = Speech.objects.order_by('?').first()
		if incumbent != new_challenger:
			return {"incumbent": incumbent, "challenger": new_challenger}
		else:
			return generatePair()

	if (request.method == "GET"):
		print("triggered")
		
		return render(request, "test.html", generatePair())
		
	elif(request.method == "POST"):
		r = dict(request.POST) # request.POST.get('key', 0)
		del r["csrfmiddlewaretoken"]
		winner = r["winner"][0]
		loser = [x for x in r.keys() if (x != "winner") and (x != winner) ][0]
		
		score_transfer = float(r[loser][0]) * .5
		winner_score_new = float(r[winner][0]) + score_transfer
		loser_score_new = float(r[loser][0]) - score_transfer

		incumbent = Speech.objects.get(path=winner)
		defeated = Speech.objects.get(path=loser)

		incumbent.score = winner_score_new
		incumbent.save()

		defeated.score = loser_score_new
		defeated.save()

		new_challenger = Speech.objects.all().exclude(id = incumbent.id).exclude(id = defeated.id).order_by('?')[0]

		return render(request, "test.html", {"incumbent": incumbent, "challenger": new_challenger})
