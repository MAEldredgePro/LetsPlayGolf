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
        // .then(courses => renderCourseDropdown(courses));
        .then(courses => renderPage(courses));
}

function renderPage(courses) {

    renderCourseDropdown(courses);
    // renderNextButton();
}

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

function renderCourseInfo(courseInfoIn) {
    class TeeBoxOut {
        constructor(yards, par, handicap) {
            this.yards = yards;
            this.par = par;
            this.handicap = handicap;
        }
    }

    // console.log(courseInfo.data.holes);
    const holesInfoIn = courseInfoIn.data.holes;

    // initialize the tee box row groups
    console.log(holesInfoIn[0].teeBoxes.length);
    const teeBoxRowsOut = [];
    holesInfoIn[0].teeBoxes.forEach(teeBoxIn => {
        teeBoxRowsOut.push([]);
    })

    holesInfoIn.forEach(holeInfoIn => {
        holeInfoIn.teeBoxes.forEach((teeBoxIn, index) => {
            const teeBoxOut = new TeeBoxOut(teeBoxIn.yards, teeBoxIn.par, teeBoxIn.hcp);
            teeBoxRowsOut[index].push(teeBoxOut);
        })
    });

    console.log(teeBoxRowsOut);

    // acquire or create the table for the course info
    const courseInfoTable = document.querySelector('table') || newElement('table', 'courseInfo');
    courseInfoTable.innerHTML = '';

    // render the table header row with the hole numbers
    tableHeaderRow = newElement('tr');
    holesInfoIn.forEach((holeInfoIn, index) => {
        const tableHeaderData = newElement('th');
        tableHeaderData.innerHTML = holeInfoIn.hole;
        tableHeaderRow.appendChild(tableHeaderData);
    })

    courseInfoTable.appendChild(tableHeaderRow);

    // render the tee box info
    teeBoxRowsOut.forEach(teeBoxRowOut => {
        const tableRow = newElement('tr');
        courseInfoTable.appendChild(tableRow);

        teeBoxRowOut.forEach(teeBoxOut => {
            const tableData = newElement('td');
            tableData.innerHTML = teeBoxOut.yards;
            tableRow.appendChild(tableData);
        })
    })

    // Add the completed table to the page body.
    document.body.appendChild(courseInfoTable);
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
