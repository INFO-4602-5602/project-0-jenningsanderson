Anscombe's Quartet
==================

Jennings Anderson - February 15, 2017

Collaborators: Melissa Bica

#### Design & Execution

1. When the page loads, parts 2 - 4 are populated by one of the four datasets, chosen at random. The currently loaded set is reflected in the dropdown for part 3 & 4.

1. Changing the dataset in the dropdown menu will also change the data for part 2.

1. I fixed the ranges on the small multiples in part 5 so that each of them are on the same scales. I also adjusted for the regression lines so that the lines match up across each graphic (length-wise).

1. Layout and colors don't really have a larger theme, just went with the classic d3 _steelblue_.

#### External Sources & D3

There are a handful of links to bl.ocks.org and other sites commented in the code to credit external sources of code snippets.

Most of my code is in `/js` directory in an attempt to keep things organized.

D3 certainly has an impressive learning curve. I have used it a handful of times before...most of this use limited to copy and pasting from bl.ocks.org. It is starting to make more sense, however, once I step back and view it as a framework for manipulating the DOM (similar to JQuery), and not some magical viz application.

These visualizations are certainly not the most efficient as they load the CSV files multiple times and do not
rely on more intelligent d3 plugins such as [_d3.dispatch_](https://bl.ocks.org/mbostock/5872848) for coordinated views. I tried loading the CSV files only once, but it made modularity very difficult in the code and I found myself three or four levels deep in [_callback hell_](http://callbackhell.com/).
