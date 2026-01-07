const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming.',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: ['C#'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

// Función para mostrar cursos
function showCourses(courseArray) {
    const container = document.getElementById("course-cards-container");
    container.innerHTML = "";

    courseArray.forEach(course => {
        const card = document.createElement("div");
        card.classList.add("course-card");
        if (course.completed) {
            card.classList.add("completed"); // estilo distinto si completado
        }

        card.innerHTML = `
            <h3>${course.subject} ${course.number}: ${course.title}</h3>
            <p>${course.description}</p>
            <p>Credits: ${course.credits}</p>
            <p>Technologies: ${course.technology.join(", ")}</p>
        `;
        container.appendChild(card);
    });

    // Total de créditos
    const totalCredits = courseArray.reduce((sum, c) => sum + c.credits, 0);
    document.getElementById("total-credits").textContent = totalCredits;
}

// Función para manejar la selección del filtro
function setActiveButton(selectedButton) {
    const buttons = document.querySelectorAll(".filter-buttons button");
    buttons.forEach(btn => btn.classList.remove("active"));
    selectedButton.classList.add("active");
}

// Mostrar todos los cursos al cargar
showCourses(courses);

// Event listeners para filtrar cursos y cambiar el botón activo
document.getElementById("filter-all").addEventListener("click", function () {
    showCourses(courses);
    setActiveButton(this);
});

document.getElementById("filter-wdd").addEventListener("click", function () {
    showCourses(courses.filter(course => course.subject === 'WDD'));
    setActiveButton(this);
});

document.getElementById("filter-cse").addEventListener("click", function () {
    showCourses(courses.filter(course => course.subject === 'CSE'));
    setActiveButton(this);
});