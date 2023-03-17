/////////////
// Globals //
/////////////
const CLS_HEADER = 'header';
const CLS_CTRL_ROW = 'control-row';
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
    promptOption.innerText = 'Select a course:';
    courseSelect.appendChild(promptOption);

    // Add the available course options.
    courses.forEach(course => {
        const courseOption = newElement('option');
        courseOption.setAttribute('id', course.id);
        courseOption.innerText = course.name;
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
    playerList.length = 0;
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

    ////////////////////////////////////
    // Assemble the course info table //
    ////////////////////////////////////

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
        let classAttrValue;

        if (0 == teeBoxDatumSelector) {
            const teeType = teeTypes[Math.floor(j / teeBoxNumData)];
            // console.log(`teeType: ${teeType}`);
            classAttrValue = teeType;

            const teeTypeTableDatum = newElement('td');
            teeTypeTableDatum.setAttribute('rowspan', teeBoxNumData);
            const teeTypeSelectButton = newElement('button');
            teeTypeSelectButton.innerText = teeType;
            // teeTypeSelectButton.classAttr = 'teeTypeSelectButton';
            teeTypeSelectButton.addEventListener('click', handleClickTeeTypeButton)
            teeTypeTableDatum.appendChild(teeTypeSelectButton);
            tableRow.appendChild(teeTypeTableDatum);
        }

        const rowLabelTableDatum = newElement('td');
        rowLabelTableDatum.innerText = TeeBoxInfo.datumLabels[teeBoxDatumSelector];
        tableRow.appendChild(rowLabelTableDatum);

        const numColumns = infoGrid.length;
        for (let i = 0; i < numColumns; ++i) {
            const tableDatum = newElement('td');
            tableDatum.innerText = infoGrid[i][j];

            tableRow.appendChild(tableDatum);
        }

        tableRow.setAttribute('class', classAttrValue);

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

function createCourseInfoTableHeaderRow(numHoles) {
    const tableHeaderRow = newElement('tr', CLS_HEADER);

    // Add the label 'Tee' to the table header row.
    let tableRowLabel = newElement('th');
    tableHeaderRow.appendChild(tableRowLabel);
    tableRowLabel.innerText = 'Tee';

    // Add the label 'Hole' to the table header row.
    tableRowLabel = newElement('th');
    tableRowLabel.innerText = 'Hole';
    tableHeaderRow.appendChild(tableRowLabel);

    for (let holeNum = 1; holeNum <= numHoles; ++holeNum) {
        const tableHeaderData = newElement('th');
        tableHeaderData.innerText = holeNum;
        tableHeaderRow.appendChild(tableHeaderData);
    }

    return tableHeaderRow;
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

function handleClickTeeTypeButton(event) {
    const selectedTeeType = event.target.innerText;
    console.log(`'${selectedTeeType}' button clicked`);

    // Get the course info table.
    const courseInfoTable = document.querySelector(CLS_SEL_COURSE_INFO);

    // Hide all of the rows except the ones belonging to the selected tee type.
    let curClassName = '';
    for (row of courseInfoTable.rows) {
        if (row.className != 'undefined') {
            curClassName = row.className
        }

        // Leave the header row and the selected tee rows alone.
        if (curClassName === CLS_HEADER) { continue; }
        if (curClassName === selectedTeeType) { continue; }

        // Hide the rows we don't care about.
        row.style.display = 'none';
    }

    // Add the control buttons.
    appendControlButtons(courseInfoTable);
}

function appendControlButtons(courseInfoTable) {
    if (playerList.length < 4) {
        appendAddPlayerButton(courseInfoTable);
    }

    if (playerList.length > 0) {
        appendPlayButton(courseInfoTable);
    }
}

function appendAddPlayerButton(courseInfoTable) {
    // Create a row and cell for the user to click on to add a player.
    const addPlayerButton = newElement('button');
    addPlayerButton.innerText = 'Add a player';
    addPlayerButton.addEventListener('click', handleClickAddPlayerButton);
    const addPlayerCell = newElement('td');
    addPlayerCell.appendChild(addPlayerButton);
    const addPlayerRow = newElement('tr', CLS_CTRL_ROW);
    addPlayerRow.appendChild(addPlayerCell);
    courseInfoTable.appendChild(addPlayerRow);
}

const playerList = [];
function handleClickAddPlayerButton(event) {
    const newPlayer = prompt('Add a player');

    // Reject the player if they have already been added.
    playerList.forEach(player => {
        if (newPlayer.toLowerCase() === player.toLowerCase()) {
            alert(`${player} has already been added`);
            return;
        }
    })

    // Add the player to our internal player list.
    playerList.push(newPlayer);

    // Get the course info table.
    const courseInfoTable = document.querySelector(CLS_SEL_COURSE_INFO);

    // Remove the control buttons
    removeControlButtons(courseInfoTable);

    // Add the new player.
    const newPlayerCell = newElement('td');
    newPlayerCell.innerText = newPlayer;
    const newPlayerRow = newElement('tr');
    newPlayerRow.appendChild(newPlayerCell);
    courseInfoTable.appendChild(newPlayerRow);

    // Re-add the control buttons.
    appendControlButtons(courseInfoTable);
}

function appendPlayButton(courseInfoTable) {
    // Create a row and cell for the user to click on to add a player.
    const playButton = newElement('button');
    playButton.innerText = 'Play Golf!';
    playButton.addEventListener('click', handleClickPlayButton);
    const playButtonCell = newElement('td');
    playButtonCell.appendChild(playButton);
    const playButtonRow = newElement('tr', CLS_CTRL_ROW);
    playButtonRow.appendChild(playButtonCell);
    courseInfoTable.appendChild(playButtonRow);
}

function handleClickPlayButton() {
    alert("Let's Play Golf!");
}

function removeControlButtons(courseInfoTable) {
    while (courseInfoTable.lastChild.className === CLS_CTRL_ROW) {
        courseInfoTable.lastChild.remove();
    }
}

function newElement(tag, classAttrValue = null) {
    const element = document.createElement(tag);

    if (classAttrValue) {
        element.setAttribute('class', classAttrValue);
    }

    return element;
}
