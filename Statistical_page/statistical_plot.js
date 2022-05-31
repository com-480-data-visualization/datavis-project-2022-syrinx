/*
        Run the action when we are sure the DOM has been loaded
        https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded
        Example:
        whenDocumentLoaded(() => {
                console.log('loaded!');
                document.getElementById('some-element');
        });
*/
function whenDocumentLoaded(action) {
        if (document.readyState === "loading") {
                document.addEventListener("DOMContentLoaded", action);
        } else {
                // `DOMContentLoaded` already fired
                action();
        }
}


const colorDict = {
	"Latina/x": "rgb(255,62,202)",
  "Husband": "rgb(255,62,202)",
  "Uncle / Nephew / Cousin": "rgb(255,62,202)",
	'Black / African American': "rgb(219,88,64)",
  "Boyfriend" : "rgb(219,88,64)",
  "Ex-Husband": "rgb(219,88,64)",
	'Asian': "rgb(255,192,149)",
  "Ex-Boyfriend": "rgb(255,192,149)",
  "Grandfather / Grandson Relationship": "rgb(255,192,149)",
	'White': "rgb(255,217,214)",
  "Son / Stepson / Partner's Son / Daughter's Partner": "rgb(255,217,214)",
  "Work-Related":  "rgb(255,217,214)",
    'Unknown / Unreleased': "rgb(176,238,255)",
    "Friend": "rgb(176,238,255)",
	'Other (see About Her)': "rgb(239,138,0)",
  "Estranged Husband": "rgb(239,138,0)",
  'Other': "rgb(239,138,0)",
    'Native American / Alaska Native': "rgb(164,112,170)",
    "Acquaintance": "rgb(164,112,170)",
    "Fiancé / Ex-Fiancé": "rgb(164,112,170)",
	'Two or more races': "rgb(220,167,62)",
  "Father / Stepfather / Mother's Partner / Father-in-Law": "rgb(220,167,62)",
  "Student/Classmate (Current or Former)": "rgb(220,167,62)",
    'Native Hawaiian / Other Pacific Islander': "rgb(136,112,255)",
    "Stranger" : "rgb(136,112,255)",
    "Caregiver / Caregiver's Relative": "rgb(136,112,255)",
	"nan": "rgb(153,120,147)",
     "No Information": "rgb(153,120,147)",
     "Neighbor / Roommate / Landlord / Tenant" : "rgb(153,120,147)",
     "Repairman / Service Provider": "rgb(153,120,147)",
  'Two or more races,Black / African American,White': "rgb(1,164,210)",
  "Brother / Stepbrother / Partner or Sibling's Brother / Brother-in-Law": "rgb(1,164,210)",
  "Hitman": "rgb(1,164,210)"
}
var DATA;
const NEW_TRANSIT = (() => d3.transition().duration(1500));

var data = [{
              "name": "White",
              "value": 880,
      },
          {
              "name": "Black / African American",
              "value": 505,
      },
          {
              "name": "Latina/x",
              "value": 245,
      },
          {
              "name": "Unknown / Unreleased",
              "value": 131,
      },
          {
              "name": "Asian",
              "value": 37,
      },
          {
              "name": "Native American / Alaska Native",
              "value": 16,
      },
          {
              "name": "Other (see About Her)",
              "value": 13,
      },
          {
              "name": "Two or more races",
              "value": 5,
      },
          {
              "name": "Native Hawaiian / Other Pacific Islander",
              "value": 5,
      },
          {
              "name": "Two or more races,Black / African American,White",
              "value": 1,
      }];

var data_dict

const scaleX_race = d3.scaleLinear()
	.domain([0, 1000])
	.range([0, 200]);
const scaleY_race = d3.scaleLinear()
	.domain([0, 12])
	.range([0, 280]);

