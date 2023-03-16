/////////////
// Globals //
/////////////
const COURSES_URL =
    'https://maeldredgepro.github.io/LetsPlayGolf/data/courses.json';

function courseInfoURL(courseID) {
    return 'https://maeldredgepro.github.io/LetsPlayGolf/data/course'
        + courseID
        + '.txt';
}

window.onload = fetchCourses;

//////////////////////////
// Function Definitions //
//////////////////////////
function fetchCourses() {
    // launch a promise to fetch the course list.  When complete, it will
    // call back a function to render the course picker.
    fetch(COURSES_URL)
        .then(response => response.json())
        .then(courses => renderCourseDropdown(courses));
    // .then(courses => renderPage(courses));
}

// function renderPage(courses) {
//     renderCourseDropdown(courses);
//     // renderNextButton();
// }

function renderCourseDropdown(courses) {
    const dropdown = document.createElement('select');
    dropdown.addEventListener('change', handleChangeDropdown);

    // add a 'prompt' choice which can't be selected
    const promptElement = document.createElement('option');
    promptElement.innerHTML = 'Select a course:';
    promptElement.disabled = true;
    promptElement.selected = true;
    dropdown.appendChild(promptElement);

    // add the course choices
    courses.forEach(course => {
        const courseElement = document.createElement('option');
        courseElement.setAttribute('id', course.id);
        courseElement.innerHTML = course.name;
        dropdown.appendChild(courseElement);
    })

    // Finished creating the dropdown.  Add it to the page.
    document.body.appendChild(dropdown);
}

// function renderNextButton() {
//     // Add the Next button
//     const button = document.createElement('button');
//     button.id = 'nextButton';
//     button.onclick = handleClickButton;
//     button.disabled = true;
//     button.innerHTML = 'Next';

//     // Finished creating the Next button.  Add it to the page.
//     document.body.appendChild(button);
// }

function handleChangeDropdown(event) {
    const elDropdown = event.target;
    const courseID = elDropdown[elDropdown.selectedIndex].id;
    fetchCourseInfo(courseID);
}

function fetchCourseInfo(courseID) {
    fetch(courseInfoURL(courseID))
        .then(response => response.json())
        .then(courseInfo => renderCourseInfo(courseInfo));
}

function renderCourseInfo(courseInfo) {
    // create the container div for the course info
    const courseInfoTable = newElement('table', 'courseInfo');
    document.body.appendChild(courseInfoTable);

    // Create the table data as an array of columns.
    // We will populate the table array data by column because that's the
    //  way the data is supplied.
    // We will then traverse the table data by row because that's the way the
    // html likes to be written.

    const tableData = [];

    // console.log(courseInfo.data.holes);
    const holesInfo = courseInfo.data.holes;
    holesInfo.forEach(holeInfo => {
        // populate the column
        // const holeInfoDiv = newElement();
        // courseInfoDiv.appendChild(holeInfoDiv);
        // holeInfoDiv.innerHTML = holeInfo.hole;

        const column = [];
        tableData.push(column);

        // add all the row items to the column
        column.push(holeInfo.hole);
        // ...

        // console.log(holeInfo.hole)
    });


}

function newElement(tag, classAttr = null) {
    const element = document.createElement(tag);

    if (classAttr) {
        element.setAttribute('class', classAttr);
    }

    return element;
}

// function handleChangeDropdown() {
//     document.getElementById('nextButton').disabled = false;
// }

// function handleClickButton() {
//     const elDropdown = document.querySelector('select');
//     const courseID = elDropdown.options[elDropdown.selectedIndex].id;
//     const urlTarget = `scorecard.html?courseID=${courseID}`;
//     window.location.href = urlTarget;
// }
