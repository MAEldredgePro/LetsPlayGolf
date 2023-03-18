//#region Constants
//------------------//
// Global Constants //
//------------------//

// const ATTR_*
//#region Attribute Names
const ATTR_CLASS = 'class';
const ATTR_COLSPAN = 'colspan';
const ATTR_ID = 'id';
const ATTR_ROWSPAN = 'rowspan';
//#endregion

// const BTN_LBL_*
//#region Button Labels
const BTN_LBL_ADD_PLAYER = 'Add a player';
const BTN_LBL_PLAY_GOLF = 'Play Golf!';
//#endregion

// const CLS_*
//#region Class Names
const CLS_TEETYPE_CELL = 'teetype-cell';
const CLS_COURSE_INFO = 'course-info';
const CLS_CTRL_ROW = 'control-row';
const CLS_HEADER = 'header';
const CLS_SEL_COURSE_INFO = `.${CLS_COURSE_INFO}`;
//#endregion

// const COURSE_*
//#region Course URLs
const COURSE_LIST_URL =
    'https://maeldredgepro.github.io/LetsPlayGolf/data/courses.json';

// This function is in the Constants section because is more like a macro.
function COURSE_DATA_URL(courseID) {
    return 'https://maeldredgepro.github.io/LetsPlayGolf/data/course'
        + courseID
        + '.txt';
}
//#endregion

// const EL_*
//#region Element Names
const EL_BUTTON = 'button';
const EL_OPTION = 'option';
const EL_SELECT = 'select';
const EL_TABLE = 'table';
const EL_TD = 'td';
const EL_TH = 'th';
const EL_TR = 'tr';
//#endregion

// const EV_
//#region Event Names
const EV_CHANGE = 'change';
const EV_CLICK = 'click';
//#endregion

// const LBL_*
//#region Labels
const LBL_HOLE = 'Hole';
const LBL_IN = 'In';
const LBL_OUT = 'Out';
const LBL_TEES = 'Tees';
const LBL_TOTAL = 'Total'
const LBL_YARDS = 'Yards';
const LBL_PAR = 'Par';
const LBL_HCP = 'HCP';
//#endregion

//#region Misc Constants
const OPT_SELECT_COURSE = 'Select a course:';
const PR_GET_STROKE_COUNT = 'How many strokes?';
const VAL_AUX_COLS = 3; // 'Out', 'In' and 'Total' columns
const VAL_NUM_HOLES = 18;
const VAL_OUT_COLNUM = 9;
const VAL_IN_COLNUM = 19;
const VAL_TOT_COLNUM = 20;
const VAL_AUX_COLNUMS = [VAL_OUT_COLNUM, VAL_IN_COLNUM, VAL_TOT_COLNUM];
//#endregion

//#endregion Constants

//#region Global Data Types
//-------------------//
// Global Data Types //
//-------------------//
class ElementFactory {
    static newButton(innerText = null, classAttrValue = null) {
        return this.#newElement(EL_BUTTON, innerText, classAttrValue);
    }

    static newSelectOption(innerText) {
        return this.#newElement(EL_OPTION, innerText);
    }

    static newSelectDropdown(classAttrValue = null) {
        return this.#newElement(EL_SELECT, this.NO_INNER_TEXT, classAttrValue);
    }

    static newTable(classAttrValue = null) {
        return this.#newElement(EL_TABLE, this.NO_INNER_TEXT, classAttrValue);
    }

    static newTableDatumCell(innerText = null, classAttrValue = null) {
        return this.#newElement(EL_TD, innerText, classAttrValue);
    }

    static newTableHeaderCell(innerText = null, classAttrValue = null) {
        return this.#newElement(EL_TH, innerText, classAttrValue);
    }

    static newTableRow(classAttrValue = null) {
        return this.#newElement(EL_TR, this.NO_INNER_TEXT, classAttrValue);
    }

    static #_NO_INNER_TEXT = null;
    static get NO_INNER_TEXT() { return this.#_NO_INNER_TEXT; }

    static #newElement(tag, innerText, classAttrValue = null) {
        const element = document.createElement(tag);

        if (classAttrValue) {
            element.setAttribute(ATTR_CLASS, classAttrValue);
        }

        if (innerText) {
            element.innerText = innerText;
        }

        return element;
    }
}

