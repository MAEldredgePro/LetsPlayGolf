/////////////
// Globals //
/////////////
const CLS_COURSE_INFO = 'course-info';
const CLS_SEL_COURSE_INFO = `.${CLS_COURSE_INFO}`;

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
    removeCourseInfoTable();
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
        static rowLabels = [
            'Yards',
            'Par',
            'HCP',
        ];

        constructor(teeBoxIn) {
            this.hole = teeBoxIn.hole;
            this.yards = teeBoxIn.yards;
            this.par = teeBoxIn.par;
            this.hcp = teeBoxIn.hcp;
            this.teeType = teeBoxIn.teeType;
        }

        GetData(selector) {
            switch (selector) {
                case 0: return (this.yards);
                case 1: return (this.par);
                case 2: return (this.hcp);
                default: return null;
            }
        }
    }

    // console.log(`courseInfoIn num holes: ${courseInfoIn.data.holes.length}`);
    const holesInfoIn = courseInfoIn.data.holes;

    // initialize the tee box row groups
    console.log(`holesInfoIn[0].teeBoxes.length: ${holesInfoIn[0].teeBoxes.length}`);
    const teeBoxRowGroupsOut = [];
    holesInfoIn[0].teeBoxes.forEach(teeBoxIn => {
        teeBoxRowGroupsOut.push([]);
    })

    let teeBoxCount = 0;

    holesInfoIn.forEach(holeInfoIn => {
        holeInfoIn.teeBoxes.forEach((teeBoxIn, index) => {
            const teeBoxOut = new TeeBoxOut(teeBoxIn);
            teeBoxRowGroupsOut[index].push(teeBoxOut);
            ++teeBoxCount;
        })
    });

    console.log(`teeBoxRowGroupsOut.length: ${teeBoxRowGroupsOut.length}`);
    console.log(`teeBoxRowGroupsOut[0]: ${teeBoxRowGroupsOut[0]}`);
    console.log(`teeBoxRowGroupsOut[0].length: ${teeBoxRowGroupsOut[0].length}`);
    console.log(`teeBoxRowGroupsOut[0][0]: ${teeBoxRowGroupsOut[0][0]}`);
    console.log(`teeBoxCount: ${teeBoxCount}`);

    // Remove the course info table.
    removeCourseInfoTable();

    /////////////////////////////
    // render the tee box info //
    /////////////////////////////

    // Create an array of empty row objects that we will fill out later
    const tableDataRows = [];
    teeBoxRowGroupsOut.forEach(teeBoxRowGroupOut => {
        TeeBoxOut.rowLabels.forEach(rowLabel => {
            tableDataRows.push(newElement('tr'));
        })
    })

    // render the tee box rows
    teeBoxRowGroupsOut.forEach((teeBoxRowGroupOut, index) => {
        if (index === 0) {
            // add the tee type label
            const tableRowLabel = newElement('td');
            tableRowLabel.setAttribute('rowspan', '3');
            tableDataRows[index].appendChild(tableRowLabel);
            tableRowLabel.innerHTML = 'teeType';
            console.log(index);
        }

        // Render the label
        const tableRowLabel = newElement('td');
        // tableRow.appendChild(tableRowLabel);
        // tableRowLabel.innerHTML = TeeBoxOut.GetDataLabel(index);

        teeBoxRowGroupOut.forEach(teeBoxOut => {
            const tableData = newElement('td');
            tableData.innerHTML = teeBoxOut.GetData(index);
            // tableRow.appendChild(tableData);
        })
    })

    // Create the table header row.
    tableHeaderRow = createCourseInfoTableHeaderRow(holesInfoIn.length);

    const courseInfoTable = acquireCourseInfoTable();

    // Assemble the table;
    courseInfoTable.appendChild(tableHeaderRow);

    // Add the completed table to the page body.
    document.body.appendChild(courseInfoTable);
}

function acquireCourseInfoTable(create = true) {
    const courseInfoTable = document.querySelector(CLS_SEL_COURSE_INFO) ||
        create ? newElement('table', CLS_COURSE_INFO) : null;

    if (courseInfoTable && create) {
        document.body.appendChild(courseInfoTable);
    }

    return courseInfoTable;
}

function removeCourseInfoTable() {
    const courseInfoTable = document.querySelector(CLS_SEL_COURSE_INFO);
    if (courseInfoTable) {
        courseInfoTable.remove();
    }

    //
    // This doesn't work. Probably because of something to do with
    // references idk.
    //
    // const courseInfoTable = acquireCourseInfoTable(false);
    // if (courseInfoTable) {
    //     courseInfoTable.remove();
    //     // document.body.removeChild(courseInfoTable) :
    // }
}

function createCourseInfoTableHeaderRow(numHoles) {
    const tableHeaderRow = newElement('tr');

    // Add the label 'Hole' to the table header row.
    let tableRowLabel = newElement('th');
    tableHeaderRow.appendChild(tableRowLabel);
    tableRowLabel.innerHTML = 'Hole';

    // Add a blank cell to the header row bc the table rows have labels in this
    // column.
    tableRowLabel = newElement('th');
    tableHeaderRow.appendChild(tableRowLabel);

    for (let holeNum = 1; holeNum <= numHoles; ++holeNum) {
        const tableHeaderData = newElement('th');
        tableHeaderData.innerHTML = holeNum;
        tableHeaderRow.appendChild(tableHeaderData);
    }

    return tableHeaderRow;
}

function getTeeBoxYards(teeBoxOut) { return teeBoxOut.yards }

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
