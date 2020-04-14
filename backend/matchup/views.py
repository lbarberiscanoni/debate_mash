from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.core import serializers
from matchup.models import Speech, User, ViewRecord
from django.db.models import Count
from matchup.serializers import SpeechSerializer
import json
from .utils import elo

# Create your views here.
def signup(request):
	ob = json.loads(request.body)["ob"]

	response = {}

	try:
		User.objects.create(
			name=ob["user"],
			password=ob["password"]
		)
		response["id"] = User.objects.get(name=ob["user"]).id
		response["username"] = ob["user"]
		response["status"] = "success"
	except Exception as e:
		response["status"] = str(e)

	return JsonResponse({ "data": response })

def login(request):
	ob = json.loads(request.body)["ob"]

	response = {}

	try:
		relevantUser = User.objects.get(name=ob["user"])
		if relevantUser.password == ob["password"]:
			response["id"] = relevantUser.id
			response["username"] = ob["user"]
			response["status"] = "success"
		else:
			response["status"] = "wrong password"
	except Exception as e:
		print(e)
		response["status"] = "user not found"

	return JsonResponse({ "data": response })

def ranking(request):

	serializer = SpeechSerializer(Speech.objects.order_by("-score"), many=True)

	return JsonResponse({ "data": serializer.data })

	# ranked_list = Speech.objects.order_by("-score")

	# return JsonResponse(ranked_list)

def top(request): 
	ob = {}
	ranked_users = User.objects.all() \
		.exclude(name="anon") \
		.annotate(num_records=Count('viewrecord')) \
		.order_by('-num_records')

	top_users = ranked_users[:3]
	latest_users = ViewRecord.objects.order_by("-date")[:3]

	ob["top_users"] = []
	for user in top_users:
		internal_ob = {}
		internal_ob["name"] = user.name
		internal_ob["num_records"] = user.num_records
		ob["top_users"].append(internal_ob)

	ob["latest_users"] = []
	for record in latest_users:
		internal_ob = {}
		internal_ob["name"] = record.viewer.name
		internal_ob["speech"] = record.speech.division + record.speech.year
		ob["latest_users"].append(internal_ob)

	return JsonResponse(ob)


def matchup(request):
	

	if (request.method == "GET"):
		
		# #overthrow
		# incumbent = Speech.objects.order_by("score").last()
		# new_challenger = Speech.objects.all().exclude(id = incumbent.id).order_by('?')[0]

		#random
		incumbent = SpeechSerializer(Speech.objects.order_by('?')[0])
		new_challenger = SpeechSerializer(Speech.objects.order_by('?')[1])

		return JsonResponse({ "incumbent": incumbent.data, "challenger": new_challenger.data })

	if (request.method == "POST"):

		ob = json.loads(request.body)["ob"]

		user = 0
		print(ob)
		if ob["user"] == "anon":
			user = User.objects.get(name="anon")
		else:
			user = User.objects.get(id=ob["user"])

		victor = Speech.objects.get(path=ob["winner"])
		defeated = Speech.objects.get(path=ob["loser"])

		#update the score through elo
		winner_score_new = elo(victor.score, defeated.score, 1)
		loser_score_new = elo(defeated.score, victor.score, 0)

		victor.score = winner_score_new
		victor.save()

		defeated.score = loser_score_new
		defeated.save()

		new_challenger = Speech.objects.all().exclude(id = victor.id).exclude(id = defeated.id).order_by('?')[0]
		new_challenger = SpeechSerializer(new_challenger)

		#make the winner the incumbent
		incumbent = SpeechSerializer(victor)

		#create a record
		ViewRecord.objects.create(
			viewer=user,
			speech=victor
		)

		ViewRecord.objects.create(
			viewer=user,
			speech=defeated
		)

		return JsonResponse({ "incumbent": incumbent.data, "challenger": new_challenger.data })

def profile(request): 

	#history
	#saved
	ob = json.loads(request.body)["ob"]

	response = {}
	response["data"] = []
	if ob["id"] != "anon":
		history = ViewRecord.objects.all().filter(viewer=ob["id"])
		for el in history:
			serialized_speech = SpeechSerializer(el.speech)
			response["data"].append(serialized_speech.data)

	return JsonResponse(response)
