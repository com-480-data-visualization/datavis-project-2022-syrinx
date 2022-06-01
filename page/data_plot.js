// import { DatePlot, AgePlot, RacePlot, StatePlot } from "./portrait/portrait_view.js";
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
    'Unknown / Unreleased': "black",
	'Other (see About Her)': "black",
    'Native American / Alaska Native': "darkviolet",
	'Two or more races': "black",
    'Native Hawaiian / Other Pacific Islander': "darkblue",
	"nan": "black",
    'Two or more races,Black / African American,White': "black"
};
const states = ['CA', 'GA', 'NY', 'OH', 'FL', 'TN', 'MD', 'NC', 'IL', 'NJ', 'AR',
       'MI', 'OR', 'PA', 'AL', 'AZ', 'KY', 'TX', 'KS', 'MN', 'NM', 'MA',
       'MO', 'NV', 'ME', 'MT', 'VA', 'WA', 'WV', 'WI', 'MS', 'LA', 'CO',
       'IN', 'SC', 'OK', 'IA', 'PR', 'CT', 'AK', 'RI', 'VT', 'ID', 'SD',
       'UT', 'NE', 'HI', 'ND', 'NH', 'DE', 'WY', 'DC', 'nan'];
const relationships = ['Husband', 'Acquaintance', 'Stranger', 'Unknown / Unreleased',
       'Boyfriend', "Son / Stepson / Partner's Son / Daughter's Partner",
       'Estranged Husband', 'Fiancé / Ex-Fiancé',
       "Brother / Stepbrother / Partner or Sibling's Brother / Brother-in-Law",
       'Ex-Boyfriend', 'Ex-Husband',
       "Father / Stepfather / Mother's Partner / Father-in-Law", 'Friend',
       'Uncle / Nephew / Cousin',
       'Neighbor / Roommate / Landlord / Tenant',
       'Student/Classmate (Current or Former)',
       'Repairman / Service Provider', "Caregiver / Caregiver's Relative",
       'Work-Related', 'Grandfather / Grandson Relationship', 'Hitman'];

// https://stackoverflow.com/questions/3426404/create-a-hexadecimal-colour-based-on-a-string-with-javascript
// A function to get a random color from any string.
// Useful for conversions State->color
function stringToColor(str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var colour = '#';
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xFF;
    colour += ('00' + value.toString(16)).substr(-2);
  }
  return colour;
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

// Make the Iframe with the content of the personal view
function show_personal_view(d_point) {
	d3.select("#centerInfos")
		.html(null);
	d3.select("#data")
		.html(null);
	d3.select("#plot")
		.attr("height", 0);
	// d3.select("#plotdiv")
	// 	.append("iframe")
	// 	.attr("id", "personalview_frame")
	// 	.attr("width", "100%")
	// 	.attr("height", "600px")
	// 	.attr("src", "./portrait/portrait_view_minimal.html");
	d3.select("#plotdiv")
		.append("svg")
		.attr("id", "Portrait")
		.attr("viewbox", "-10, -10, 400, 220")
		.attr("preserveAspectRatio", "xMidYMid meet")
		.attr("width", "100%")
		.attr("height", "450px");
	let sel_port = d3.select("#Portrait");
	sel_port
		.append("svg")
		.attr("x", 0)
		.attr("y", 100)
		.attr("id", "date_and_age_Plot")
		.attr("viewbox", "-30, -10, 400, 300")
		.attr("width", "100%")
		.attr("height", "100%");
	sel_port
		.append("svg")
		.attr("x", 300)
		.attr("y", 0)
		.attr("id", "statePlot")
		.attr("viewbox", "-860 0 1065 800")
		.attr("width", "100%")
		.attr("height", "100%");
	sel_port
		.append("svg")
		.attr("x", 0)
		.attr("y", 0)
		.attr("id", "racePlot")
		.attr("viewbox", "50 0 400 300")
		.attr("width", "100%")
		.attr("height", "100%");
	sel_port
		.append("svg")
		.attr("x", 20)
		.attr("y", 400)
		.attr("id", "buttons_portrait")
		.attr("viewbox", "0 -100 400 100");
	let datePlot = new DatePlot('date_and_age_Plot', d_point);
	let agePlot = new AgePlot('date_and_age_Plot', d_point);
	let statePlot = new StatePlot('statePlot', d_point);
	let racePlot = new RacePlot('racePlot', d_point);

	// Remove selector buttons, and replace them by the new ones
	const clean_buttons = () => {
		d3.selectAll("#Race_button")
			.remove()
		d3.selectAll("#State_button")
			.remove()
		d3.select("#Relationship_button")
			.remove()
		d3.selectAll("#selector_button")
			.selectAll(".circle_mover")
			.remove();
		d3.selectAll("#stats")
			.html(null);
	}
	clean_buttons();

	// Add new buttons
	make_portrait_buttons("#buttons_portrait");

	// Listen to the possible return of the ensemble view
	document.getElementById("main_div").addEventListener("go_to_ensemble", () => {
		d3.select("#Portrait").remove();
		d3.select("#plot")
			.attr("height", "100%");
		clean_buttons();
		createButtons();
	})
}

