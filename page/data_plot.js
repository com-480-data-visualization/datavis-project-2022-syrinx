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


// Scales to convert coordinates from the domain frame to the target "range" frame,
//    in the coordinate system of the svg frame.
const CIRCLE_PER_LINE = 40;
const scaleX = d3.scaleLinear()
	.domain([0, CIRCLE_PER_LINE])
	.range([0, 200]);
const scaleY = d3.scaleLinear()
	.domain([0, 100])
	.range([0, 600]);

function* placeX(c0=0) {
	// Generator function to generate the x coordinates in the domain frame.
	let c = c0;
	while (true) {
		yield (c++) % CIRCLE_PER_LINE;
	}
}
function* placeY(c0=0) {
	// Generator function to generate the y coordinates in the domain frame.
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
// Association race->color
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

// Scale x and y to a new point
function build_scaled_point(x, y) {
	return {
		"x": scaleX(x),
		"y": scaleY(y)
	}
}

// No scale center
const center_ns = {
	"x": 20,
	"y": 20
};
// Scaled center
const center = {
	"x": scaleX(center_ns.x),
	"y": scaleY(center_ns.y)
};

function make_star(angle, end) {
	let RADIUS = 4;
	let center_star = {
		"x": end.x + Math.cos(angle)*RADIUS,
		"y": end.y - Math.sin(angle)*RADIUS
	};
	let list_points = []
	let little = true;
	angle += Math.PI / 5;
	for (let branch = 0; branch < 2*Math.PI; branch += Math.PI / 5) {
		if (little) {
			list_points.push({
				"x": center_star.x + Math.cos(branch+angle)*RADIUS/2,
				"y": center_star.y - Math.sin(branch+angle)*RADIUS/2,
				"angle": branch
			});
		} else {
			list_points.push({
				"x": center_star.x + Math.cos(branch+angle)*RADIUS,
				"y": center_star.y - Math.sin(branch+angle)*RADIUS,
				"angle": branch
			});
		}
		little = !little; // Swap from close to far branch
	}
	list_points.push(list_points[0]);
	let accumulator = null;
	list_points.reduce((last, next, i) => {
		if (i !== 0) {
			d3.select("#centerInfos")
				.append("line")
				.attr("id", "shooting_star")
				.attr("stroke", "white")
				.attr("stroke-width", 0.1)
				.attr("x1", center_star.x)
				.attr("y1", center_star.y)
				.attr("x2", center_star.x)
				.attr("y2", center_star.y)
				.transition(NEW_TRANSIT())
				.attr("stroke-width", 1.2)
				.attr("x1", last.x)
				.attr("y1", last.y)
				.attr("x2", next.x)
				.attr("y2", next.y);
		}
		return next;
	}, accumulator);
}

function make_shooting_star() {
	// Angle between pi and 3pi/2 (lower-left corner).
	let angle = Math.PI * (1.0 + 0.5*Math.random());
	let begin_ray = 70 + 4*Math.random();
	let end_ray = 90 + 4*Math.random();
	// Start point of the line
	let begin = {
		"x": center.x + Math.cos(angle)*begin_ray,
		"y": center.y - Math.sin(angle)*begin_ray
	};
	// End point of the line
	let end = {
		"x": center.x + Math.cos(angle)*end_ray,
		"y": center.y - Math.sin(angle)*end_ray
	};
	// We add the line, and at the end of the animation we make the star shape
	d3.select("#centerInfos")
		.append("line")
		.attr("id", "shooting_star")
		.attr("stroke-width", 0.1)
		.attr("x1", center.x)
		.attr("y1", center.y)
		.attr("x2", center.x)
		.attr("y2", center.y)
		.attr("pointer-events", "none")
		.attr("stroke", "white")
		.transition(NEW_TRANSIT())
		.attr("stroke-width", 1.2)
		.attr("x1", begin.x)
		.attr("y1", begin.y)
		.attr("x2", end.x)
		.attr("y2", end.y)
		.on("end", () => make_star(angle, end));
}

function grow_details() {
	// Grow the clicked circle
	d3.select(this)
		.transition(NEW_TRANSIT())
		.attr("r", 5)
		.attr("fill", "rgb(40, 40, 40)");

	// Select the area reseved for the center info
	const sel = d3.select("#centerInfos");

	// Make the big dark circle
	// We make it extra big in order to see the gradient well enough
	sel.append("circle")
		.attr("id", "big")
		.attr("cx", center.x)
		.attr("cy", center.y)
		.attr("r", 0)
		.attr("pointer-events", "none")
		//.attr("fill", "rgba(40, 40, 40, 0.5)")
		.attr("fill", "url(#gradient)")
		.transition(NEW_TRANSIT())
		.attr("r", 120)
		//.attr("fill", "rgba(40, 40, 40, 0.9)")
		.attr("fill", "url(#gradient)")
		.on("end", make_shooting_star);
	sel.append("circle")
		.attr("id", "big")
		.attr("cx", center.x)
		.attr("cy", center.y)
		.attr("r", 0)
		.attr("pointer-events", "none")
		.attr("fill", "rgba(40, 40, 40, 0.5)")
		.transition(NEW_TRANSIT())
		.attr("r", 80)
		.attr("fill", "rgba(40, 40, 40, 0.9)")

	const iterator = this.__data__["HER NAME"].split(" ");
	// Center the text a bit
	const up = iterator.length / 2;
	// Split the name into first name / family name for each victim.
	for ([i, str] of iterator.entries()) {
		sel.append("text")
			.attr("x", center.x)
			.attr("y", scaleY(20 + 2*(i + 1 - up)))
			.text(() => str.replace(/^\s+|\s+$/g, ''))
			.attr("pointer-events", "none")
			.style("text-anchor", "middle")
			.attr("font-size", "0px")
			.attr("fill", "white")
			.transition(NEW_TRANSIT())
			.attr("font-size", "10px");
	}
	// Produce a circle per year of age (at death time).
	// The center is random, and the ray is random.
	for (let i=0; i<this.__data__["HER AGE"]; i++) {
		sel.append("circle")
			.attr("id", "age_circle")
			.attr("cx", center.x)
			.attr("cy", center.y)
			.attr("r", 0)
			.attr("pointer-events", "none")
			.attr("fill", "none")
			.attr("stroke", "white")
			.attr("stroke-width", 0.1)
			.transition(NEW_TRANSIT())
			.attr("cx", center.x + 4 * (Math.random() - 0.5))
			.attr("cy", center.y + 4 * (Math.random() - 0.5))
			.attr("r", 45 + 20 * Math.random())
	}

}

function shrink_back() {
	// "Shrink" = Get size to zero, and then remove.
	// Shrink little circle.
	d3.select(this)
		.transition(NEW_TRANSIT())
		.attr("r", 1.5)
		.attr("fill", d => colorDict[d["HER RACE / ETHNICITY"]]);

	// Shrink big circle.
	d3.selectAll("#big")
		.transition(NEW_TRANSIT())
		.attr("r", 0)
		.on("end", function () {this.remove();});

	// Shrink all age circles.
	d3.selectAll("#age_circle")
		.transition(NEW_TRANSIT())
		.attr("r", 0)
		.on("end", function () {this.remove();});

	// Shrink victim name.
	d3.selectAll("text")
		.transition(NEW_TRANSIT())
		.attr("font-size", "0px")
		.on("end", function () {this.remove();});

	// Shrink the shooting star
	d3.selectAll("#shooting_star")
		.transition(NEW_TRANSIT())
		.attr("x1", center.x)
		.attr("y1", center.y)
		.attr("x2", center.x)
		.attr("y2", center.y)
		.on("end", function () {this.remove();})
}

// Factorization for the code producing and changing the circles.
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
		.on(
			"mouseout", shrink_back
		)
		.attr("fill",
			d => colorDict[d["HER RACE / ETHNICITY"]]
		);
}

