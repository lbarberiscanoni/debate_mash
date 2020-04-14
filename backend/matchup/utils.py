import math

#elo rating system
def elo(player, opponent, status):
	#according to wiki 16 is for masters, 32 for weaker players
	#https://en.wikipedia.org/wiki/Elo_rating_system#Mathematical_details
	k_factor = 15

	spread = opponent - player
	normalized_spread = spread / float(400)
	expectation = 1 / float(1 + math.pow(10, normalized_spread))
	adjusted_score = player + (k_factor * (status - expectation))

	return adjusted_score