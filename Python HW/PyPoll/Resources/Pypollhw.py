import os 
import csv 

election_data_csv = os.path.join('election_data.csv')


candidate_votes = {}

with open(election_data_csv, 'r') as handler:
	csvreader = csv.reader(handler, delimiter=",")
	next(csvreader)


	total_votes = 0
	highest_vote = 0

	for row in csvreader:
		total_votes +=1
		name = row[2]
		if name in candidate_votes:
			candidate_votes[name] +=1
		else:
			candidate_votes.update({name: 1})

	print ("Election Results")
	print("-------------------------")
	print(f'Total Number of Votes: {total_votes}')
	print("-------------------------")
	for candidate in candidate_votes:
		if candidate_votes[candidate] > highest_vote:
			highest_vote = candidate_votes[candidate]
			winning_candidate = candidate

	
		vote_percentage = candidate_votes[candidate]/total_votes
		vote_percentage = int(vote_percentage * 100)
		print(f'{candidate} : {vote_percentage}% ({candidate_votes[candidate]})')
	print("-------------------------")
print(f'Winner: {winning_candidate}')