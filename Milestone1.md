### Dataset

The dataset we have chosen contains information about femicide* in USA in 2018. It is a subset of a larger dataset that has been manually collected and cleaned up by Dawn Wilcox with input from public contributors. It was used only by its creator for the official website of the [Women Count USA: Femicide Accountability Project](https://womencountusa.org/the-databases). The data is presented in Airtables for different periods of time from 1950s. We were able to obtain the CSV file for the 2018 period after emails exchange with the author herself.

There are 1840 entries, each case has 26 attributes. For our data visualization we are interested in using mainly the following ones: date of death, her name, her age, her race/ethnicity, city, state, relationship, suspect age, suspect race/ethnicity and cause of death. We believe, this dataset is of particular interest for multiple reasons. On top of this, we also have pictures of many of the women that we are going to use in our visualization.

First, the topic is sensitive and requires us to deeply think about what we want to show and how to do it properly and efficiently.
Secondly, there is information both about time and space which enriches the visualization possibility.
Finally, the categorical columns such as relationship, or cause of death allow to introduce some filtering.

The data has been collected by a single person, however, some columns aren't consistent and need some cleaning.
Two parsers have been written by now, in order to treat the **ages** columns, and the current health state of the suspect.
The toolset used for that is [the combination of antlr and python](https://faun.pub/introduction-to-antlr-python-af8a3c603d23).

\* *femicide : gender-related killings of women and girls*

### Problematic

On the topic of gender inequality, femicide is an example of missing data.  Indeed, the reality of women being killed by men because of their gender is overlooked. In order to address this issue, several women and groups have tackled the task of gathering data. ["Data against femicide"](https://datoscontrafeminicidio.net/en/home-2/) was created to address this issue. In our project we want to work on visualizing this data in an interactive way.

Our goal is twofold. We would like to honor the memory of these women by creating a space for their names and histories. Also, we want to highlight the dynamics behind this data with some interactive visualizations.

At this stage of the project we are thinking of 5 differents views:
- ensemble
- portrait
- statistical
- timeline
- map

The views are sketched [here](https://github.com/com-480-data-visualization/datavis-project-2022-syrinx/blob/main/milestone_imgs/Sketches%20of%20visualization%20ideas.pdf)

The ensemble view displays women with icons, filters highlight a subset of icons based on the chosen criteria.
The portrait view is a closer look at each woman with the information concerning her age, city, etc...
The statistical view takes into account both women and men with basic statistics.
The timeline view is the women's data organized by date.
The map is the women's data organized by place of death.

From the ensemble view, a click on a specific icon leads to the portrait view. In the portrait view a click on a specific attribute (e.g. race) leads back to the ensemble view and highlights the corresponding subset of women. A click on the date jumps to the timeline, where women killed around that date can be seen.
The statistical view has the same filters as the ensemble view.
The timeline can be to zoomed in or out in the 2018 year, as well as the map.
The ensemble, portrait and timeline views are thought as tools to honour these women. The design takes into account this specificity and only the information related to the victims will be presented in these views. Such data as age of the suspect and relation with the victim will be presented in a statistical view to give more insights into the problem.

### Exploratory Data Analysis

See the [notebook](./syrinx.ipynb).

The ages of the victims and the ages of the suspects are highly correlated, as shown here:

![Correlation between ages](./milestone_imgs/regage.png "correlation")

If we look at the histogram of relationship between victim and suspect, we see that in most cases the suspect was in romantic relationships with the victim. It could be the reason for the correlation in ages.

![Relationship with the victim](./milestone_imgs/Histogram%20Relationship.png)

We see that the ages of the victims can be really low, with a peak in the first year, whereas the ages of the suspects are centered around 40 years old:

![Age distribution](./milestone_imgs/pair_age.png "ages")

We also observe that the health status of the suspect is significantly influenced by their age, and especialy that suspects who were older at the time of the suspected crime were more likely to die during or after the facts:

<img src="./milestone_imgs/violin.png" alt="drawing" width="750"/>

While we are digging into the rest of the data, some more statistics about the ages:

| Stats  | *His age* | *Her age* |
| ------ |:---------:|:---------:|
| mean   | 40.52     | 39.52     |
| std    | 15.30     | 18.09     |
| median | 38        | 37        |

The see how were those computations made, see [the notebook we made](syrinx.ipynb).

Future investigations:
> We will later on work on other variables, to filter, clean, and present the data that we need.

### Related work

Dawn Wilcox made a [mapping of the 2018 database](https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.google.com%2Fmaps%2Fd%2Fedit%3Fmid%3D1fD8ocpC4HYuOuNlivmAcxXVxY6_YaeKC%26usp%3Dsharing%26fbclid%3DIwAR1LWcOFOx-1JYxFjgXUhYCisuHHWWfxu2iw_qTNLmT5h8qDd0bXajE6b0M&h=AT1lbDaDjkxvYNrOPhlFrVJYmzhyYsif8g2VevTGqjelpuW9uDF6aYa0RU3I0c6WDQd9AC52HVZ3gIiG7GUjuqnwtB-PCddyxglfiGNUn2gHG-7bO1Mbvwn5ygbWTAotkyw2BZVN63J3MZnP8gPwY8HnuQ&__tn__=-UK-R&c[0]=AT0khRhezKSzP04dh-IrKGjQ8fxYv6L1I36YqKtSPM0o8mTDZi37OjafeJZR38CJRAfUlWY21qt687wZjtib_8sr_Tx0MBCkBhhy8ZaUhywNtX5AVol2Fl-FLO0H_IAPG5It0vGr7yWMsDilX6FYBc-rzRYLdc4rEGYJkL_Q3ixm2ew) using google maps: each point on the map contains a link to the photograph of a victim and information about the committed crime. Also, the same data was used for statistics presented by the creator during the meeting of the [Data against feminicide project](https://datoscontrafeminicidio.net/en/2021-edition/). As another example, Mar??a Salguero produced a [map](https://mapafeminicidios.blogspot.com/p/inicio.html) with pins corresponding to cases of femicide in Mexico.

However, there are not so many good examples of visualizations for this kind of data. The [tables](https://airtable.com/shrjQBwYvk08cbHu2/tblR739BUJgxxQqrt) are usually large and difficult to explore. Our goal is to create a website that will be not only an interesting, artistic representation of the information, but also a memorial for thousands of victims of male violence against women. We want to focus our design on the idea that every murdered girl and woman was a unique person with her hobbies and interests, and not just a row in the table. The memorials that we have found on the Internet are mostly [databases](https://womencountusa.org/the-databases), the [collections](https://gunmemorial.org) of victims??? photos mentioning some personal information and created with the most basic features of data visualization tools, [see also](https://www.aapf.org/in-memorium-old).

Here are some visualizations that we find interesting and inspiring in context of our project: the [poppy diagram](https://iibawards-prod.s3.amazonaws.com/projects/images/000/000/375/large.jpg?1403857589) showing the number of deaths in different war conflicts throughout the history with a lot of information in the design itself and delicate with respect to the issue at hand. The [web-project](https://www.gabriellemerite.com/portfolio-item/death-at-home/) dedicated to feminicide in France in the spirit of a portfolio highlights how we would like to portray each woman and their singularity. The beautiful and meaningful [visualization](https://www.behance.net/gallery/96434017/Noteable-Women?tracking_source=project_owner_other_projects%5C) of portraits of women appearing on banknotes with a non-standard way of representing a timeline is inspiring for our own timeline. Also, the following visualization of [death statistics in Iraq](https://i.pinimg.com/originals/e7/f3/eb/e7f3eb9bea609baab00c24ecc4918c94.jpg) from the New York Times Sunday Opinion caught our attention.
