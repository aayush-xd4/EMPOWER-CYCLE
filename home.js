// Check if user is logged in
if (localStorage.getItem('loggedIn') !== 'true') {
    window.location.href = 'login.html';
}

// Logout functionality
document.getElementById('logoutBtn').addEventListener('click', function() {
    localStorage.removeItem('loggedIn');
    window.location.href = 'login.html';
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Redirect buttons functionality
document.querySelectorAll('.section-btn, .resource-btn').forEach(button => {
    button.addEventListener('click', function() {
        window.location.href = this.getAttribute('data-page');
    });
});

// Cycle Tracker Calendar
class CycleCalendar {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.currentDate = new Date();
        this.selectedDates = JSON.parse(localStorage.getItem('selectedDates')) || {};
        this.renderCalendar();
    }

    renderCalendar() {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();

        let html = `<h3>${this.getMonthName(month)} ${year}</h3>`;
        html += '<table><tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr><tr>';

        for (let i = 0; i < firstDay.getDay(); i++) {
            html += '<td></td>';
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dateString = `${year}-${month + 1}-${day}`;
            const isSelected = this.selectedDates[dateString];
            html += `<td class="${isSelected ? 'selected' : ''}" data-date="${dateString}">${day}</td>`;

            if ((firstDay.getDay() + day) % 7 === 0) {
                html += '</tr><tr>';
            }
        }

        html += '</tr></table>';
        html += '<button id="prevMonth">&lt; Prev</button><button id="nextMonth">Next &gt;</button>';

        this.container.innerHTML = html;

        this.container.querySelectorAll('td[data-date]').forEach(cell => {
            cell.addEventListener('click', () => this.toggleDate(cell.dataset.date));
        });

        document.getElementById('prevMonth').addEventListener('click', () => this.changeMonth(-1));
        document.getElementById('nextMonth').addEventListener('click', () => this.changeMonth(1));
    }

    getMonthName(month) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return months[month];
    }

    toggleDate(dateString) {
        if (this.selectedDates[dateString]) {
            delete this.selectedDates[dateString];
        } else {
            this.selectedDates[dateString] = true;
        }
        localStorage.setItem('selectedDates', JSON.stringify(this.selectedDates));
        this.renderCalendar();
    }

    changeMonth(delta) {
        this.currentDate.setMonth(this.currentDate.getMonth() + delta);
        this.renderCalendar();
    }
}

// Initialize calendar if the container exists
if (document.getElementById('calendarContainer')) {
    const calendar = new CycleCalendar('calendarContainer');
}

// Symptom Logger
const symptomContainer = document.getElementById('symptomContainer');
const symptomLog = document.getElementById('symptomLog');

if (symptomContainer && symptomLog) {
    symptomContainer.addEventListener('dragstart', function(e) {
        e.dataTransfer.setData('text/plain', e.target.innerText);
    });

    symptomLog.addEventListener('dragover', function(e) {
        e.preventDefault();
    });

    symptomLog.addEventListener('drop', function(e) {
        e.preventDefault();
        const symptom = e.dataTransfer.getData('text');
        const symptomElement = document.createElement('div');
        symptomElement.innerText = symptom;
        symptomElement.classList.add('logged-symptom');
        symptomLog.appendChild(symptomElement);
        saveSymptoms();
    });

    function saveSymptoms() {
        const symptoms = Array.from(symptomLog.querySelectorAll('.logged-symptom')).map(el => el.innerText);
        localStorage.setItem('loggedSymptoms', JSON.stringify(symptoms));
    }

    function loadSymptoms() {
        const symptoms = JSON.parse(localStorage.getItem('loggedSymptoms')) || [];
        symptoms.forEach(symptom => {
            const symptomElement = document.createElement('div');
            symptomElement.innerText = symptom;
            symptomElement.classList.add('logged-symptom');
            symptomLog.appendChild(symptomElement);
        });
    }

    loadSymptoms();
}

// AI Voice Assistant (placeholder)
function activateVoiceAssistant() {
    alert("AI Voice Assistant activated! (This is a placeholder for the actual implementation)");
}

// Smart Product Selection (placeholder)
function startProductQuiz() {
    alert("Product recommendation quiz starting soon! (This is a placeholder for the actual implementation)");
}

// Personalized Symptom Management (placeholder)
function getSymptomManagementTips() {
    alert("Generating personalized symptom management tips... (This is a placeholder for the actual implementation)");
}

// AI Chatbot (placeholder)
function openChatbot() {
    alert("AI Chatbot is ready to assist you! (This is a placeholder for the actual implementation)");
}

// Add event listeners for the new features
document.querySelectorAll('.section-btn').forEach(button => {
    button.addEventListener('click', function() {
        const section = this.closest('section').id;
        switch(section) {
            case 'ai-assistant':
                activateVoiceAssistant();
                break;
            case 'smart-product-selection':
                startProductQuiz();
                break;
            case 'symptom-management':
                getSymptomManagementTips();
                break;
            case 'ai-chatbot':
                openChatbot();
                break;
        }
    });
});

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Form submission for newsletter (placeholder)
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        alert(`Thank you for subscribing with email: ${email}`);
        this.reset();
    });
}

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.querySelector('nav ul');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show');
    });
}

// Initialize any charts or graphs
function initializeCharts() {
    // Placeholder for chart initialization
    console.log("Charts initialized");
}

// Call this function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeCharts);

// Add a simple loading indicator
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.display = 'none';
    }
});