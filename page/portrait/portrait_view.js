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


// Visualisation 1.1
// Personal Information - Age
class AgePlot {
        constructor(svg_element_id, data) {

              function range(start, end) {
              	/* generate a range : [start, start+1, ..., end-1, end] */
              	var len = end - start + 1;
              	var a = new Array(len);
                // this is a starting radius that keeps space for the name
                var SPACER = 45;
              	for (let i = 0; i < len; i++) a[i] = SPACER + start + i;
              	return a;
              }
              var name = d3.select("#"+svg_element_id)
                  .append("text")
                  .text(data.age + ' yo')
                  .attr("x",-12)
                  .attr("y",data.age+12)
                  .style("font", "1px times")
                  .attr("transform", "translate(200,150)")
                     .transition()
                     .duration(4400)
                     .style("font", "12px times")




              var age_circle = d3.select("#"+svg_element_id)
                  .append("circle")
                     .attr("cx",200)
                     .attr("cy",150)
                     .attr("r", 1)
                     .attr("stroke",'#0B1A39')
                     .attr("fill",'transparent')
                     .attr("stroke-width",0.2)
                     .transition()
                     .duration(data.age*100)
                     .attr("r",data.age)
                     .on('end',function(){
                       d3.select("#"+svg_element_id)
                       .append("text")
                       .text(data.age + ' yo')
                       .attr("x",-12)
                       .attr("y",data.age+12)
                       .style("font", "1px times")
                       .attr("transform", "translate(200,150)")
                       .transition()
                             .duration(100)
                             .on('end',function(){
                               d3.select("#"+svg_element_id)
                                .append("text")
                                .text(data.name)
                                .attr("x",175)
                                .attr("y",150)
                                .style("font", "14px times")
                               })
                    })
                    ;
                   }

// //attach data to the selection
//  var age_circles = d3.select("#"+svg_element_id).selectAll("circle").data(data)
// // change radius of old nodes
// age_circles.attr("r",data.age)
// // if new circles
// var age_circle_Enter = age_circles.enter().attr("fill",red)
// //remove old nodes
// var age_circle_remove = age_circles.exit().remove()

              // //---- BLOCK for multiple circles
              // const radii = range(1,data.age);
              // console.log(radii);
              //
              // d3.select("#portrait")
              //   .selectAll("circles")
              //     .data(radii)
              //     .enter()
              //     .append("circle")
              //        .attr("cx",200)
              //        .attr("cy",150)
              //        .attr("r", function(d) { return d })
              //        .attr("stroke",'#0B1A39')
              //        .attr("fill",'transparent')
              //        .attr("stroke-width",0.2);
              //      }
}
// Visualisation 1.2
// Personal Information - Date

// Date plot functions
// CONSTANTS
// PARAMETERS
 const INNER_RADIUS = 124
const OUTER_RADIUS = 126