function race_barplot(dataframe){
    d3.select("#classical_labels").selectAll("text")
      .data(dataframe)
      .enter()
      .append("text")
      .text(d => d["race_label"])
      .attr("x", d => scaleX_race(440))
      .attr("y", (d,i)=> scaleY_race(i + 0.5))
      .style("text-anchor", "middle")
      .style("fill", "white")
      .attr("font-size", "8.5px");

    d3.select("#women_plot").selectAll("rect")
      .data(dataframe)
      .enter()
      .append("rect")
      .attr("y", function (d, i) {
          return scaleY_race(i);
      })
      .attr("height", _=>scaleY_race(.9))
      .attr("x", function (d) {
          return scaleX_race(1000);
      })
      .style("fill", d => colorDict[d["race_label"]])
      .style("padding", "1px")
      .attr("width", function (d) {
          return scaleX_race(0);
      })
      .transition(NEW_TRANSIT())
      .attr("width", function (d) {
          return scaleX_race(d["her_race_count"]);
      })
      .attr("x", function (d) {
          return scaleX_race(1000 - d["her_race_count"]);
      });

    d3.select("#women_plot").selectAll("text")
      .data(dataframe)
      .enter()
      .append("text")
      .attr("y", function (d, i) {
          return scaleY_race(i + 0.5);
      })
      .style("fill", "white")
      .attr("font-size", "9px")
      .text(d => d["her_race_count"])
      .attr("x", function (d) {
          return scaleX_race(1000);
      })
      .transition(NEW_TRANSIT())
      .attr("x", function (d) {
          return scaleX_race(1000 - d["her_race_count"] - 100);
      });

      d3.select("#men_plot").selectAll("rect")
        .data(dataframe)
        .enter()
        .append("rect")
        .attr("y", function (d, i) {
            return scaleY_race(i);
        })
        .attr("height", _=>scaleY_race(.9))
        .attr("x", function (d) {
            return scaleX_race(0);
        })
        .style("fill", d => colorDict[d["race_label"]])
        .style("padding", "1px")
        .attr("width", function (d) {
            return scaleX_race(0);
        })
        .transition(NEW_TRANSIT())
        .attr("width", function (d) {
            return scaleX_race(d["his_race_count"]);
        })
        .attr("x", function (d) {
            return scaleX_race(0);
        });

      d3.select("#men_plot").selectAll("text")
        .data(dataframe)
        .enter()
        .append("text")
        .attr("y", function (d, i) {
            return scaleY_race(i + 0.5);
        })
        .style("fill", "white")
        .attr("font-size", "9px")
        .text(d => d["his_race_count"])
        .attr("x", function (d) {
            return scaleX_race(0);
        })
        .transition(NEW_TRANSIT())
        .attr("x", function (d) {
            return scaleX_race(d["his_race_count"]) + 5;
        });
}

const scaleX_age = d3.scaleLinear()
	.domain([0, 500])
	.range([0, 200]);
const scaleY_age = d3.scaleLinear()
	.domain([0, 12])
	.range([0, 280]);

function age_barplot(dataframe){
    d3.select("#classical_labels").selectAll("text")
      .data(dataframe)
      .enter()
      .append("text")
      .text(d => d["age_label"])
      .attr("x", d => scaleX_age(220))
      .attr("y", (d,i)=> scaleY_age(i + 0.5))
      .style("text-anchor", "middle")
      .style("fill", "white")
      .attr("font-size", "12px");

    d3.select("#women_plot").selectAll("rect")
      .data(dataframe)
      .enter()
      .append("rect")
      .attr("y", function (d, i) {
          return scaleY_age(i);
      })
      .attr("height", _=>scaleY_age(.9))
      .attr("x", function (d) {
          return scaleX_age(500);
      })
      .style("fill", d => colorDict[d["race_label"]])
      .style("padding", "1px")
      .attr("width", function (d) {
          return scaleX_age(0);
      })
      .transition(NEW_TRANSIT())
      .attr("width", function (d) {
          return scaleX_age(d["her_age_count"]);
      })
      .attr("x", function (d) {
          return scaleX_age(500 - d["her_age_count"]);
      });

    d3.select("#women_plot").selectAll("text")
      .data(dataframe)
      .enter()
      .append("text")
      .attr("y", function (d, i) {
          return scaleY_age(i + 0.5);
      })
      .style("fill", "white")
      .attr("font-size", "9px")
      .text(d => d["her_age_count"])
      .attr("x", function (d) {
          return scaleX_age(500);
      })
      .transition(NEW_TRANSIT())
      .attr("x", function (d) {
          return scaleX_age(500 - d["her_age_count"] - 50);
      });

      d3.select("#men_plot").selectAll("rect")
        .data(dataframe)
        .enter()
        .append("rect")
        .attr("y", function (d, i) {
            return scaleY_age(i);
        })
        .attr("height", _=>scaleY_age(.9))
        .attr("x", function (d) {
            return scaleX_age(0);
        })
        .style("fill", d => colorDict[d["race_label"]])
        .style("padding", "1px")
        .attr("width", function (d) {
            return scaleX_age(0);
        })
        .transition(NEW_TRANSIT())
        .attr("width", function (d) {
            return scaleX_age(d["his_age_count"]);
        })
        .attr("x", function (d) {
            return scaleX_age(0);
        });

      d3.select("#men_plot").selectAll("text")
        .data(dataframe)
        .enter()
        .append("text")
        .attr("y", function (d, i) {
            return scaleY_age(i + 0.5);
        })
        .style("fill", "white")
        .attr("font-size", "9px")
        .text(d => d["his_age_count"])
        .attr("x", function (d) {
            return scaleX_age(0);
        })
        .transition(NEW_TRANSIT())
        .attr("x", function (d) {
            return scaleX_age(d["his_age_count"]) + 5;
        });
}

