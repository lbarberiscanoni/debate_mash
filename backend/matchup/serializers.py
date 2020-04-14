from rest_framework import serializers
from matchup.models import Speech

class SpeechSerializer(serializers.ModelSerializer):

	class Meta:
		model = Speech
		fields = ["path", "speaker", "year", "division", "score"]