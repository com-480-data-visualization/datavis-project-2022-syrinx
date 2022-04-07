This is a preliminary milestone to let you set up goals for your final project and assess the feasibility of your ideas.
Please, fill the following sections about your project.

*(max. 2000 characters per section)*

### Dataset

> Find a dataset (or multiple) that you will explore. Assess the quality of the data it contains and how much preprocessing / data-cleaning it will require before tackling visualization. We recommend using a standard dataset as this course is not about scraping nor data processing.
>
> Hint: some good pointers for finding quality publicly available datasets ([Google dataset search](https://datasetsearch.research.google.com/), [Kaggle](https://www.kaggle.com/datasets), [OpenSwissData](https://opendata.swiss/en/), [SNAP](https://snap.stanford.edu/data/) and [FiveThirtyEight](https://data.fivethirtyeight.com/)), you could use also the DataSets proposed by the ENAC (see the Announcements section on Zulip).

### Problematic

> Frame the general topic of your visualization and the main axis that you want to develop.
> - What am I trying to show with my visualization?
> - Think of an overview for the project, your motivation, and the target audience.

### Exploratory Data Analysis

> Pre-processing of the data set you chose
> - Show some basic statistics and get insights about the data
The data needs some cleaning.
Two parsers have been written by now, in order to treat the **ages** datas, and the current health state of the suspect.
The toolset used for that is [the combination of antlr and python](https://faun.pub/introduction-to-antlr-python-af8a3c603d23).

The ages of the victims and the ages of the suspects are highly correlated, as shown here:

![Correlation between ages](./milestone_imgs/regage.png "correlation")

We see that the ages of the victims can be really low, with a peak in the first year, whereas the ages of the suspects are centered around 40yo:

![Age distribution](./milestone_imgs/pair_age.png "ages")

We also observe that the health status of the suspect is significantly influenced by their age, and especialy that suspects who were older at the time of the suspected crime have been more likely to have died during or after the facts:

<img src="./milestone_imgs/violin.png" alt="drawing" width="750"/>

### Related work

The data for our project has been manually collected and cleaned up by Dawn Wilcox with input from public contributors. It was used only by its creator for the official website of the Women Count USA: Femicide Accountability Project. The data is presented in Airtables for different periods of time from 1950s. Dawn Wilcox also did a mapping of the 2018 database using google maps: each point on the map contains a link to the photograph of a victim and information about the committed crime. Also, the same data was used for statistics presented by the creator during the meeting of the Data against feminicide project. From our point of view, it is an exceptional source of information that should be visualized and presented to the general public.

However, there are not so many good examples of visualizations for this kind of data. For example, the tables are usually large and difficult to explore. Our goal is to create a website that will be not only an interesting and artistic representation of the information, but also a memorial for thousands of victims of male violence against women. We want to focus our design on the idea that every murdered girl and woman was a unique person with her hobbies and interests, and not just a row in the table. The memorials that we have found on the Internet are mostly databases, the collections of victims’ photos mentioning some personal information and created with the most basic features of data visualization tools.

Here are some visualizations that we find interesting and inspiring in context of our project: the poppy diagram showing the number of deaths in different war conflicts throughout the history, the web-project dedicated to feminicide in France, beautiful and meaningful colour-gradient visualization of portraits of women appearing on banknotes and a non-standard way of representing a timeline. A visualization of death statistics in Iraq from the New York Times Sunday Opinion.


