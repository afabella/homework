import os 
import csv 

budget_data_csv = os.path.join('..', 'Resources','budget_data.csv')

with open(budget_data_csv, newline="") as handler:
	csvreader = csv.reader (handler, delimiter=",")
	next(csvreader)

	total_months = 0
	total_revenue = 0
	average= []
	for row in csvreader:
         total_months += 1
         total_revenue += float(row[1])
         average.append(row[1])
         average_worth = total_revenue/len(row[1])
		
	print ("Financial Analysis")
	print ("----------------------------")
	print ("total number of months: " + str(float(total_months)))
	print ("total profit: " +"$" + str(total_revenue))
	print ("Average Change: " + str(average_worth))
	print ("Greatest Increase in Profits:")
	print ("Greatest Decrease in Profits:")