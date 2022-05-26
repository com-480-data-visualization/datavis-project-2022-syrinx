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


const CIRCLE_PER_LINE = 40;
const scaleX = d3.scaleLinear()
	.domain([0, CIRCLE_PER_LINE])
	.range([0, 200]);
const scaleY = d3.scaleLinear()
	.domain([0, 100])
	.range([0, 600]);

function* placeX(c0=0) {
	let c = c0;
	while (true) {
		yield (c++) % CIRCLE_PER_LINE;
	}
}
function* placeY(c0=0) {
	let c = c0;
	while (true) {
		yield Math.floor((c++) / CIRCLE_PER_LINE);
	}
}

/* Unique Races:
 * array(['Latina/x', 'Black / African American', 'Asian', 'White',
       'Unknown / Unreleased', 'Other (see About Her)',
       'Native American / Alaska Native', 'Two or more races',
       'Native Hawaiian / Other Pacific Islander', nan,
       'Two or more races,Black / African American,White'], dtype=object)
*/

const colorDict = {
	"Latina/x": "deeppink",
	'Black / African American': "maroon",
	'Asian': "gold",
	'White': "bisque",
    'Unknown / Unreleased': "rgb(40, 40, 40)",
	'Other (see About Her)': "rgb(40, 40, 40)",
    'Native American / Alaska Native': "darkviolet",
	'Two or more races': "rgb(40, 40, 40)",
    'Native Hawaiian / Other Pacific Islander': "darkblue",
	"nan": "rgb(40, 40, 40)",
    'Two or more races,Black / African American,White': "rgb(40, 40, 40)"
}
var DATA;
const NEW_TRANSIT = (() => d3.transition().duration(1500));



function grow_details() {
	d3.select(this)
		.transition(NEW_TRANSIT())
		.attr("r", 5)
		.attr("fill", "rgb(40, 40, 40)");

	const sel = d3.select("#centerInfos");
	sel.append("circle")
		.attr("id", "big")
		.attr("cx", scaleX(20))
		.attr("cy", scaleY(20))
		.attr("r", 0)
		.attr("pointer-events", "none")
		.attr("fill", "rgba(40, 40, 40, 0.5)")
		.transition(NEW_TRANSIT())
		.attr("r", 80)
		.attr("fill", "rgba(40, 40, 40, 0.9)");

	const iterator = this.__data__["HER NAME"].split(" ");
	const up = Math.floor(iterator.length / 2);
	for ([i, str] of iterator.entries()) {
		sel.append("text")
			.attr("x", scaleX(20))
			.attr("y", scaleY(20 + 2*(i + 1 - up)))
			.text(() => str)
			.attr("pointer-events", "none")
			.style("text-anchor", "middle")
			.attr("font-size", "0px")
			.attr("fill", "white")
			.transition(NEW_TRANSIT())
			.attr("font-size", "10px");
	}
	for (let i=0; i<this.__data__["HER AGE"]; i++) {
		sel.append("circle")
			.attr("id", "age_circle")
			.attr("cx", scaleX(20))
			.attr("cy", scaleY(20))
			.attr("r", 0)
			.attr("pointer-events", "none")
			.attr("fill", "none")
			.attr("stroke", "white")
			.attr("stroke-width", 0.1)
			.transition(NEW_TRANSIT())
			.attr("cx", scaleX(20) + 4 * (Math.random() - 0.5))
			.attr("cy", scaleY(20) + 4 * (Math.random() - 0.5))
			.attr("r", 45 + 20 * Math.random())
	}

}

function shrink_back() {
	d3.select(this)
		.transition(NEW_TRANSIT())
		.attr("r", 1.5)
		.attr("fill", d => colorDict[d["HER RACE / ETHNICITY"]]);

	d3.selectAll("#big")
		.transition(NEW_TRANSIT())
		.attr("fill", "rgba(40, 40, 40, 0.5)")
		.attr("r", 0)
		.on("end", function () {this.remove();});

	d3.selectAll("#age_circle")
		.transition(NEW_TRANSIT())
		.attr("r", 0)
		.on("end", function () {this.remove();});

	d3.selectAll("text")
		.transition(NEW_TRANSIT())
		.attr("font-size", "0px")
		.on("end", function () {this.remove();});
}

d3.selection.prototype.define_circles = function() {
	return this
		.attr("id", "circle")
		.attr("stroke", "white")
		.attr("stroke-width", 0.5)
		.attr("r", 1.5)
		.on(
			"mousedown", grow_details
		)
		.on(
			"mouseup", shrink_back
		)
		.attr("fill",
			d => colorDict[d["HER RACE / ETHNICITY"]]
		);
}

function circles(data) {
	frame = d3.select('#data');

	var circles = frame.selectAll("#circle").data(data);
	const xs = placeX();
	const ys = placeY();
	circles.enter().append("circle")
		.attr("cx", _ => scaleX(xs.next().value))
		.attr("cy", _ => scaleY(ys.next().value))
		.define_circles()
		.attr("fill", "none")
		.attr("r", 0)
		.transition(NEW_TRANSIT())
		.attr("r", 1.5)
		.attr("fill",
			d => colorDict[d["HER RACE / ETHNICITY"]]
		);
	d3.selectAll("#circle")
	circles.exit().remove();
	DATA = data;
}




function sortBy(ethnicity) {
	const xs = placeX();
	const ys = placeY();

	firstXs = placeX();
	firstYs = placeY();

	let count_ethnicity = 0;
	DATA.map(row => {
		if (!row["HER RACE / ETHNICITY"].localeCompare(ethnicity)) count_ethnicity++;
		});

	nextXs = placeX(count_ethnicity);
	nextYs = placeY(count_ethnicity);

	frame = d3.select('#data');
	frame.selectAll("#circle").remove();

	var circles = frame.selectAll("circle").data(DATA);
	circles.enter().append("circle")
		.attr("cx", _ => scaleX(xs.next().value))
		.attr("cy", _ => scaleY(ys.next().value))
		.define_circles()
		.transition(NEW_TRANSIT())
		.attr("cx", d => {
			if (!d["HER RACE / ETHNICITY"].localeCompare(ethnicity)) return scaleX(firstXs.next().value);
			else return scaleX(nextXs.next().value);
		})
		.attr("cy", d => {
			if (!d["HER RACE / ETHNICITY"].localeCompare(ethnicity)) return scaleY(firstYs.next().value);
			else return scaleY(nextYs.next().value);
		})

	circles.exit().remove();
}


function createButtons() {
	d3.csv("/data/data.csv").then(result => circles(result));

	d3.select("#race_select").selectAll("button").data(Object.keys(colorDict))
		.enter()
		.append("button")
		.attr("onClick", d => "sortBy('" + d + "')")
		.style("background-color", d => colorDict[d])
		.style("width", "100%")
		.text(d => d);
}
whenDocumentLoaded(createButtons)
