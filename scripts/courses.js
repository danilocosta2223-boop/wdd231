// Array de Cursos (Item 8 da Rubrica)
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

// Elementos do DOM
const coursesContainer = document.getElementById('courses-container');
const totalCreditsEl = document.getElementById('total-credits');
const allBtn = document.getElementById('all-btn');
const wddBtn = document.getElementById('wdd-btn');
const cseBtn = document.getElementById('cse-btn');

// Função para exibir os cursos e calcular os créditos com reduce() (Item 10 e 11)
function displayCourses(filteredCourses) {
    coursesContainer.innerHTML = '';
    
    filteredCourses.forEach(course => {
        const card = document.createElement('div');
        card.classList.add('course-card');
        
        // Aplica a classe completed se o curso estiver concluído (Item 11)
        if (course.completed) {
            card.classList.add('completed');
        }
        
        card.innerHTML = `
            <h3>${course.subject} ${course.number}</h3>
            <p>${course.credits} Créditos</p>
        `;
        coursesContainer.appendChild(card);
    });

    // Cálculo total de créditos utilizando obrigatoriamente reduce() (Item 10)
    const totalCredits = filteredCourses.reduce(
        (sum, course) => sum + course.credits, 
        0
    );
    totalCreditsEl.textContent = totalCredits;
}

// Eventos de clique para os filtros (Item 9)
allBtn.addEventListener('click', () => displayCourses(courses));

wddBtn.addEventListener('click', () => {
    const wddFiltered = courses.filter(course => course.subject === 'WDD');
    displayCourses(wddFiltered);
});

cseBtn.addEventListener('click', () => {
    const cseFiltered = courses.filter(course => course.subject === 'CSE');
    displayCourses(cseFiltered);
});

// Rodapé dinâmico: Ano atual e última modificação (Item 12)
document.getElementById("anoatual").textContent = new Date().getFullYear();
document.getElementById("ultimamodificacao").textContent = document.lastModified;

// Inicializa a página exibindo todos os cursos por padrão
displayCourses(courses);