// function to transform date to angle /!\ this works for 2018 only
function date_to_angle(data){
  const date1 = new Date('2018/01/01');
  const date2 = new Date(data.date);
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays*2*Math.PI/365

}
// to modify the position of marker based on date
function x_marker(outer_radius, data){
  DEATH_DATE_ANGLE = date_to_angle(data);
  X_MARKER = 200 + outer_radius *Math.sin(DEATH_DATE_ANGLE);
  return X_MARKER
}
function y_marker(outer_radius, data){
  DEATH_DATE_ANGLE = date_to_angle(data);
  return 150 - outer_radius *Math.cos(DEATH_DATE_ANGLE)
}
function x_marker_line(outer_radius, data){
  DEATH_DATE_ANGLE = date_to_angle(data);
  return  200 + outer_radius* 1.25 * Math.sin(DEATH_DATE_ANGLE)
}
function y_marker_line(outer_radius, data){
  DEATH_DATE_ANGLE = date_to_angle(data);
  return 150 - outer_radius * 1.25 * Math.cos(DEATH_DATE_ANGLE)
}
// Date plot constructor
class DatePlot {
        constructor(svg_element_id, data) {

              const death_date_angle = date_to_angle(data)  // angle corresponding to the death date on the year circle


                // yearstart
                const X_YEAR = 200
                const Y_YEAR = 150 - (OUTER_RADIUS+INNER_RADIUS)/2

                // for marker (i.e. mark on the circle)
                const X_MARKER = 200 + OUTER_RADIUS* Math.sin(death_date_angle) // a ratio is applied to move the text inside (<1) or outside (>1) the circle
                const Y_MARKER = 150 - OUTER_RADIUS* Math.cos(death_date_angle)

                // for text
                const X_TEXT = 200 + OUTER_RADIUS*1.05 * Math.sin(death_date_angle) // a ratio is applied to move the text inside (<1) or outside (>1) the circle
                const Y_TEXT = 150 - OUTER_RADIUS*1.05* Math.cos(death_date_angle)

                // for end of line
                const X_LINE = 200 + OUTER_RADIUS* 1.25 * Math.sin(death_date_angle) // a ratio is applied to move the text inside (<1) or outside (>1) the circle
                const Y_LINE = 150 - OUTER_RADIUS* 1.25 * Math.cos(death_date_angle)

                const ROT_TEXT = -90 +  death_date_angle*180/Math.PI


                // function to draw the arc from 1st January to death date
                var arcGenLife = d3.arc()
                          .innerRadius(INNER_RADIUS) // this controls the width of the arc
                          .outerRadius(OUTER_RADIUS)
                          .startAngle(0) //Always start at =
                          .endAngle(death_date_angle); //we need to map date to angle

                // Complete circle for year
                var arcGenDeath = d3.arc()
                          .innerRadius(INNER_RADIUS) // this controls the width of the arc
                          .outerRadius(OUTER_RADIUS)
                          .startAngle(0)
                          .endAngle(Math.PI*2); //we need to map date to angle
                //------BLOCK for arc plot----
                // function to draw from death date to end of year
                // var arcGenDeath = d3.arc()
                //           .innerRadius(INNER_RADIUS) // this controls the width of the arc
                //           .outerRadius(OUTER_RADIUS)
                //           .startAngle(death_date_angle) //Always start at =
                //           .endAngle(Math.PI*2); //we need to map date to angle
                // // draw from 1st January to death date
                // d3.select("#"+svg_element_id)
                //     .append("path")
                //     .attr("d", arcGenLife)
                //     .attr("stroke", "#F9F0DA") //stroke is same as background to make it thineer
                //     .attr("fill","#0B1A39")
                //     .attr("stroke-width", 1)
                //     .attr("transform", "translate(200,150)")


                // draw from death date to end of the year
                d3.select("#"+svg_element_id)
                   .append("path")
                   .attr("d", arcGenDeath)
                   .attr("stroke", "#0B1A39")
                   .attr("fill","#0B1A39")
                   .attr("stroke-width", 0.1)
                   .attr("transform", "translate(200,150)");


                // add death date text
                d3.select("#"+svg_element_id)
                  .append("text")
                .text("   "+data.date)
                .attr("transform","rotate("+ROT_TEXT+","+X_TEXT+","+Y_TEXT+")")
                .attr("x",X_TEXT)
                .attr("y",Y_TEXT)
                .style("font", "6px times");


                // append small dot marker
                var dot_marker1 = d3.select("#"+svg_element_id)
                  .append("circle")
                  .attr("r",4.4)
                  .attr("cx",X_MARKER)
                  .attr("cy",Y_MARKER)
                  .attr("stroke",'#0B1A39')
                  .attr("fill","#0B1A39");

                var dot_marker2 =  d3.select("#"+svg_element_id)
                    .append("circle")
                    .attr("r",4.2)
                    .attr("cx",X_MARKER)
                    .attr("cy",Y_MARKER)
                    .attr("stroke",'#F9F0DA')
                    .attr("fill","transparent");

                // marker for the start of the year
                var dot_marker3 =  d3.select("#"+svg_element_id)
                        .append("circle")
                        .attr("r",4.2)
                        .attr("cx",X_YEAR)
                        .attr("cy",Y_YEAR)
                        .attr("stroke",'#0B1A39')
                        .attr("fill","transparent");

                var dot_marker4 =  d3.select("#"+svg_element_id)
                        .append("circle")
                        .attr("r",4)
                        .attr("cx",X_YEAR)
                        .attr("cy",Y_YEAR)
                        .attr("stroke",'#F9F0DA')
                        .attr("fill","#F9F0DA");

                  // add death date text
                  d3.select("#"+svg_element_id)
                    .append("text")
                  .text("2018")
                  .attr("x",X_YEAR-6)
                  .attr("y",Y_YEAR-6)
                  .style("font", "6px times");

                // append small line
                var dot_line =  d3.select("#"+svg_element_id)
                    .append("line")
                    .attr("x1",d => x_marker(OUTER_RADIUS,data))
                    .attr("x2",d => x_marker_line(OUTER_RADIUS,data))
                    .attr("y1",d => y_marker(OUTER_RADIUS,data))
                    .attr("y2",d => y_marker_line(OUTER_RADIUS,data))
                    .attr("stroke",'#0B1A39')
                    .attr("stroke-width",0.4);




              }

}
// // update death date plot
// function update_death_date(outer_radius, data){
//   console.log('The function update death date has been called')
//   d3.select("#date_and_age_Plot")
//   .selectAll("line")
//   .data(data)
//   .join("line")
//   .transition()
//   .duration(1000)
//     .attr("x1",d => x_marker(outer_radius,data[1]))
//     .attr("x2",d => x_marker_line(outer_radius,data[1]))
//     .attr("y1",d => y_marker(outer_radius,data[1]))
//     .attr("y2",d => y_marker_line(outer_radius,data[1]))
//     .attr("stroke-width",1);
//   console.log(x_marker(outer_radius,data))
//   }

