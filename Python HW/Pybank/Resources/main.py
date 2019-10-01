import os 
import csv 

budget_data_csv = os.path.join('..', 'Resources','budget_data.csv')

with open(budget_data_csv, newline="") as handler:
	csvreader = csv.reader (handler, delimiter=",")
	next(csvreader)

	summary = "financial Analysis"
	summary_= "---------------------------------"
	months = 0
	total_profit = 0 
	index= 0
	#part i dont understand
	previousProfit_Losses = 0
	Profit_Losses_change = 0 
	ProfitLosses_change_list=[]
	month_change = []
	greatestincrease = 0
	greatestdecrease = 99999999999999999

	for row in csvreader:
		months += 1
		total_profit += int(row[1])
		previousProfit_Losses = int(row[1])
		month_change +=[row[0]]
		index += 1

		continue

		Profit_Losses_change = (int(row[1]) - int(previousProfit_Losses))
		ProfitLosses_change_list.append(Profit_Losses_change)
		previousProfit_Losses=int(row[1])
		month_change=month_change+(row[0])

	greatestdecrease = min(ProfitLosses_change_list)
	greatestincrease = max(Profit_Losses_change)
	greatestdecrease_month = ProfitLosses_change_list.index(greatestdecrease) + 1
	greatestincrease_month = ProfitLosses_change_list.index(greatestincrease) + 1
	print (summary)
	print (summary_)
	print ("total number of months: " + str(int(months)))
	print ("total profit: " +"$" + str(total_profit))
	print("Avg Change in Profit" + "$" + str(round(sum(ProfitLosses_change_list/len(ProfitLosses_change_list),2))))
	

   	print(f"Average Change: ${round(sum(ProfitLoss_change_list)/len(ProfitLoss_change_list),2)}")

  	print(f"Greatest increase in Profits: {month_change[greatestIncrease_month]} (${(str(greatestIncrease))})")

   	print(f"Greatest decrease in Profits: {month_change[greatestDecrease_month]} (${(str(greatestDecrease))})")
