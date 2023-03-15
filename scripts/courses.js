/////////////
// Globals //
/////////////

window.onload = fetchCourses;

//////////////////////////
// Function Definitions //
//////////////////////////
function fetchCourses() {
    // launch a promise to fetch the course list.  When complete, it will
    // call back a function to render the course picker.
    fetch('https://maeldredgepro.github.io/LetsPlayGolf/data/courses.json')
        .then(response => response.json())
        .then(json => renderCoursePage(json));
}

function renderCoursePage(courses) {
    renderCoursePicker(courses);
    renderNextButton();
}

function renderCoursePicker(courses) {
    const dropdown = document.createElement('select');
    dropdown.onchange = handleChangeDropdown;

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

function renderNextButton() {
    // Add the Next button
    const button = document.createElement('button');
    button.id = 'nextButton';
    button.onclick = handleClickButton;
    button.disabled = true;
    button.innerHTML = 'Next';

    // Finished creating the Next button.  Add it to the page.
    document.body.appendChild(button);
}

function handleChangeDropdown() {
    document.getElementById('nextButton').disabled = false;
}

function handleClickButton() {
    const elDropdown = document.querySelector('select');
    const courseID = elDropdown.options[elDropdown.selectedIndex].id;
    const urlTarget = `scorecard.html?courseID=${courseID}`;
    window.location.href = urlTarget;
}