function circles(data) {
	frame = d3.select('#data');


	var circles = frame.selectAll("#circle").data(data);

	// Initialize the (x, y) coordinates generator.
	const xs = placeX();
	const ys = placeY();
	// Setup the little circles, and let them grow.
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
	circles.exit().remove(); // Handle excess data
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
	frame.selectAll("#circle")
		.transition(NEW_TRANSIT())
		.attr("cx", d => {
			if (!d["HER RACE / ETHNICITY"].localeCompare(ethnicity)) return scaleX(firstXs.next().value);
			else return scaleX(nextXs.next().value);
		})
		.attr("cy", d => {
			if (!d["HER RACE / ETHNICITY"].localeCompare(ethnicity)) return scaleY(firstYs.next().value);
			else return scaleY(nextYs.next().value);
		})
}


function createButtons() {
	d3.csv("/data/data.csv").then(result => circles(result));

	// Define the radial color gradient.
	var defs = d3.select("svg")
		.append("defs");
	var gradient = defs.append("radialGradient")
		.attr("id", "gradient")
		.attr("x1", "0%")
		.attr("y1", "0%")
		.attr("x2", "100%")
		.attr("y2", "100%");
	gradient.append("stop")
		.attr("class", "start")
		.attr("offset", "0%")
		.attr("stop-color", "SlateBlue")
		.attr("stop-opacity", "90%");
	gradient.append("stop")
		.attr("class", "end")
		.attr("offset", "100%")
		.attr("stop-color", "rgb(40,40,40)")
		.attr("stop-opacity", "40%");

	d3.select("#race_select").selectAll("button").data(Object.keys(colorDict))
		.enter()
		.append("button")
		.attr("onClick", d => "sortBy('" + d + "')")
		.style("background-color", d => colorDict[d])
		.style("width", "100%")
		.text(d => d);
}
whenDocumentLoaded(createButtons);
whenDocumentLoaded(screen.orientation.lock("portrait-primary"));
