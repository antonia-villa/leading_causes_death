# Playing Dead
https://antonia-villa.github.io/playing_dead/

Delve into open source government data through an interactive application that explores the leading causes of death by cause, state, and year from 1999 through 2014.

There's a catch - in order to view more granular data sets you must guess the correct overall distribution by cause!

![](/img/Project1_img2.png)
![](/img/Project1_img3.png)
![](/img/Project1_img4.png) 

## Requirements
* Access open source data through API
* Reformat and cleanse open source JSON Data
* Use appropriate data visuals to create narrative 
* Learn and implement visualizations using D3
* Add user interactions using d3
* Deploy visual, where the rest of the world can access it

## Technologies Used
* D3
* CSS Framework: Bootstrap
* ToastR

## Development Sprints and Process

### Sprint 1
##### Brainstorm and solidify idea
##### 1. Identify the data source with granularity available for multiple visuals 
##### 2. Write data parsing functions to create sub data sets
##### 3. Clensed the data to remove outliers

### Sprint 2
#### Learn and explore D3
##### 1. Practice creating visual from data totals to learn D3
##### 2. Analyze data to develope appropriate visual narrative
##### 3. Decided upon 3 tiered approach and reformatted the data to contain 3 attributes for each data point
##### 4. Created overall visual to view data at highest level
##### 5. Added Game aspect for the user to interact with the data in order to gain more insight
##### 6. Created second level data visual using the users's input to filter data set
##### 7. Created final visual to view data at the most granular level upon click

### Sprint 3
#### Userflow and Styling
##### 1.Created internal navigation to allow the user move through the each level of the data freely and view multiple inputs
##### 2.Formatted visuals to adjust the scale for the data
##### 3.Added landing page to introduce data source and project
##### 4. Deploy

## Issues Encounter throughout the Approach
* Parsing JSON data into smaller data sets based on click events
* Learning to use D3 library and understanding all of the syntax
* Adding event listeners to SVG objects
* Modals logging data and saving data in storage 


## Unsolved Problems
* Tooltips not displaying data 
* 

## Backlog
* Learning more indepth D3 for better styling
* Adding more information to the tooltips
* Creating more visually appealing data visualizations
* Transitioning the program to accept multiple different data sources from APIs

## Sources
* Open Source Data: https://catalog.data.gov/dataset/age-adjusted-death-rates-for-the-top-10-leading-causes-of-death-united-states-2013