//Visualization 3
// State information
class StatePlot{
  constructor(svg_element_id, data){

  // create circle marker
  var test = d3.select('#'+svg_element_id)
   .append("svg:defs")
   .append("svg:marker")
   .attr("id", "circle")
   .attr("refX", 13)
   .attr("refY", 5)
   .attr("markerWidth", 30)
   .attr("markerHeight", 30)
   .append("circle")
   .attr("cx", 13)
   .attr("cy", 5)
   .attr("r", 0.75)
   .attr("fill","#0B1A39");



    var path = data.path
     // We want to move it on the rigth corner
    // first we put it back to (0,0)

    // then we take into account margin, border and padding


    // then to the right corner



    //Select the DOM element with appropriate ID
    var d3path = d3.select("#"+svg_element_id)
        .append("path")  //add new child element
        .attr("d",path)
        .attr("stroke",'#0B1A39')
        .attr("stroke-width",1)
        .attr("fill","#E1EFE6")
        .attr("marker-end", "url(#circle)") // add markers
        .attr("marker-mid", "url(#circle)")
        .attr("marker-start", "url(#circle)")
        .attr("transform", "translate("+'-843.6'+','+'-438'+')')
        ;

    var nodes = d3path.node()
    console.log(path)

    // xy coordinates center for texts
    var tot_x = 0 ;
    var tot_y = 0 ;
    var totalPathLength = nodes.getTotalLength();
    var step = totalPathLength / 100;
    for(var dist=0; dist < totalPathLength; dist+=step)
        {
          var pt = nodes.getPointAtLength(dist);
          tot_x = tot_x + pt.x;
          tot_y = tot_x + pt.y;
        }
    var X_STATE = tot_x/totalPathLength
    var Y_STATE = tot_y/totalPathLength


    //transition
    var pathLength= d3path.node().getTotalLength();
    d3path
    .attr("stroke-dasharray", pathLength + " " + pathLength)
    .attr("stroke-dashoffset", pathLength)
    .transition()
    .duration(6000)
    //.ease("linear")
    .attr("stroke-dashoffset", 0);

    d3.select("#"+svg_element_id)
    .append("text")
    .text("ST")
    .attr("x",X_STATE)
    .attr("y",Y_STATE)
    .style("font", "6px times")
    .attr("transform", "translate(-225,-200)");


    //second transition
    //d3text.transition().duration(6000).attr("startOffset", 0);

   //  <text >
   // <textPath xlink:href="#path1" startOffset="10%">➤</textPath>

  }
}



