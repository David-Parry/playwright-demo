## Create playwright tests scenario 1 happy path
1. open url  http://localhost:8040/ 
2. wait for page to load
3. click the button labeled 'Today's Weather' 
4. wait for a window popup
5. enter NYC in the text box in the popup
6. click the button labeled 'Save Location'
7. wait for a new page to load
7. assert the new page has a path /weather indicating weather page
8. check for NYC text on the webpage 
9. assert that there is a Today weather forecast displayed 
10. produce the playwright test in javascript when the steps 1 - 9 are valid


## Create playwright tests scenario 2 error path
1. open url  http://localhost:8040/ 
2. wait for page to load
3. click the button labeled 'Today's Weather' 
4. wait for a window popup
5. do not enter a location in the text box
5. click the button labeled 'Save Location'
6. assert a popup that has text saying 'Invalid Location!'
7. produce the playwright test in javascript when the steps 1 - 6 are valid