class TeeBoxInfo {
    static datumLabels = [
        LBL_YARDS,
        LBL_PAR,
        LBL_HCP,
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
//#endregion Global Data Types

//#region Global Variables
//------------------//
// Global Variables //
//------------------//
var g_playModeActive = false;
const g_playerList = [];
//#endregion

//#region Global Executable Code
//-----------------------//
// Global Excutable Code //
//-----------------------//

// Code run when the script is loaded.  The only thing it does is register
// the (main-ish) function to be called once the html has finished loading.
window.onload = fetchCourseList;

//#endregion

//| Function Definitions |
//|======================|

function appendAddPlayerButton(courseInfoTable) {
    // Create a row and cell for the user to click on to add a player.
    const addPlayerButton = ElementFactory.newButton(BTN_LBL_ADD_PLAYER);
    addPlayerButton.addEventListener(EV_CLICK, handleClickAddPlayerButton);
    const addPlayerCell = ElementFactory.newTableDatumCell();
    addPlayerCell.appendChild(addPlayerButton);
    const addPlayerRow = ElementFactory.newTableRow(CLS_CTRL_ROW);
    addPlayerRow.appendChild(addPlayerCell);
    courseInfoTable.appendChild(addPlayerRow);
}

function appendControlButtons(courseInfoTable) {
    if (g_playerList.length < 4) {
        appendAddPlayerButton(courseInfoTable);
    }

    if (g_playerList.length > 0) {
        appendPlayButton(courseInfoTable);
    }
}

function appendPlayButton(courseInfoTable) {
    // Create a row and cell for the user to click on to add a player.
    const playButton = ElementFactory.newButton(BTN_LBL_PLAY_GOLF);
    playButton.addEventListener(EV_CLICK, handleClickPlayButton);
    const playButtonCell = ElementFactory.newTableDatumCell();
    playButtonCell.appendChild(playButton);
    const playButtonRow = ElementFactory.newTableRow(CLS_CTRL_ROW);
    playButtonRow.appendChild(playButtonCell);
    courseInfoTable.appendChild(playButtonRow);
}

// Add a cell to an existing table row with the given innerText as its content
function appendTableDatum(tableRow, innerText) {
    const tableDatum = ElementFactory.newTableDatumCell(innerText);
    tableRow.appendChild(tableDatum);
}

function createCourseInfoTable() {
    return ElementFactory.newTable(CLS_COURSE_INFO);
}

function createCourseInfoTableHeaderRow(numHoles) {
    const tableHeaderRow = ElementFactory.newTableRow(CLS_HEADER);

    // Add the 'Tee' column label to the table header row.
    let tableRowLabel = ElementFactory.newTableHeaderCell();
    tableHeaderRow.appendChild(tableRowLabel);

    // Add the 'Hole' column label to the table header row.
    tableRowLabel = ElementFactory.newTableHeaderCell(LBL_HOLE);
    tableHeaderRow.appendChild(tableRowLabel);

    // Add the hole numbers 1-9 as header cells for each hole's tee box info
    for (let holeNum = 1; holeNum <= (numHoles / 2); ++holeNum) {
        const tableHeaderDatum = ElementFactory.newTableHeaderCell(holeNum);
        tableHeaderRow.appendChild(tableHeaderDatum);
    }

    // Add the 'Out' subtotal column header
    {
        const tableHeaderDatum = ElementFactory.newTableHeaderCell(LBL_OUT);
        tableHeaderRow.appendChild(tableHeaderDatum);
    }

    // Add the hole numbers 10-18 as header cells for each hole's tee box info
    for (let holeNum = (numHoles / 2) + 1; holeNum <= numHoles; ++holeNum) {
        const tableHeaderDatum = ElementFactory.newTableHeaderCell(holeNum);
        tableHeaderRow.appendChild(tableHeaderDatum);
    }

    // Add the 'In' subtotal column header
    {
        const tableHeaderDatum = ElementFactory.newTableHeaderCell(LBL_IN);
        tableHeaderRow.appendChild(tableHeaderDatum);
    }

    // Add the 'Total' column label to the end of the table header row.
    tableRowLabel = ElementFactory.newTableHeaderCell(LBL_TOTAL);
    tableHeaderRow.appendChild(tableRowLabel);

    return tableHeaderRow;
}

function createTeeTypeCell(rowTeeType, numDataRowsPerTeeType) {
    // Create the tee type select button for the user
    const buttonLabel = `Play\n'${rowTeeType}'\ntees`;

    const teeTypeSelectButton = ElementFactory.newButton(buttonLabel);
    teeTypeSelectButton.addEventListener(EV_CLICK, handleClickTeeTypeButton)

    // Create the table data cell to hold the select button
    const teeTypeTableDatum =
        ElementFactory.newTableDatumCell(ElementFactory.NO_INNER_TEXT, CLS_TEETYPE_CELL);
    teeTypeTableDatum.setAttribute(ATTR_ROWSPAN, numDataRowsPerTeeType);

    // add the button to the cell
    teeTypeTableDatum.appendChild(teeTypeSelectButton);

    return teeTypeTableDatum;
}

function fetchCourseInfo(courseID) {
    fetch(COURSE_DATA_URL(courseID))
        .then(response => response.json())
        .then(courseData => updateCourseDataTable(courseData.data.holes));
}

function fetchCourseList() {
    // launch a promise to fetch the course list.  When complete, it will
    // call back a function to render the course selection page.
    fetch(COURSE_LIST_URL)
        .then(response => response.json())
        .then(courseList => renderCourseSelectionPage(courseList));
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

function handleChangeCourseSelect(event) {
    const courseSelect = event.target;
    const courseID = courseSelect[courseSelect.selectedIndex].id;
    g_playerList.length = 0;
    document.body.style.backgroundImage = `url('../images/${courseID}.jpg')`;
    fetchCourseInfo(courseID);
    // The fetch registers a callback that will render the course info.
}

function handleClickAddPlayerButton(event) {
    const newPlayer = prompt(BTN_LBL_ADD_PLAYER);

    // Reject the player if they have already been added.
    g_playerList.forEach(player => {
        if (newPlayer.toLowerCase() === player.toLowerCase()) {
            alert(`${player} has already been added`);
            return;
        }
    })

    // Add the player to our internal player list.
    g_playerList.push(newPlayer);

    // Get the course info table.
    const courseInfoTable = document.querySelector(CLS_SEL_COURSE_INFO);

    // Remove the control buttons
    removeControlButtons(courseInfoTable);

    // Add the new player.
    const newPlayerCell = ElementFactory.newTableDatumCell(newPlayer);
    newPlayerCell.setAttribute(ATTR_COLSPAN, 2);
    newPlayerCell.style.textAlign = 'center';
    const newPlayerRow = ElementFactory.newTableRow();
    newPlayerRow.appendChild(newPlayerCell);

    // Add the empty score and total score cells.  Only install a click handler
    // on the user score cells.  The totals are computed automatically.
    const columnCount = VAL_NUM_HOLES + VAL_AUX_COLS;
    for (let col = 0; col < columnCount; ++col) {
        const scoreTableCell = ElementFactory.newTableDatumCell('0');

        if (!VAL_AUX_COLNUMS.includes(col)) {
            scoreTableCell.addEventListener(EV_CLICK, handleClickAddStrokes);
        }

        newPlayerRow.appendChild(scoreTableCell);
    }

    courseInfoTable.appendChild(newPlayerRow);

    // Re-add the control buttons.
    appendControlButtons(courseInfoTable);
}

function handleClickAddStrokes(event) {
    if (!g_playModeActive) { return; }
    const scoreCardCell = event.target;

    const strokes = prompt(PR_GET_STROKE_COUNT);

    //#region Validate Stroke Input
    // Make sure the answer is numeric.
    if (!isNumeric(strokes)) {
        alert("I didn't recognize that as a number.");
        return;
    }

    // Make sure the answer is positive
    if (strokes < 1) {
        alert("Oh come on, man!  Nobody is that good.");
        return;
    }

    // Make sure the number of strokes is a whole number
    if (Math.floor(strokes) != strokes) {
        alert("A fractional number of strokes?  Nope.");
        return;
    }
    //#endregion

    scoreCardCell.innerHTML = strokes;

    recomputeRowTotals(scoreCardCell.parentNode.cells);
}

function handleClickPlayButton() {
    const courseInfoTable = document.querySelector(CLS_SEL_COURSE_INFO);
    removeControlButtons(courseInfoTable);
    alert("Let's Play Golf!");
    g_playModeActive = true;
}

function handleClickTeeTypeButton(event) {
    const eventButton = event.target;
    const eventCell = eventButton.parentNode;
    const eventRow = eventCell.parentNode;
    const selectedTeeType = eventRow.className;
    // console.log(`'${selectedTeeType}' row button clicked`);

    // Get the course info table.
    const courseInfoTable = document.querySelector(CLS_SEL_COURSE_INFO);

    // Hide all of the rows except the ones belonging to the selected tee type.
    let curClassName = '';
    for (tableRow of courseInfoTable.rows) {
        if (tableRow.className != 'undefined') {
            curClassName = tableRow.className
        }

        // Leave the header row and the selected tee rows alone.
        if (curClassName === CLS_HEADER) { continue; }
        if (curClassName === selectedTeeType) {
            eventButton.remove();
            eventCell.innerText = `'${curClassName}'\ntees\nselected`;
            continue;
        }

        // Hide the rows we don't care about.
        tableRow.style.display = 'none';
    }

    // Add the control buttons.
    appendControlButtons(courseInfoTable);
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

function isNumeric(str) {
    // from https://stackoverflow.com/questions/175739/how-can-i-check-if-a-string-is-a-valid-number
    if (typeof str != "string") return false // we only process strings!
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

function recomputeRowTotals(cells) {
    const halfHoleCount = VAL_NUM_HOLES / 2;
    let gameTotal = 0;

    // compute the 'Out' total column value
    const outFirstColOffset = 1;
    let outTotalColOffset = outFirstColOffset + halfHoleCount;
    let outTotal = 0;

    for (let i = 0; i < halfHoleCount; i++) {
        const cellValue = parseInt(cells[outFirstColOffset + i].innerText);
        outTotal += cellValue;
    }
    cells[outTotalColOffset].innerText = outTotal;
    gameTotal += outTotal;

    // compute the 'In' total column value
    const inFirstColOffset = outTotalColOffset + 1;
    const inTotalColOffset = inFirstColOffset + halfHoleCount;
    let inTotal = 0;

    for (let i = 0; i < halfHoleCount; i++) {
        const cellValue = parseInt(cells[inFirstColOffset + i].innerText);
        console.log(cellValue);
        inTotal += cellValue;
    }
    cells[inTotalColOffset].innerText = inTotal;
    gameTotal += inTotal;

    const gameTotalColOffset = inTotalColOffset + 1;
    cells[gameTotalColOffset].innerText = (outTotal + inTotal);
}

function removeControlButtons(courseInfoTable) {
    while (courseInfoTable.lastChild.className === CLS_CTRL_ROW) {
        courseInfoTable.lastChild.remove();
    }
}

function renderCourseInfoTableRows(teeTypes, infoGrid) {
    // Iterate the holes 1-18. This is a column-wise iteration which does
    // not lend itself well to creating HTML as-you-go (which is row-wise)
    // so we have to build something in-memory that we can traverse row-wise.

    // initialize the row array we will be populating and returning
    const courseInfoTableRows = [];

    // Turn the infoGrid on its side and iterate the data.
    const numRows = infoGrid[0].length;
    const numDataRowsPerTeeType = TeeBoxInfo.datumLabels.length;
    for (let j = 0; j < numRows; ++j) {
        const tableRow = ElementFactory.newTableRow();

        const teeBoxDatumSelector = j % numDataRowsPerTeeType;
        const onFirstRowOfTeeTypeData = (teeBoxDatumSelector === 0);
        let rowTeeType;

        // The tee type button table cell spans multiple rows.
        // If we are at the first of a set of rows all of which
        // contain data for the current tee type, render the
        // tee type button cell (tee type table datum) which spans
        // all the rows containing data for this tee type.
        if (onFirstRowOfTeeTypeData) {
            const teeTypeSelector = j / numDataRowsPerTeeType;

            // Save the current tee type so we can set the class attribute for
            // all the rows containing the data associated with this tee type
            rowTeeType = teeTypes[teeTypeSelector];

            // create the table datum (td) that contains the tee type
            // selection button so the user can choose which tee type
            // (ex: pro, champion, men's, women's) they would like to use
            // for the game they are about to play.
            const teeTypeTableDatum =
                createTeeTypeCell(rowTeeType, numDataRowsPerTeeType);

            // add the cell to the row
            tableRow.appendChild(teeTypeTableDatum);
        }

        // Add the datum label ('Yards', 'Par', 'HCP') to the table row.
        const rowLabel = TeeBoxInfo.datumLabels[teeBoxDatumSelector];
        tableRow.appendChild(ElementFactory.newTableDatumCell(rowLabel));

        const numColumns = infoGrid.length;

        // Keep a running total for the 'Out', 'In', and 'Total' columns.
        let runningTotal = 0;

        // Iterate the first half of the columns and add their values
        // to the table.
        for (let i = 0; i < (numColumns / 2); ++i) {
            // Append the cell with the current info grid data
            appendTableDatum(tableRow, infoGrid[i][j]);

            // Keep a running total of the row values
            runningTotal += infoGrid[i][j];
        }

        // Halfway through iterating the columns, add the 'Out' half-game
        // total cell.
        const outRunningTotal = runningTotal;
        runningTotal = 0;
        appendTableDatum(tableRow, outRunningTotal);

        // Iterate the second half of the columns and add their values
        // to the table.
        for (let i = (numColumns / 2); i < numColumns; ++i) {
            // Append the cell with the current info grid data
            appendTableDatum(tableRow, infoGrid[i][j]);

            // Keep a running total of the row values
            runningTotal += infoGrid[i][j];
        }

        // Add the 'In' half-game total cell
        const inRunningTotal = runningTotal;
        appendTableDatum(tableRow, inRunningTotal);

        // Add the full-game 'Total' cell at the end of the row
        appendTableDatum(tableRow, outRunningTotal + inRunningTotal);

        // Set the row class attribute as the tee type so we can selectively
        // show/hide the rows associated with the tee type that the user
        // selects.
        tableRow.setAttribute(ATTR_CLASS, rowTeeType);

        // Add the row to the array of rows we will be returning
        courseInfoTableRows.push(tableRow);
    }

    // return the array of rows
    return courseInfoTableRows;
}

function renderCourseSelectionPage(courses) {
    const courseSelect = ElementFactory.newSelectDropdown();

    // Add a 'prompt' option which can't be selected,
    // but will prompt the user to make a course selection.
    const promptOption = ElementFactory.newSelectOption(OPT_SELECT_COURSE);
    promptOption.selected = true;
    promptOption.disabled = true;
    courseSelect.appendChild(promptOption);

    // Add the available course options.
    courses.forEach(course => {
        const courseOption = ElementFactory.newSelectOption(course.name);
        courseOption.setAttribute(ATTR_ID, course.id);
        courseSelect.appendChild(courseOption);
    })

    // Finished creating the course select dropdown.
    // Add its event listener and add it to the page.
    courseSelect.addEventListener(EV_CHANGE, handleChangeCourseSelect);
    document.body.appendChild(courseSelect);
}

function updateCourseDataTable(holesData) {
    // Helper function to gather the tee types from the holesData
    function getTeeTypes(holesData) {
        const teeBoxes = holesData[0].teeBoxes
        const teeTypes = [];
        teeBoxes.forEach(teeBox => { teeTypes.push(teeBox.teeType); })
        return teeTypes;
    }

    // Create the course info table.
    const courseInfoTable = createCourseInfoTable();

    // Create and add the table header row.
    tableHeaderRow = createCourseInfoTableHeaderRow(holesData.length);
    courseInfoTable.appendChild(tableHeaderRow);

    // render and add the course info table data rows
    const teeTypes = getTeeTypes(holesData);
    const infoGrid = generateInfoGrid(holesData);
    const courseInfoTableRows = renderCourseInfoTableRows(teeTypes, infoGrid);
    courseInfoTableRows.forEach(row => {
        courseInfoTable.appendChild(row);
    })

    // Drop in the new course info table.
    installCourseInfoTable(courseInfoTable);
}
