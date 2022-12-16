import pandas as pd
import csv
import seaborn as sns
import matplotlib.pyplot as plt
import matplotlib.ticker as ticker
from IPython.display import display
from tabulate import tabulate

# df = pd.concat(map(pd.read_csv, ['/Users/LL67989/Downloads/result (8).csv', '/Users/LL67989/Downloads/result (9).csv']))
# print(df)

df = pd.read_csv('/Users/LL67989/Downloads/result (9).csv', keep_default_na=False)

# df['Completed Date'] = pd.to_datetime(df['Completed Date'])

df['year-month'] = df['Completed Date'].str[0:4] + df['Completed Date'].str[5:7]

df=df.fillna(" ")

df = df[df['Product Type']== "TERM"]
# df = df[df['Product Type']!= "Term10"]
# df = df[df['Product Type']!= "Term20"]
# df = df[df['Product Type']!= "Term30"]
# df = df[df['Product Type']!= "Term65"]

# ab = df.groupby(['year-month','Product Type','SPM Result', "Decision Result"]).agg(['size'])
# ab = df.groupby(('year-month')['Product Type']).agg(['size'])

ab = (df.groupby("year-month")["SPM Result"]
         .apply(lambda x: x.value_counts(normalize=True))
         .mul(100)
         .rename_axis(['year-month', 'SPM Result'])
         .reset_index(name='Percentage'))

print(tabulate(ab))

# sns.set_style('darkgrid')
# sns.set(rc={'figure.figsize':(20,10)})

# ax = sns.lineplot(data=ab, x ='Year-Month', y = 'Percentage',
#                   hue='Product Type', palette='viridis',
#                   legend='full', lw=2)

# sns.move_legend(ax, "upper left", bbox_to_anchor=(1, 1))

# ax.xaxis.set_major_locator(ticker.MultipleLocator(4))
# plt.legend(bbox_to_anchor=(1, 1))
# plt.ylabel('Product Type')
# plt.xlabel('Year-Month')
#plt.show()