// Visualization 1.2

// Prepare data
  var races_ethnicities= ['Latina/x',
 'Black / African American',
 'Asian',
 'White',
 'Unknown / Unreleased',
 'Other (see About Her)',
 'Native American / Alaska Native',
 'Two or more races',
 'Native Hawaiian / Other Pacific Islander',
 "Unknown",
 'Two or more races,Black / African American,White'];
 var cx_circles = [10,10,20,20,20,30,30,40,40,50,50];
 var cy_circles = [20,40,10,30,50,20,40,10,30,20,40];

 let race_ethnicity_data = races_ethnicities.map((value, index) => {
                return {'index' :index,'race_ethnicity': value, 'cx': cx_circles[index], 'cy': cy_circles[index]};
        });



// function
class RacePlot{
  constructor(svg_element_id, data){
var svg = d3.select("#"+svg_element_id)

var el = svg.selectAll("circle")
  .data(data)
  .enter()
  .append("circle")
    .attr("r", 3)
    .attr("cx",data => data.cx)
    .attr("cy",data => data.cy)
    .attr("stroke", "white")
    .attr("stroke-width", 0.2)
    .style("fill", "#0B1A39")
    .on("click", function(){
        //el.attr("fill", "blue");
        console.log('the click worked!')
        svg.selectAll("circle").style("fill","blue");
    });
}
}

/// remove all child
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


function myupdate(data) {
  //remove
  const race_container = document.querySelector('#racePlot');
  removeAllChildNodes(race_container);

  const date_age_container = document.querySelector('#date_and_age_Plot');
  removeAllChildNodes(date_age_container);


  const state_container = document.querySelector('#statePlot');
  removeAllChildNodes(state_container);

  // update agePlot
  let datePlot = new DatePlot('date_and_age_Plot', data);
  let agePlot =new AgePlot('date_and_age_Plot', data);
  let statePlot =new StatePlot('statePlot', data);
  //  console.log(race_ethnicity_data)
  let racePlot = new RacePlot('racePlot', race_ethnicity_data);
}

// Buttons
// ---Next Button
var buttonNextBorder = d3.select("#buttonNext").append("rect")
  .attr("width",80)
  .attr("height", 30)
  .attr("stroke", "#0B1A39")
  .attr("fill", "transparent")
  .attr("transform", "translate(285,22.5)")
  .on("click", function(d) {
      myupdate(list_data[1])
  });


  var buttonNext = d3.select("#buttonNext").append("rect")
    .attr("width",80)
    .attr("height", 30)
    .attr("stroke", "#0B1A39")
    .attr("fill", "transparent")
    .attr("transform", "translate(285,22.5)")
    .on("click", function(d) {
        myupdate(list_data[1])
    })
    .on("mouseover", function(){
          console.log('the mouseover worked!')
          buttonNext.attr("fill", '#0B1A39');
          buttonNext_text.style("fill",'white');
    })
    .on("mouseout", function(){
          console.log('the mouseover worked!')
          buttonNext.attr("fill", 'transparent');
          buttonNext_text.style("fill",'#0B1A39');
    });


var buttonNext_text = d3.select("#buttonNext")
  .append("text")
  .text("NEXT")
  .attr("x",285 + 40 - 7.5) // rectangle x transform + half
  .attr("y",15+25)
  .style("font", "6px HelveticaNeue-Light")
  .style("textAlign", "center")
  .on("click", function(d) {
      myupdate(list_data[1])
  })
  .on("mouseover", function(){
        console.log('the mouseover worked!')
        buttonNext.attr("fill", '#0B1A39');
        buttonNext_text.style("fill",'white');
  })
  .on("mouseout", function(){
        console.log('the mouseover worked!')
        buttonNext.attr("fill", 'transparent');
        buttonNext_text.style("fill",'#0B1A39');
  });
