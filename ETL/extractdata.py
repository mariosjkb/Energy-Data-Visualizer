# MARIOS IAKOVIDIS 
# Script for data extraction from MS Excel files

# import Pandas to access Excel files
import pandas as pd

# function that extracts only the necessery data from an Excel file
def extraction(excel_filename):
    new_filename = excel_filename[0:-4] + "_extracted.txt"
    data_list = []
    xl_file = pd.ExcelFile(excel_filename) # open the Excel file
    # parse the Data and Metadata - Indicators sheet
    data_sheet = xl_file.parse('Data')
    indicators_sheet = xl_file.parse('Metadata - Indicators')

    # insert the necessery indicators in a list
    indicators_list = indicators_sheet['INDICATOR_CODE'].tolist()

    # find the data of the indicators that are in the list
    data_list = data_sheet.loc[data_sheet['Indicator Code'].isin(indicators_list)].values.tolist()

    # write them to a txt file in ordered to be transformed later
    fp = open(new_filename,"w")
    for list in data_list:
        for item in list:
            fp.write(str(item) + "\t") # seperate with tabs because some indicators contain commas (we will eliminate them in the transformation stage)
        fp.write("\n")
    fp.close()


# Get each Excel file and run the function
fp = open("C:/Users/mariosjkb/Desktop/Project/ETL/Countries.txt","r")
lines = fp.readlines()
for line in lines:
    line = line[0:-1] + ".xls"
    print(line)
    extraction('C:/Users/mariosjkb/Desktop/Project/data for extraction/' + line)

fp.close()