# PROJECT 1
# DATA SOURCE:
https://catalog.data.gov/dataset/age-adjusted-death-rates-for-the-top-10-leading-causes-of-death-united-states-2013

# Technical Requirements
- Load JSON Data from API
- Tell data narrative 
- Create Visual using D3 Library
- Add interactions using d3
- Create Back Button or RESET to refresh data pages
- Use Javascript or JQuery for DOM manipulation
- Deploy visual, where the rest of the world can access it
- Use semantic markup for HTML and CSS (adhere to best practices)

# Technologies Used
- jQUERY
- D3
- Bootstrap
- ToastR

# Approach Taken
- Started with identifying the appropriate data source
- Practiced parsing data into different formats for visuals
- Clensed the data to remove outliers
- Created first visual from totals to learn D3
- Analyized data to rethink the narrative the visuals should tell
- Decided upon 3 tiered approach and reformatted the data to contain 3 attributes for each data point
- Created sub-data sets
- Created overall visual to view data at highest level
- Added Game aspect for the user to interact with the data in order to gain more insight
- Created second level data visual using the users's input to filter data set
- Created final visual to view data at the most granular level upon click
- Added back button to allow the user move through the data visual freely and view multiple inputs
- Formatted visuals to adjust the scale for the data

# Issues Encounter throughout the Approach
- Parsing JSON data into smaller data sets based on click events
- Learning to use D3 library and understanding all of the syntax
- Adding event listeners to SVG objects
- Creating consistency using jQUERY consistently and removing vanilla javascript
- Modals logging data and saving user interactions 

# Fun Stuff
- Brainstorming a narrative for the data
- Learning D3
- Styling the data visuals
- Creating data sets based on click actions


# Unsolved Problems
Tooltips are not displaying data

# Next Steps
- Learning more indepth D3
- Adding more information to the tooltips
- Creating more visually appealing data visualizations
- Transitioning the program to accept multiple different data sources from APIs