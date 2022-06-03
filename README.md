# Project of Data Visualization (COM-480)

| Student's name  | SCIPER |
| --------------- | ------ |
| Matt Amina      | 217547 |
| Vincent Florian | 344678 |
| Serenko Irina   | 337185 |

## Milestone 1

[Milestone 1](Milestone1.md)

## Milestone 2

[Milestone 2](Milestone2.md)

## Milestone 3
### Femicide in the USA in 2018 
See our [Process book](Dataviz_process_book_syrinx.pdf) describing the development of our project.
We also suggest you to watch our [Screencast video](https://drive.google.com/file/d/1AMoACu4n9wucOniqN-sRiwAB5Z07CefC/view?usp=sharing) that demonstates features of our visualization.
Our repository has the following structure:
* `portait` directory contains 
    * `portait/portrait-view.js` code used to create the different elements for the portrait view
* `` directory contains 
* `` directory contains 
* `page` directory contains the code to run our website
    * `page/data_plot.js` contains the code used to create the ensemble and statistical views, as well as calling the portrait view.
    * `page/index.html` contains the structure of the website
    * `page/` contains the code used to create
    * `page/` contains the code used to create

To see the website, first download the data.csv file from our [Google Drive](https://drive.google.com/file/d/1fdk4ubsOctuRFj3aY4pa1Y2Azvg_L48U/view?usp=sharing) (access is limited to the professor and the teaching assistants of the Data Visualization course) and put it in the directory `page/data`. Then run from the `page` directory: 
```
python -m http.server 9000
```
And after that go to the page http://localhost:9000/ in your browser (we checked it for Google Chrome, Firefox and Brave).
