This is a preliminary milestone to let you set up goals for your final project and assess the feasibility of your ideas.
Please, fill the following sections about your project.

*(max. 2000 characters per section)*

### Dataset

> Find a dataset (or multiple) that you will explore. Assess the quality of the data it contains and how much preprocessing / data-cleaning it will require before tackling visualization. We recommend using a standard dataset as this course is not about scraping nor data processing.

The dataset we have chosen contains informations about feminicide* in USA in 2018. There are 1840 entries, each case has 26 attributes. For our data visualization we are interested in using mainly the following ones: date of death, her name, her age, her race/ethnicity, city, state, relationship, suspect age, suspect race/ethnicity and cause of death. We believe this dataset is of particular interest for multiple reasons. On top on this, we also have the pictures of many of the women. 


First, the topic is sensitive and requires to deeply think about what we want to show and how to do it properly and efficiently. 
Secondly, there are information both about time and space which enrich the visualization possibility.
Finally, the categorical columns such as relationship, or cause of death allows to introduce some filtering.

The data have been collected by a single person, however some columns aren't consistent and needs some cleaning.
Two parsers have been written by now, in order to treat the **ages** datas, and the current health state of the suspect.
The toolset used for that is [the combination of antlr and python](https://faun.pub/introduction-to-antlr-python-af8a3c603d23).

*femicide : gender-related killings of women and girls* 

### Problematic

> Frame the general topic of your visualization and the main axis that you want to develop.
> - TOPIC
>  - What am I trying to show with my visualization?
>  - Think of an overview for the project, your motivation, and the target audience.

Data collection and visualization play a role in the way we concieve the world and its issues. Around the them of gender equality, a group of researcher focus on the topic of femicide. Indeed, the reality of women being killed by men because of their gender is underestimated. One project addressing this issue is the coalition "Data against femicide"(https://datoscontrafeminicidio.net/en/home-2/) between Catherine D’Ignazio (Data + Feminism Lab @ MIT), Silvana Fumega (ILDA) and Helena Suárez Val (Feminicidio Uruguay). In our project we want to address the next step. Once we have this data how can we visualize them in a interactive way.

Our goal is two-folds. First we would like to honor these women memory by creating a space for their names and histories. Secondly, we want to higlight the dynamics that are behind this data with some interactive visualization of aggregation.

People that expore our visualization would be able to connect with who where this women, and understand how they are unique meanwhile part of a similar and deathly pattern of violence from men against women. 


### Exploratory Data Analysis


The ages of the victims and the ages of the suspects are highly correlated, as shown here:

![Correlation between ages](./milestone_imgs/regage.png "correlation")

We see that the ages of the victims can be really low, with a peak in the first year, whereas the ages of the suspects are centered around 40yo:

![Age distribution](./milestone_imgs/pair_age.png "ages")

We also observe that the health status of the suspect is significantly influenced by their age, and especialy that suspects who were older at the time of the suspected crime have been more likely to have died during or after the facts:

<img src="./milestone_imgs/violin.png" alt="drawing" width="750"/>

While we dig up in the rest of the data, some more statistics about the ages:

| Stats  | *His age* | *Her age* |
| ------ |:---------:|:---------:|
| mean   | 40.52     | 39.52     |
| std    | 15.30     | 18.09     |
| median | 38        | 37        |

### Related work

The data for our project has been manually collected and cleaned up by Dawn Wilcox with input from public contributors. It was used only by its creator for the official website of the [Women Count USA: Femicide Accountability Project](https://womencountusa.org/the-databases). The data is presented in Airtables for different periods of time from 1950s. Dawn Wilcox also did a [mapping of the 2018 database](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.google.com%2Fmaps%2Fd%2Fedit%3Fmid%3D1fD8ocpC4HYuOuNlivmAcxXVxY6_YaeKC%26usp%3Dsharing%26fbclid%3DIwAR1LWcOFOx-1JYxFjgXUhYCisuHHWWfxu2iw_qTNLmT5h8qDd0bXajE6b0M&h=AT1lbDaDjkxvYNrOPhlFrVJYmzhyYsif8g2VevTGqjelpuW9uDF6aYa0RU3I0c6WDQd9AC52HVZ3gIiG7GUjuqnwtB-PCddyxglfiGNUn2gHG-7bO1Mbvwn5ygbWTAotkyw2BZVN63J3MZnP8gPwY8HnuQ&__tn__=-UK-R&c[0]=AT0khRhezKSzP04dh-IrKGjQ8fxYv6L1I36YqKtSPM0o8mTDZi37OjafeJZR38CJRAfUlWY21qt687wZjtib_8sr_Tx0MBCkBhhy8ZaUhywNtX5AVol2Fl-FLO0H_IAPG5It0vGr7yWMsDilX6FYBc-rzRYLdc4rEGYJkL_Q3ixm2ew) using google maps: each point on the map contains a link to the photograph of a victim and information about the committed crime. Also, the same data was used for statistics presented by the creator during the meeting of the [Data against feminicide project](https://datoscontrafeminicidio.net/en/2021-edition/). From our point of view, it is an exceptional source of information that should be visualized and presented to the general public.

However, there are not so many good examples of visualizations for this kind of data. For example, the [tables](https://airtable.com/shrjQBwYvk08cbHu2/tblR739BUJgxxQqrt) are usually large and difficult to explore. Our goal is to create a website that will be not only an interesting and artistic representation of the information, but also a memorial for thousands of victims of male violence against women. We want to focus our design on the idea that every murdered girl and woman was a unique person with her hobbies and interests, and not just a row in the table. The memorials that we have found on the Internet are mostly [databases](https://womencountusa.org/the-databases), the [collections](https://gunmemorial.org) of victims’ photos mentioning some personal information and created with the most basic features of data visualization tools, [see also](https://www.aapf.org/in-memorium-old).

Here are some visualizations that we find interesting and inspiring in context of our project: the [poppy diagram](https://iibawards-prod.s3.amazonaws.com/projects/images/000/000/375/large.jpg?1403857589) showing the number of deaths in different war conflicts throughout the history, the [web-project](https://www.gabriellemerite.com/portfolio-item/death-at-home/) dedicated to feminicide in France, beautiful and meaningful colour-gradient [visualization](https://www.behance.net/gallery/96434017/Noteable-Women?tracking_source=project_owner_other_projects%5C) of portraits of women appearing on banknotes with a non-standard way of representing a timeline. A visualization of [death statistics in Iraq](https://i.pinimg.com/originals/e7/f3/eb/e7f3eb9bea609baab00c24ecc4918c94.jpg) from the New York Times Sunday Opinion.


