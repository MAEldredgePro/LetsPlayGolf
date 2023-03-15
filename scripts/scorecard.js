window.onload = pageMain;

//////////////////////////
// Function Definitions //
//////////////////////////
function pageMain() {
    // get the courseID from the query parameters
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    const courseID = params.courseID;
    console.log('Course ID: ' + courseID);

    // fetch the course information
    const courseInfo = fetchCourseInfo(courseID);
    console.log(courseInfo);
}

function fetchCourseInfo(courseID) {
    const courseInfoURL = `https://maeldredgepro.github.io/LetsPlayGolf/data/course${courseID}.txt`;

    fetch(courseInfoURL)
        .then((response) => response.json())
        .then(json => console.log(json));
}
