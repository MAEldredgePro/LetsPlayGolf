/////////////
// Globals //
/////////////
const COURSES = [
    { id: 11819, name: 'Thanksgiving Point' },
    { id: 18300, name: 'Fox Hollow' },
    { id: 19002, name: 'Spanish Oaks' }
];

window.onload = handleOnLoad;

//////////////////////////
// Function Definitions //
//////////////////////////
function handleOnLoad() {
    const dropdown = document.createElement('select');
    dropdown.onchange = handleDropdownOnChange;

    // add a prompt choice which can't be selected
    const promptElement = document.createElement('option');
    promptElement.setAttribute('value', '');
    promptElement.setAttribute('disabled', 'true');
    promptElement.setAttribute('selected', 'true');
    promptElement.innerHTML = 'Select a course:';
    dropdown.appendChild(promptElement);

    // add the course choices
    COURSES.forEach(course => {
        const courseElement = document.createElement('option');
        courseElement.setAttribute('id', course.id);
        courseElement.innerHTML = course.name;
        dropdown.appendChild(courseElement);
    })

    document.body.appendChild(dropdown);

    // ad the Fore! button
    const foreButton = document.createElement('button');
    foreButton.setAttribute('id', 'foreButton');
    foreButton.disabled = true;
    foreButton.innerHTML = 'Fore!';
    document.body.appendChild(foreButton);
}

function handleDropdownOnChange() {
    document.getElementById('foreButton').disabled = false;
}

// This works
function test() {
    const response = fetch('http://uxcobra.com/golfapi/course11819.txt').then((JSONres) => {
        return JSONres.json();
    }).then((res) => {
        console.log(res);
    })
}


function getAvailableCourses() {
    return fetch('https://golf-courses-api.herokuapp.com/courses/').then(
        function (response) {
            return response.json();
        }
    );
}

// doesn't work
function testCourses() {
    const response = fetch('https://golf-courses-api.herokuapp.com/courses/').then((JSONres) => {
        return JSONres.json();
    }).then((res) => {
        console.log(res);
    })
}
