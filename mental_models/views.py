from django.shortcuts import render
from .models import MentalModel

# Create your views here.
def index(request):

	mental_model_list = MentalModel.objects.all()

	return render(request, "list.html", {"mental_model_list": mental_model_list})