// ---Previous button
var buttonPrevious = d3.select("#buttonNext").append("rect")
.attr("width", 80)
  .attr("height", 30)
  .attr("fill", "transparent")
  .attr("stroke", "#0B1A39")
  .attr("transform", "translate(20,22.5)")
  .on("click", function(d) {
      myupdate(list_data[0])
  })

var buttonPreviousBorder = d3.select("#buttonNext").append("rect")
.attr("width", 80)
  .attr("height", 30)
  .attr("fill", "transparent")
  .attr("stroke", "#0B1A39")
  .attr("transform", "translate(20,22.5)")
  .on("click", function(d) {
      myupdate(list_data[0])
  })
  .on("mouseover", function(){
        console.log('the mouseover worked!')
        buttonPrevious.attr("fill", '#0B1A39');
        buttonPrevious_Text.style("fill",'white');
  })
  .on("mouseout", function(){
        console.log('the mouseover worked!')
        buttonPrevious.attr("fill", 'transparent');
        buttonPrevious_Text.style("fill",'#0B1A39');
  });

var buttonPrevious_Text = d3.select("#buttonNext")
  .append("text")
  .text("PREVIOUS")
  .attr("x",20 + 40 -13.5)
  .attr("y",15+25)
  .style("font", "6px times")
  .style("font", "6px HelveticaNeue-Light")
  .on("click", function(d) {
      myupdate(list_data[0])
  })
  .on("mouseover", function(){
        console.log('the mouseover worked!')
        buttonPrevious.attr("fill", '#0B1A39');
        buttonPrevious_Text.style("fill",'white');
  })
  .on("mouseout", function(){
        console.log('the mouseover worked!')
        buttonPrevious.attr("fill", 'transparent');
        buttonPrevious_Text.style("fill",'#0B1A39');
  });




//Database



        let list_data = [{
        name : 'Gladys \n Barrera',
        race : 'white',
        date:"2018/01/14",
        age:45,
        path: "M863.6,458l-4.8,0.8l-8.4,1.1l-8.6,0.9v2.2l0.2,2.1l0.6,3.4l3.4,7.9l2.4,9.9l1.5,6.1l1.6,4.8l1.5,7l2.1,6.3l2.6,3.4l0.5,3.4l1.9,0.8l0.2,2.1l-1.8,4.8l-0.5,3.2l-0.2,1.9l1.6,4.4l0.3,5.3l-0.8,2.4l0.6,0.8l1.5,0.8l0.6,3.4l2.6,3.9   l1.5,1.5l7.9,0.2l10.8-0.6l21.5-1.3l5.4-0.7l4.6,0l0.2,2.9l2.6,0.8l0.3-4.4l-1.6-4.5l1.1-1.6l5.8,0.8l5,0.3l-0.8-6.3l2.3-10   l1.5-4.2l-0.5-2.6l3.3-6.2l-0.5-1.4l-1.9,0.7l-2.6-1.3l-0.6-2.1l-1.3-3.6l-2.3-2.1l-2.6-0.6l-1.6-4.8l-2.9-6.3l-4.2-1.9l-2.1-1.9   l-1.3-2.6l-2.1-1.9l-2.3-1.3l-2.3-2.9l-3.1-2.3l-4.5-1.8l-0.5-1.5l-2.4-2.9l-0.5-1.5l-3.4-4.9l-3.4,0.2l-4.1-3l-1.3-1.3l-0.3-1.8   l0.8-1.9l2.4-1.2l-1.1-1.2l0.1-0.3l-5.8,1l-7,0.8L863.6,458z"},
        {
        name : 'Silvia Theresis',
        race : 'white',
        date:"2018/04/14",
        age:16,
        path: "M863.6,458l-4.8,0.8l-8.4,1.1l-8.6,0.9v2.2l-3.4-4.9l-3.4,0.2l-4.1-3l-1.3-1.3l-0.3-1.8   l0.8-1.9l2.4-1.2l-1.1-1.2l0.1-0.3l-5.8,1l-7,0.8L863.6,458z"}];


        // call the update to change data
        var index = 0;
        myupdate(list_data[index])
