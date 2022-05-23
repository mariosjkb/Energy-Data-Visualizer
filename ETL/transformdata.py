# MARIOS IAKOVIDIS
# Script for data transformation


# function that takes raw data and transforms them to a csv file read to be loaded in the MEASUREMENTS MySQL table
def transformation(extracted_filename):
    fp1 = open(extracted_filename,"r")
    fp2 = open("C:/Users/mariosjkb/Desktop/ChartsGenerator/data/Measurements.csv","a")
    # read each line of extracted data
    lines = fp1.readlines()
    for line in lines:
        year = 1960
        # split to get each value
        values = line.split("\t")
        # write to csv file
        for i in range(4,len(values) - 1):
            if(values[i] == 'nan'):
                continue
            else:
                value = ""
                fp2.write(values[0] + ",") # country name
                fp2.write(str(year) + ",") # year
                # because some indicators contain commas and we are creating a csv file, we replace them with spaces
                nocommas = values[2].split(",")
                for j in range(0,len(nocommas)):
                    value += nocommas[j] + " "
                fp2.write(value + ",") # indicator
                fp2.write(values[i]) # measurement
                fp2.write("\n")
                year += 1
    fp1.close()
    fp2.close()
            



# open the extracted data files and run the function
fp3 = open("C:/Users/mariosjkb/Desktop/ChartsGenerator/ETL/Countries.txt","r")
datapath = "C:/Users/mariosjkb/Desktop/ChartsGenerator/Data for extraction/"
lines = fp3.readlines()
for line in lines:
    line = line[0:-1] + "_extracted.txt"
    transformation(datapath + line)

# create csv file to be loaded to the lookup table Years 
fp4 = open("C:/Users/mariosjkb/Desktop/ChartsGenerator/data/Years.csv","w")
counter = 1 # reset counter

# for each year from 1960 to 2020 
# calculate (year mod 5) to find the beginning of the 5 year span that this year belongs and then add 4 to find the end of it
# calculate (year mod 10) to find the beginning of the 10 year span that this year belongs and then add 9 to find the end of it
# calculate (year mod 20) to find the beginning of the 20 year span that this year belongs and then add 19 to find the end of it
for i in range(1960,2020):
    mod5 = i % 5
    mod10 = i % 10
    mod20 = i % 20
    five_year_span = i - mod5
    ten_year_span = i - mod10
    twenty_year_span = i - mod20
    fp4.write(str(counter) + ",")
    fp4.write(str(i) + ",")
    fp4.write(str(five_year_span) + "-" + str(five_year_span + 4) + ",")
    fp4.write(str(ten_year_span) + "-" + str(ten_year_span + 9) + ",")
    fp4.write(str(twenty_year_span) + "-" + str(twenty_year_span + 19) + ",")
    fp4.write("\n")
    counter += 1

fp3.close()
fp4.close()