const scaleX_relationship = d3.scaleLinear()
	.domain([0, 500])
	.range([0, 200]);
const scaleY_relationship = d3.scaleLinear()
	.domain([0, 21])
	.range([0, 280]);

function relationship_barplot(dataframe){
    d3.select("#classical_labels").selectAll("text")
      .data(dataframe)
      .enter()
      .append("text")
      .text(d => d["relationship_label"])
      .attr("x", d => scaleX_relationship(220))
      .attr("y", (d,i)=> scaleY_relationship(i + 0.5))
      .style("text-anchor", "middle")
      .style("fill", "white")
      .attr("font-size", "6.5px");

      d3.select("#men_plot").selectAll("rect")
        .data(dataframe)
        .enter()
        .append("rect")
        .attr("y", function (d, i) {
            return scaleY_relationship(i);
        })
        .attr("height", _=>scaleY_relationship(.9))
        .attr("x", function (d) {
            return scaleX_relationship(0);
        })
        .style("fill", d => colorDict[d["relationship_label"]])
        .style("padding", "1px")
        .attr("width", function (d) {
            return scaleX_relationship(0);
        })
        .transition(NEW_TRANSIT())
        .attr("width", function (d) {
            return scaleX_relationship(d["relationship_count"]);
        })
        .attr("x", function (d) {
            return scaleX_relationship(0);
        });

      d3.select("#men_plot").selectAll("text")
        .data(dataframe)
        .enter()
        .append("text")
        .attr("y", function (d, i) {
            return scaleY_relationship(i + 0.5);
        })
        .style("fill", "white")
        .attr("font-size", "8.5px")
        .text(d => d["relationship_count"])
        .attr("x", function (d) {
            return scaleX_relationship(0);
        })
        .transition(NEW_TRANSIT())
        .attr("x", function (d) {
            return scaleX_relationship(d["relationship_count"]) + 5;
        });
}

// Show the plot
function show_race_plot() {
}
function show_age_plot() {
}
function show_relationship_plot() {
}

function downloadData(){
//Here the comment below is a plot for age. For the relationship plot there is a different file with data.

  d3.csv("/data_statistical/Race_Age.csv").then(result => race_barplot(result));
  //d3.csv("/data_statistical/Race_Age.csv").then(result => age_barplot(result));
  //d3.csv("/data_statistical/Relationship.csv").then(result => relationship_barplot(result));

  let type_buttons = d3.select("#type_button");
	type_buttons
		.append("button")
		.attr("onClick", _ => "show_race_plot()")
		.style("background-color", "blue")
		.attr('id', "Race_button")
		.style("border", "2px solid blue")
		.on("mouseenter", function(_){d3.select(this).style("border", "2px solid #FFFFFF")})
		.on("mouseleave", function(_){d3.select(this).style("border", "2px solid blue")})
		.text(_ => "Race/Ethnicity");
	type_buttons
		.append("button")
		.attr("onClick", _ => "show_age_plot()")
		.style("background-color", "green")
		.style("width", 100)
		.style("height", 10)
		.attr('id', "State_button")
		.style("border", "2px solid green")
		.on("mouseenter", function(_){d3.select(this).style("border", "2px solid #FFFFFF")})
		.on("mouseleave", function(_){d3.select(this).style("border", "2px solid green")})
		.text(_ => "Age");
	type_buttons
		.append("button")
		.attr("onClick", _ => "show_relationship_plot()")
		.style("background-color", "pink")
		.attr('id', "Relationship_button")
		.style("border", "2px solid pink")
		.on("mouseenter", function(_){d3.select(this).style("border", "2px solid #FFFFFF")})
		.on("mouseleave", function(_){d3.select(this).style("border", "2px solid pink")})
		.text(_ => "Relationship with\nthe aggressor");
}
whenDocumentLoaded(downloadData);
