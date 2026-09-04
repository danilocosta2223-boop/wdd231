// Array de Cursos da Atividade WDD231
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will cover the building blocks of programming languages (variables, decisions, calculations, loops, array, and functions).',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually building and publishing websites.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students are taught more in-depth programming concepts and tools, including functions, algorithms, data structures, and unit testing.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the concepts of object-oriented programming for students who have already introduced programming. Students will learn how to use classes and objects.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will focus on the JavaScript language to build dynamic and responsive web pages and web applications.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Web Frontend Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will focus on user experience, accessibility, mobile-first design, progressive enhancement, and advanced JavaScript patterns.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
];

// Elementos do DOM
const courseContainer = document.getElementById("courseContainer");
const creditsParagraph = document.getElementById("credits");
const btnAll = document.getElementById("all");
const btnWdd = document.getElementById("wdd");
const btnCse = document.getElementById("cse");

// Função para exibir os cursos dinamicamente e calcular os créditos com .reduce()
function displayCourses(filteredCourses) {
    if (!courseContainer) return;
    courseContainer.innerHTML = "";
    
    filteredCourses.forEach(course => {
        const courseCard = document.createElement("div");
        courseCard.classList.add("course");
        
        // Destaca visualmente se o curso estiver concluído (completed: true)
        if (course.completed) {
            courseCard.classList.add("completed");
        } else {
            courseCard.classList.add("incomplete");
        }
        
        courseCard.innerHTML = `
            <h3>${course.subject} ${course.number}</h3>
            <p><strong>${course.title}</strong></p>
            <p>Créditos: ${course.credits}</p>
            <p>Status: ${course.completed ? "Concluído" : "Em andamento"}</p>
        `;
        
        courseContainer.appendChild(courseCard);
    });

    // Cálculo exato de créditos usando reduce() conforme exigido na rubrica
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    if (creditsParagraph) {
        creditsParagraph.textContent = `Total de Créditos: ${totalCredits}`;
    }
}

// Eventos de clique para os filtros
if (btnAll) {
    btnAll.addEventListener("click", () => displayCourses(courses));
}

if (btnWdd) {
    btnWdd.addEventListener("click", () => {
        const wddCourses = courses.filter(course => course.subject === "WDD");
        displayCourses(wddCourses);
    });
}

if (btnCse) {
    btnCse.addEventListener("click", () => {
        const cseCourses = courses.filter(course => course.subject === "CSE");
        displayCourses(cseCourses);
    });
}

// Inicializa a página exibindo todos os cursos por padrão ao carregar
displayCourses(courses);