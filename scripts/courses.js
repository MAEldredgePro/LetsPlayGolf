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
const BTN_LBL_PLAY_GAME = 'Start game with current player(s)';
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
const LBL_TEE_BOX = 'Tee Box';
const LBL_TOTAL = 'Total'
const LBL_YARDS = 'Yards';
const LBL_PAR = 'Par';
const LBL_HCP = 'HCP';
//#endregion

//#region Misc Constants
const OPT_SELECT_COURSE = '00:16';
//const OPT_SELECT_COURSE = 'Select a course:';
const PR_GET_STROKE_COUNT = 'How many strokes?';
const VAL_NUM_HOLES = 18;
const VAL_GRID_HOLE_COLS = VAL_NUM_HOLES;
const VAL_GRID_AUX_COLS = 3; // 'Out', 'In' and 'Total' columns
const VAL_GRID_OUT_COL_NUM = 9;
const VAL_GRID_IN_COL_NUM = 19;
const VAL_GRID_TOT_COL_NUM = 20;
const VAL_GRID_TOT_COLS = VAL_GRID_HOLE_COLS + VAL_GRID_AUX_COLS;
const VAL_GRID_AUX_COL_NUMS = [VAL_GRID_OUT_COL_NUM, VAL_GRID_IN_COL_NUM, VAL_GRID_TOT_COL_NUM];
const VAL_TBL_LBL_COLS = 2; // Tee type and tee datum (yds/par/hcp) label
const VAL_TOT_COLS = VAL_TBL_LBL_COLS + VAL_GRID_TOT_COLS;
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

    static newTDCell(innerText = null, classAttrValue = null) {
        return this.#newElement(EL_TD, innerText, classAttrValue);
    }

    static newTableHeaderCell(innerText = null, classAttrValue = null) {
        return this.#newElement(EL_TH, innerText, classAttrValue);
    }

    static newTRow(classAttrValue = null) {
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
        this.teeType = teeBoxData.teeType;
        this.hexColor = teeBoxData.teeHexColor;
        this.hole = teeBoxData.hole;
        this.yards = teeBoxData.yards;
        this.par = teeBoxData.par;
        this.hcp = teeBoxData.hcp;
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

// Register the entry point code to run when the html window has
// finished loading.
window.onload = fetchCourseList;

//#endregion

//#region Documentation
//============================================================================//
// This next section is for documentation purposes only.  It helps me keep    //
// track of what I've done so I can find the code I'm looking for more easily //
// when I want to make changes.  It is a 'functional directory'.              //
//============================================================================//

const functionCallTree = [
    //#region Flow
    //========================================================================//
    // The window finishes loading, and the registered callback,              //
    // 'fetchCourseList' is called.                                           //
    //========================================================================//
    //#endregion
    fetchCourseList,
    //#region Docs
    // fetchCourseList is the main entry point that is registered as the
    // window.onload callback.  As soon as the window has finished loading,
    // this function gets called to get the ball rolling.
    //
    // fetchCourseList initiates a network request (using the fetch api)
    // for the purpose of downloading the list of available golf courses.
    // As part of the 'fetch' API call, fetCourseListData registers a callback
    // function (renderCourseSelect) which will be called when the
    // network request returns so it (the callback function) can process the
    // returned course list data.
    //
    // TL;DR fetchCourseList calls 'fetch' and registers the callback
    // renderCourseSelect then terminates.
    //
    //#endregion
    /* fetchCourseList registers callback */ renderCourseSelect,

    //#region Flow
    //========================================================================//
    //                       Waiting on network request                       //
    //========================================================================//
    // When the fetchCourseList function terminated, we yielded control back  //
    // to the browser. The User Interface can now continue to operate while   //
    // both the our code and the user wait for the network request to return. //
    //========================================================================//

    //.......................... a few moments later .........................//

    //========================================================================//
    // The network request finishes, and the registered callback,             //
    // 'renderCourseSelect' is called with the course info data.       //
    //========================================================================//
    //#endregion
    renderCourseSelect,
    //#region Docs
    // renderCourseSelect creates a dropdown list of the available golf
    // courses and registers the 'handleUserChoseAGolfCourse' callback
    // function on the (HTML <select>) dropdown object.
    //
    // The 'handleUserChoseAGolfCourse' callback will be triggered any time
    // the user chooses or changes their golf course selection in the dropdown.
    //
    // TL;DR fetchCourseList calls 'fetch' and registers the callback
    // renderCourseSelect then terminates.

    // TL;DR renderCourseSelect gives the users a way to choose a golf
    // course and registers the 'handleUserChoseAGolfCourse' to act when they
    // make a choice, then terminates, yielding control back to the browser.
    //
    //#endregion
    /* renderCourseSelect registers callback */ handleUserChoseAGolfCourse,

    //#region Flow
    //========================================================================//
    //                          Waiting on user input                         //
    //========================================================================//
    // The 'renderCourseSelect' function terminates and we yield       //
    // control back to the browser. The User Interface continues to operate   //
    // while the entire universe twiddles their collective 'thumbs' while     //
    // waiting for the user to make a selection.                              //
    //========================================================================//

    //.......................... a few moments later .........................//

    //========================================================================//
    // The user has chosen a golf course from the dropdown which has          //
    // triggered a call to handleUserChoseAGolfCourse                         //
    //========================================================================//
    //#endregion
    handleUserChoseAGolfCourse,
    //#region Docs
    // handleUserChoseAGolfCourse captures the user's requested courseID and
    // initiates a network 'fetch' for the course's data.
    //
    // As part of the 'fetch' API call, handleUserChoseAGolfCourse registers a
    // callback function which will be called when the network request returns.
    //
    // The callback function (renderCourseData) will then draw for the user the
    // course data that was fetched asynchronously from the network and is now
    // available.
    //
    // TL;DR handleUserChoseAGolfCourse initiates a asynchronous 'fetch' of some
    // data from the network. As part of the 'fetch' protcol, a callback,
    // 'renderCourseData', is passed in.  It gets registered as the function
    // that the 'fetch' mechanism will call with the returned data.
    //#endregion
    fetchCourseData,

    fetchCourseData,
    renderCourseData,

    renderCourseData,
    createCourseInfoTable,
    createCourseInfoTableHeaderRow,
    generateInfoGrid,   // heavy lifting of data from json to infoGrid
    renderCourseInfoTableRows, // build table rows from infoGrid
    installCourseInfoTable,

    renderCourseInfoTableRows,
    createTeeTypeCell,
    handleClickTeeTypeButton,

    handleClickTeeTypeButton,
    appendControlButtons,

    appendControlButtons,
    appendFullWidthButton,

    appendFullWidthButton,
    handleClickAddPlayerButton,

    handleClickAddPlayerButton,
    handleClickAddStrokes,

    appendFullWidthButton,
    handleClickPlayButton,

    renderCourseInfoTableRows,
];

const functionTOC = [
    appendControlButtons,
    appendFullWidthButton,
    appendTableDatum,
    createCourseInfoTable,
    createCourseInfoTableHeaderRow,
    createTeeTypeCell,
    fetchCourseData,
    fetchCourseList,
    generateInfoGrid,
    handleUserChoseAGolfCourse,
    handleClickAddPlayerButton,
    handleClickAddStrokes,
    handleClickPlayButton,
    handleClickTeeTypeButton,
    installCourseInfoTable,
    isNumeric,
    recomputeRowTotals,
    removeControlButtons,
    renderCourseInfoTableRows,
    renderCourseSelect,
    renderCourseData,
];
//#endregion Documentation

//| Function Definitions |
//|======================|
function appendControlButtons(courseInfoTable) {
    if (g_playerList.length < 4) {
        appendFullWidthButton(
            BTN_LBL_ADD_PLAYER, handleClickAddPlayerButton,
            courseInfoTable, VAL_TOT_COLS
        );
    }

    if (g_playerList.length > 0) {
        appendFullWidthButton(
            BTN_LBL_PLAY_GAME, handleClickPlayButton,
            courseInfoTable, VAL_TOT_COLS
        );
    }
}

function appendFullWidthButton(btnLbl, btnCallback, table, totalCols) {
    const button = ElementFactory.newButton(btnLbl);
    button.addEventListener(EV_CLICK, btnCallback);
    const buttonCell = ElementFactory.newTDCell();
    buttonCell.appendChild(button);
    buttonCell.setAttribute(ATTR_COLSPAN, totalCols);
    const buttonCellRow = ElementFactory.newTRow(CLS_CTRL_ROW);
    buttonCellRow.appendChild(buttonCell);
    table.appendChild(buttonCellRow);
}

// Add a cell to an existing table row with the given innerText as its content
function appendTableDatum(tableRow, innerText) {
    const tableDatum = ElementFactory.newTDCell(innerText);
    tableRow.appendChild(tableDatum);
}

function createCourseInfoTable() {
    return ElementFactory.newTable(CLS_COURSE_INFO);
}

function createCourseInfoTableHeaderRow(numHoles) {
    const tableHeaderRow = ElementFactory.newTRow(CLS_HEADER);

    // Add the 'Tee' column label to the table header row.
    let tableRowLabel = ElementFactory.newTableHeaderCell(LBL_TEE_BOX);
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
    const buttonLabel = `Play\n${rowTeeType}\ntees`;

    const teeTypeSelectButton = ElementFactory.newButton(buttonLabel);
    teeTypeSelectButton.addEventListener(EV_CLICK, handleClickTeeTypeButton)

    // Create the table data cell to hold the select button
    const teeTypeTableDatum =
        ElementFactory.newTDCell(ElementFactory.NO_INNER_TEXT, CLS_TEETYPE_CELL);
    teeTypeTableDatum.setAttribute(ATTR_ROWSPAN, numDataRowsPerTeeType);

    // add the button to the cell
    teeTypeTableDatum.appendChild(teeTypeSelectButton);

    return teeTypeTableDatum;
}

function fetchCourseData(courseID) {
    fetch(COURSE_DATA_URL(courseID))
        .then(response => response.json())
        .then(courseData => renderCourseData(courseData.data.holes));
}

function fetchCourseList() {
    // launch a promise to fetch the course list.  When complete, it will
    // call back a function to render the course selection page.
    fetch(COURSE_LIST_URL)
        .then(response => response.json())
        .then(courseList => renderCourseSelect(courseList));
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

function getOutermostContainer() {
    return document.querySelector('.outermost-container');
}

function handleClickAddPlayerButton(event) {
    const newPlayer = prompt(BTN_LBL_ADD_PLAYER);

    //| Add the user to the internal player list |
    //|__________________________________________|

    // Reject the player if they have already been added.
    g_playerList.forEach(player => {
        if (newPlayer.toLowerCase() === player.toLowerCase()) {
            alert(`${player} has already been added`);
            return;
        }
    })

    // Add the player to our internal player list.
    g_playerList.push(newPlayer);

    //| Add the new player to the DOM |
    //|_______________________________|

    // Get the course info table.
    const courseInfoTable = document.querySelector(CLS_SEL_COURSE_INFO);

    // Remove the control buttons
    removeControlButtons(courseInfoTable);

    // Add the new player.
    const newPlayerCell = ElementFactory.newTDCell(newPlayer);
    newPlayerCell.setAttribute(ATTR_COLSPAN, VAL_TBL_LBL_COLS);
    newPlayerCell.style.textAlign = 'center';
    const newPlayerRow = ElementFactory.newTRow();
    newPlayerRow.appendChild(newPlayerCell);

    // Add the empty score and total score cells.  Only install a click handler
    // on the user score cells.  The totals are computed automatically.
    const columnCount = VAL_NUM_HOLES + VAL_GRID_AUX_COLS;
    for (let col = 0; col < columnCount; ++col) {
        const scoreTableCell = ElementFactory.newTDCell('0');

        if (!VAL_GRID_AUX_COL_NUMS.includes(col)) {
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
            eventCell.innerText = curClassName;
            continue;
        }

        // Hide the rows we don't care about.
        tableRow.style.display = 'none';
    }

    // Add the control buttons.
    appendControlButtons(courseInfoTable);
}

function handleUserChoseAGolfCourse(event) {
    const courseSelect = event.target;
    const courseID = courseSelect[courseSelect.selectedIndex].id;
    g_playerList.length = 0;
    getOutermostContainer().style.backgroundImage =
        `url('https://maeldredgepro.github.io/LetsPlayGolf/images/${courseID}.jpg')`;

    fetchCourseData(courseID);
    // The fetch registers a callback that will render the course info.
}

function installCourseInfoTable(newCourseInfoTable) {
    // remove the old course info table
    const oldCourseInfoTable = document.querySelector(CLS_SEL_COURSE_INFO);
    if (oldCourseInfoTable) {
        oldCourseInfoTable.remove();
    }

    if (newCourseInfoTable) {
        getOutermostContainer().appendChild(newCourseInfoTable);
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

function renderCourseInfoTableRows(teeBoxInfos, infoGrid) {
    // Iterate the holes 1-18. This is a column-wise iteration which does
    // not lend itself well to creating HTML as-you-go (which is row-wise)
    // so we have to build something in-memory that we can traverse row-wise.

    // initialize the row array we will be populating and returning
    const courseInfoTableRows = [];

    // Turn the infoGrid on its side and iterate the data.
    const numRows = infoGrid[0].length;
    const numDataRowsPerTeeType = TeeBoxInfo.datumLabels.length;
    for (let j = 0; j < numRows; ++j) {
        // Create the new table row DOM object.
        const tableRow = ElementFactory.newTRow();

        // Compute some values that will help us do some special handling
        // if this row meets certain conditions.
        const teeTypeSelector = Math.floor(j / numDataRowsPerTeeType);
        const teeBoxDatumSelector = j % numDataRowsPerTeeType;
        const onFirstRowOfTeeTypeData = (teeBoxDatumSelector === 0);
        let curTeeBoxInfo = teeBoxInfos[teeTypeSelector];

        //#region Why we need a spanning table cell
        // The tee type button table cell spans all the rows containing data
        // points associated with a given tee type.
        // If we are at the first of a set of rows all of which
        // contain data for the current tee type, render the
        // tee type button cell (in the tee type table column) which spans
        // vertically down across all the tee type column cells whose rows
        // contain data for this tee type.
        // these are the 'pro' and 'amt' cells in the following example, which
        // would have a rowspan of '3'.
        // ===================================...
        // |  hole   | 1 | 2 | 3 | 4 | 5 | 6 |...
        // ===================================...
        // |     |YRD|py1|py2|py3|py4|py5|py6|...
        // |     |============================...
        // | pro |PAR|ph1|ph2|ph3|ph4|ph5|ph6|...
        // |     |============================...
        // |     |HCP|ph1|ph2|ph3|ph4|ph5|ph6|...
        // ===================================...
        // |     |YRD|ay1|ay2|ay3|ay4|ay5|ay6|...
        // |     |============================...
        // | amt |PAR|ah1|ah2|ah3|ah4|ah5|ah6|...
        // |     |============================...
        // |     |HCP|ah1|ah2|ah3|ah4|ah5|ah6|...
        // ===================================...
        //#endregion
        // TL;DR Create the tee type button row spanning cell
        if (onFirstRowOfTeeTypeData) {
            //#region What's this button do?
            // This button allows the user to choose which tee type
            // (ex: pro, champion, men's, women's) they would like to use
            // for the game they are about to play.
            //#endregion
            // TL;DR Create the tee type button cell and add it to the row
            const teeTypeButtonCell =
                createTeeTypeCell(curTeeBoxInfo.teeType, numDataRowsPerTeeType);

            tableRow.appendChild(teeTypeButtonCell);
        }

        // Add the datum label ('Yards', 'Par', 'HCP') to the table row.
        const rowLabel = TeeBoxInfo.datumLabels[teeBoxDatumSelector];
        tableRow.appendChild(ElementFactory.newTDCell(rowLabel));

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
        tableRow.setAttribute(ATTR_CLASS, curTeeBoxInfo.teeType);

        // Set the background color of the row
        tableRow.style.backgroundColor = curTeeBoxInfo.hexColor;

        // Add the row to the array of rows we will be returning
        courseInfoTableRows.push(tableRow);
    }

    // return the array of rows
    return courseInfoTableRows;
}

function renderCourseSelect(courses) {
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
    courseSelect.addEventListener(EV_CHANGE, handleUserChoseAGolfCourse);
    getOutermostContainer().appendChild(courseSelect);
}

function renderCourseData(holesData) {
    // Helper function to gather the tee types from the holesData
    function getTeeBoxInfos(holesData) {
        const teeBoxInfos = [];
        holesData[0].teeBoxes.forEach(teeBoxData => {
            const teeBoxInfo = new TeeBoxInfo(teeBoxData);
            teeBoxInfos.push(teeBoxInfo);
        })
        return teeBoxInfos;
    }

    // Create the course info table.
    const courseInfoTable = createCourseInfoTable();

    // Create and add the table header row.
    tableHeaderRow = createCourseInfoTableHeaderRow(holesData.length);
    courseInfoTable.appendChild(tableHeaderRow);

    // render and add the course info table data rows
    // const teeTypes = getTeeBoxInfos(holesData).map(tBxInf => tBxInf.teeType);
    const teeBoxInfos = getTeeBoxInfos(holesData);

    const infoGrid = generateInfoGrid(holesData);
    const courseInfoTableRows = renderCourseInfoTableRows(teeBoxInfos, infoGrid);
    courseInfoTableRows.forEach(row => {
        courseInfoTable.appendChild(row);
    })

    // Drop in the new course info table.
    installCourseInfoTable(courseInfoTable);
}
