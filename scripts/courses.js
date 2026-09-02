const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Web Frontend Development I',
        credits: 2,
        completed: false
    }
];

const courseContainer = document.querySelector("#courses");
const creditsContainer = document.querySelector("#credits");

function displayCourses(courseList){
    courseContainer.innerHTML = "";

    courseList.forEach(course => {
        const card = document.createElement("div");
        card.textContent = `${course.subject} ${course.number}`;
        
        if(course.completed){
            card.classList.add("completed");
        } else {
            card.classList.add("incomplete");
        }
        
        courseContainer.appendChild(card);
    });

    const totalCredits = courseList.reduce(
        (sum, course) => sum + course.credits, 0
    );

    creditsContainer.textContent = `Total Credits: ${totalCredits}`;
}

displayCourses(courses);

document.querySelector("#all").addEventListener("click", () => {
    displayCourses(courses);
});

document.querySelector("#wdd").addEventListener("click", () => {
    displayCourses(courses.filter(course => course.subject === "WDD"));
});

document.querySelector("#cse").addEventListener("click", () => {
    displayCourses(courses.filter(course => course.subject === "CSE"));
});