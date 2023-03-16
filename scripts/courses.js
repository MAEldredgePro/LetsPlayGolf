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

    console.log(`holesData.length: ${holesData.length}`);

    // Iterate the holes 1-18. This is a column-wise iteration which does
    // not lend itself well to creating HTML as-you-go (which is row-wise)
    // so we have to build something in-memory that we can traverse row-wise.
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
                const rowNumber = (teeBoxIndex * TeeBoxInfo.datumLabels.length) + datumSelector;

                // Add another column if we need to
                if (infoGrid.length <= colNumber) {
                    infoGrid.push([]);
                }

                // // add another row if we have to
                // if (infoGrid[colNumber].length <= rowNumber) {
                //     infoGrid[colNumber].push([]);
                // }

                // create the datum
                const tableDatum = teeBoxInfo.GetDatum(datumSelector);
                infoGrid[colNumber].push(tableDatum);
            })
        })
    })

    // // initialize the tee box row groups
    // console.log(`holesInfoIn[0].teeBoxes.length: ${holesData[0].teeBoxes.length}`);
    // const teeBoxRowGroups = [];
    // holesData[0].teeBoxes.forEach(teeBoxIn => {
    //     teeBoxRowGroups.push([]);
    // })

    // let teeBoxCount = 0;

    // holesData.forEach(holeInfoIn => {
    //     holeInfoIn.teeBoxes.forEach((teeBoxIn, index) => {
    //         const teeBoxOut = new TeeBoxInfo(teeBoxIn);
    //         teeBoxRowGroups[index].push(teeBoxOut);
    //         ++teeBoxCount;
    //     })
    // });

    // console.log(`teeBoxRowGroupsOut.length: ${teeBoxRowGroups.length}`);
    // console.log(`teeBoxRowGroupsOut[0]: ${teeBoxRowGroups[0]}`);
    // console.log(`teeBoxRowGroupsOut[0].length: ${teeBoxRowGroups[0].length}`);
    // console.log(`teeBoxRowGroupsOut[0][0]: ${teeBoxRowGroups[0][0]}`);
    // console.log(`teeBoxCount: ${teeBoxCount}`);

    ////////////////////////////////
    // Assemble the tee box info. //
    ////////////////////////////////

    // Create an array of empty table row objects
    // that we will fill out later
    // const tableDataRows = [];

    // // each tee box row group
    // teeBoxRowGroups.forEach(teeBoxRowGroupOut => {
    //     TeeBoxInfo.rowLabels.forEach(rowLabel => {
    //         tableDataRows.push(newElement('tr'));
    //     })
    // })

    // // render the tee box rows
    // teeBoxRowGroups.forEach((teeBoxRowGroupOut, index) => {
    //     if (index === 0) {
    //         // add the tee type label
    //         const tableRowLabel = newElement('td');
    //         tableRowLabel.setAttribute('rowspan', '3');
    //         tableDataRows[index].appendChild(tableRowLabel);
    //         tableRowLabel.innerHTML = 'teeType';
    //         console.log(index);
    //     }

    //     // Render the label
    //     const tableRowLabel = newElement('td');
    //     // tableRow.appendChild(tableRowLabel);
    //     // tableRowLabel.innerHTML = TeeBoxOut.GetDataLabel(index);

    //     teeBoxRowGroupOut.forEach(teeBoxOut => {
    //         const tableData = newElement('td');
    //         tableData.innerHTML = teeBoxOut.GetData(index);
    //         // tableRow.appendChild(tableData);
    //     })
    // })

    // Create the table header row.
    tableHeaderRow = createCourseInfoTableHeaderRow(holesData.length);

    const courseInfoTable = createCourseInfoTable();

    // Assemble the table;
    courseInfoTable.appendChild(tableHeaderRow);

    // Drop in the new course info table.
    installCourseInfoTable(courseInfoTable);
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

// function acquireCourseInfoTable(create = true) {
//     const courseInfoTable = document.querySelector(CLS_SEL_COURSE_INFO) ||
//         create ?  : null;

//     if (courseInfoTable && create) {
//         document.body.appendChild(courseInfoTable);
//     }

//     return courseInfoTable;
// }

// function removeCourseInfoTable() {
//     const courseInfoTable = document.querySelector(CLS_SEL_COURSE_INFO);
//     if (courseInfoTable) {
//         courseInfoTable.remove();
//     }

//     //
//     // This doesn't work. Probably because of something to do with
//     // references idk.
//     //
//     // const courseInfoTable = acquireCourseInfoTable(false);
//     // if (courseInfoTable) {
//     //     courseInfoTable.remove();
//     //     // document.body.removeChild(courseInfoTable) :
//     // }
// }

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
