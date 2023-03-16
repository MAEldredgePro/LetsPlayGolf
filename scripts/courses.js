/////////////
// Globals //
/////////////
const CLS_COURSE_INFO = 'course-info';
const CLS_SEL_COURSE_INFO = `.${CLS_COURSE_INFO}`;

const COURSE_LIST_URL =
    'https://maeldredgepro.github.io/LetsPlayGolf/data/courses.json';

function courseDataURL(courseID) {
    return 'https://maeldredgepro.github.io/LetsPlayGolf/data/course'
        + courseID
        + '.txt';
}

window.onload = fetchCourseList;

class TeeBoxInfo {
    static datumLabels = [
        'Yards',
        'Par',
        'HCP',
    ];

    constructor(teeBoxData) {
        this.hole = teeBoxData.hole;
        this.yards = teeBoxData.yards;
        this.par = teeBoxData.par;
        this.hcp = teeBoxData.hcp;
        this.teeType = teeBoxData.teeType;
    }

    GetDatum(selector) {
        switch (selector) {
            case 0: return (this.yards);
            case 1: return (this.par);
            case 2: return (this.hcp);
            default: return null;
        }
    }
}

//////////////////////////
// Function Definitions //
//////////////////////////
function fetchCourseList() {
    // launch a promise to fetch the course list.  When complete, it will
    // call back a function to render the course selection page.
    fetch(COURSE_LIST_URL)
        .then(response => response.json())
        .then(courseList => renderCourseSelectionPage(courseList));
}

function renderCourseSelectionPage(courses) {
    const courseSelect = newElement('select');

    // Add a 'prompt' option which can't be selected,
    // but will prompt the user to make a course selection.
    const promptOption = newElement('option');
    promptOption.selected = true;
    promptOption.disabled = true;
    promptOption.innerHTML = 'Select a course:';
    courseSelect.appendChild(promptOption);

    // Add the available course options.
    courses.forEach(course => {
        const courseOption = newElement('option');
        courseOption.setAttribute('id', course.id);
        courseOption.innerHTML = course.name;
        courseSelect.appendChild(courseOption);
    })

    // Finished creating the course select dropdown.
    // Add its event listener and add it to the page.
    courseSelect.addEventListener('change', handleChangeCourseSelect);
    document.body.appendChild(courseSelect);
}

function handleChangeCourseSelect(event) {
    const courseSelect = event.target;
    const courseID = courseSelect[courseSelect.selectedIndex].id;
    fetchCourseInfo(courseID);
    // The fetch registers a callback that will render the course info.
}

function fetchCourseInfo(courseID) {
    fetch(courseDataURL(courseID))
        .then(response => response.json())
        .then(courseData => renderCourseData(courseData.data.holes));
}

function renderCourseData(holesData) {
    // console.log(`holesData.length: ${holesData.length}`);

    // Iterate the holes 1-18. This is a column-wise iteration which does
    // not lend itself well to creating HTML as-you-go (which is row-wise)
    // so we have to build something in-memory that we can traverse row-wise.
    const infoGrid = generateInfoGrid(holesData);

    const teeTypes = [];
    holesData[0].teeBoxes.forEach(teeBox => {
        teeTypes.push(teeBox.teeType);
    })

    ////////////////////////////////
    // Assemble the tee box info. //
    ////////////////////////////////

    // Create the course info table.
    const courseInfoTable = createCourseInfoTable();

    // Create and add the table header row.
    tableHeaderRow = createCourseInfoTableHeaderRow(holesData.length);
    courseInfoTable.appendChild(tableHeaderRow);

    // Turn the infoGrid on its side and iterate the data.
    const numRows = infoGrid[0].length;
    for (let j = 0; j < numRows; ++j) {
        const tableRow = newElement('tr');

        const teeBoxNumData = TeeBoxInfo.datumLabels.length;
        const teeBoxDatumSelector = j % teeBoxNumData;

        if (0 == teeBoxDatumSelector) {
            const teeType = teeTypes[Math.floor(j / teeBoxNumData)];

            const teeTypeTableDatum = newElement('td');
            teeTypeTableDatum.setAttribute('rowspan', teeBoxNumData);
            teeTypeTableDatum.innerHTML = teeType;
            tableRow.appendChild(teeTypeTableDatum);
        }

        const rowLabelTableDatum = newElement('td');
        rowLabelTableDatum.innerHTML = TeeBoxInfo.datumLabels[teeBoxDatumSelector];
        tableRow.appendChild(rowLabelTableDatum);

        const numColumns = infoGrid.length;
        for (let i = 0; i < numColumns; ++i) {
            const tableDatum = newElement('td');
            tableDatum.innerHTML = infoGrid[i][j];

            tableRow.appendChild(tableDatum);
        }

        courseInfoTable.appendChild(tableRow);
    }

    // Drop in the new course info table.
    installCourseInfoTable(courseInfoTable);
}

function generateInfoGrid(holesData) {
    const infoGrid = [];

    holesData.forEach((holeData, holeIndex) => {
        // Iterate the tee box data for this hole.  Each tee box constitutes
        // a row group, since there are multiple data points we are interested
        // in per tee box.
        holeData.teeBoxes.forEach((teeBoxData, teeBoxIndex) => {
            const teeBoxInfo = new TeeBoxInfo(teeBoxData);
            // Iterate through the data points in the tee box we are interested in
            TeeBoxInfo.datumLabels.forEach((datumLabel, datumSelector) => {
                const colNumber = holeIndex;

                // Add another column if we need to
                if (infoGrid.length <= colNumber) {
                    infoGrid.push([]);
                }

                // create the datum
                const tableDatum = teeBoxInfo.GetDatum(datumSelector);
                infoGrid[colNumber].push(tableDatum);
            })
        })
    })

    return infoGrid;
}

function createCourseInfoTable() {
    return newElement('table', CLS_COURSE_INFO);
}

function installCourseInfoTable(newCourseInfoTable) {
    // remove the old course info table
    const oldCourseInfoTable = document.querySelector(CLS_SEL_COURSE_INFO);
    if (oldCourseInfoTable) {
        oldCourseInfoTable.remove();
    }

    if (newCourseInfoTable) {
        document.body.appendChild(newCourseInfoTable);
    }
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