// Makes the star at the end of the shooting_star.
function make_star(angle, end, data_p) {
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
				.attr("y2", next.y)
				.on(
					"end", () => {if (i == list_points.length - 1) show_personal_view(data_p)}
				);
		}
		return next;
	}, accumulator);
}

// Builds the shooting star at a random angle
function make_shooting_star(data_p) {
	// Angle between pi and 3pi/2 (lower-left corner).
	let angle = Math.PI * (1.0 + 0.5*Math.random());
	let begin_ray = 70 + 4*Math.random();
	let end_ray = 90 + 4*Math.random();
	let center_text = (begin_ray + end_ray) / 2;
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
	var container = d3.select("#centerInfos");
	// We add the line, and at the end of the animation we make the star shape
	container
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
		.on("end", () => make_star(angle, end, data_p));
	container
		.append("text")
		.attr("x", center.x)
		.attr("y", center.y)
		.attr("pointer-events", "none")
		.style("text-anchor", "center")
		.attr("font-size", "0px")
		.attr("fill", "white")
		.text(() => data_p["DATE"].replace(/^\s+|\s+$/g, ''))
		.transition(NEW_TRANSIT())
		.attr("x", center.x + center_text*Math.cos(angle))// + Math.cos(angle-Math.PI/2))
		.attr("y", center.y - center_text*Math.sin(angle))// - Math.sin(angle-Math.PI/2))
		.attr("dx", -20)
		.attr("dy", -5)
		.attr("font-size", "5px")
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
		.attr("fill", "url(#gradient)")
		.transition(NEW_TRANSIT())
		.attr("r", 120)
		.attr("fill", "url(#gradient)")
		.on("end", () => make_shooting_star(this.__data__));
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

	// Shrink victim name + date.
	d3.selectAll("text")
		.transition(NEW_TRANSIT())
		.attr("x", center.x)
		.attr("y", center.y)
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


const REPLACE_REGEX1 = /\(|\)|,|\/|\s/g;
const REPLACE_REGEX2 = /=/g;
const REPLACE_REGEX3 = /\/|,/g;


// Moves all circles in the general view to a new position,
// sorted through a criterium called "type"
function sortBy(type, selected) {
	let firstXs = placeX();
	let firstYs = placeY();

	let count_selected = 0;
	DATA.map(row => {
		if (!row[type].localeCompare(selected)) count_selected++;
		});

	nextXs = placeX(count_selected);
	nextYs = placeY(count_selected);

	frame = d3.select('#data');
	let circles = frame.selectAll("#circle");
	// Make all the circles move to their new position
	circles
		.transition(NEW_TRANSIT())
		.attr("cx", d => {
			if (!d[type].localeCompare(selected)) return scaleX(firstXs.next().value);
			else return scaleX(nextXs.next().value);
		})
		.attr("cy", d => {
			if (!d[type].localeCompare(selected)) return scaleY(firstYs.next().value);
			else return scaleY(nextYs.next().value);
		})
		.attr("opacity", d => {
			if (!d[type].localeCompare(selected)) return 1.0;
			else return 0.5;
		})
	// Put border on button
	d3.selectAll(".circle_mover").style("opacity", 0.3)
	d3.select("#" + selected.replace(REPLACE_REGEX1, "_").replace(REPLACE_REGEX2, ".")).style("opacity", 1.0)
}

// Show the list of buttons for the race selection
function show_race_selector() {
	d3.select("#Race_button").style("opacity", 1.0);
	d3.select("#State_button").style("opacity", 0.3);
	d3.select("#Relationship_button").style("opacity", 0.3);

	d3.select("#relashionship_select").selectAll("button").remove()
	d3.select("#state_select").selectAll("button").remove()
	d3.select("#race_select").selectAll("button").data(Object.keys(colorDict))
		.enter()
		.append("button")
		.attr("id", d => d.replace(REPLACE_REGEX1, "_").replace(REPLACE_REGEX2, "."))
		.attr("class", "circle_mover")
		.attr("onClick", d => "sortBy('HER RACE / ETHNICITY', '" + d + "')")
		.style("background-color", d => colorDict[d])
		.style("width", "100%")
		.style("border", d => "2px solid " + colorDict[d])
		.on("mouseenter", function(){d3.select(this).style("border", "2px solid #FFFFFF")})
		.on("mouseleave", function(){d3.select(this).style("border", "2px solid " + colorDict[this.__data__])})
		.text(d => d);
}
// Show the list of buttons for the state selection
function show_state_selector() {
	d3.select("#Race_button").style("opacity", 0.3);
	d3.select("#State_button").style("opacity", 1.0);
	d3.select("#Relationship_button").style("opacity", 0.3);

	d3.select("#race_select").selectAll("button").remove()
	d3.select("#relashionship_select").selectAll("button").remove()
	d3.select("#state_select").selectAll("button").data(states)
		.enter()
		.append("button")
		.attr("id", d => d.replace(REPLACE_REGEX1, "_").replace(REPLACE_REGEX2, "."))
		.attr("class", "circle_mover")
		.attr("onClick", d => "sortBy('STATE', '" + d + "')")
		.style("background-color", d => stringToColor(d))
		.style("width", "100%")
		.style("border", d => "2px solid " + stringToColor(d))
		.on("mouseenter", function(){d3.select(this).style("border", "2px solid #FFFFFF")})
		.on("mouseleave", function(){d3.select(this).style("border", "2px solid " + stringToColor(this.__data__))})
		.text(d => d);
}

function show_relationship_selector() {
	d3.select("#Race_button").style("opacity", 0.3);
	d3.select("#State_button").style("opacity", 0.3);
	d3.select("#Relationship_button").style("opacity", 1.0);

	d3.select("#race_select").selectAll("button").remove()
	d3.select("#state_select").selectAll("button").remove()
	d3.select("#relashionship_select").selectAll("button").data(relationships)
		.enter()
		.append("button")
		.attr("id", d => d.replace(REPLACE_REGEX1, "_").replace(REPLACE_REGEX2, "."))
		.attr("class", "circle_mover")
		.attr("onClick", d => "sortBy('RELATIONSHIP', '" + d + "')")
		.style("background-color", d => stringToColor(d))
		.style("width", "100%")
		.style("border", d => "2px solid " + stringToColor(d))
		.on("mouseenter", function(){d3.select(this).style("border", "2px solid #FFFFFF")})
		.on("mouseleave", function(){d3.select(this).style("border", "2px solid " + stringToColor(this.__data__))})
		.text(d => d);
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

	let type_buttons = d3.select("#type_button");
	type_buttons
		.append("button")
		.attr("onClick", _ => "show_race_selector()")
		.style("background-color", "blue")
		.attr('id', "Race_button")
		.style("border", "2px solid blue")
		.on("mouseenter", function(_){d3.select(this).style("border", "2px solid #FFFFFF")})
		.on("mouseleave", function(_){d3.select(this).style("border", "2px solid blue")})
		.text(_ => "Race/Ethnicity");
	type_buttons
		.append("button")
		.attr("onClick", _ => "show_state_selector()")
		.style("background-color", "green")
		.style("width", 100)
		.style("height", 10)
		.attr('id', "State_button")
		.style("border", "2px solid green")
		.on("mouseenter", function(_){d3.select(this).style("border", "2px solid #FFFFFF")})
		.on("mouseleave", function(_){d3.select(this).style("border", "2px solid green")})
		.text(_ => "State");
	type_buttons
		.append("button")
		.attr("onClick", _ => "show_relationship_selector()")
		.style("background-color", "pink")
		.attr('id', "Relationship_button")
		.style("border", "2px solid pink")
		.on("mouseenter", function(_){d3.select(this).style("border", "2px solid #FFFFFF")})
		.on("mouseleave", function(_){d3.select(this).style("border", "2px solid pink")})
		.text(_ => "Relationship with\nthe aggressor");

}
whenDocumentLoaded(createButtons);
//whenDocumentLoaded(screen.orientation.lock("portrait-primary"));
