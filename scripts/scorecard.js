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
    const courseInfoURL = `http://uscobra.com/golfapi/course${courseID}.txt`;

    const response = fetch(courseInfoURL).then((JSONres) => {
        return JSONres.json();
    }).then((res) => {
        console.log(res);
        return res;
    })
}
