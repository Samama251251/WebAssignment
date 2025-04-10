// Company job data
const companies = {
    company1: {
        name: "Tech Innovations Inc.",
        job: {
            title: "Senior Software Developer",
            location: "San Francisco, CA",
            type: "Full-time",
            salary: "$120,000 - $150,000",
            description: "We are seeking an experienced Senior Software Developer to join our dynamic team. The ideal candidate will have a strong background in full-stack development, with expertise in JavaScript, React, and Node.js. You will be responsible for designing, developing, and maintaining our core products, collaborating with cross-functional teams, and mentoring junior developers.",
            requirements: [
                "5+ years of experience in software development",
                "Strong proficiency in JavaScript, HTML, CSS",
                "Experience with React, Node.js, and Express",
                "Familiarity with database technologies (MongoDB, PostgreSQL)",
                "Bachelor's degree in Computer Science or related field"
            ]
        }
    },
    company2: {
        name: "Global Solutions Ltd.",
        job: {
            title: "Project Manager",
            location: "New York, NY",
            type: "Full-time",
            salary: "$90,000 - $110,000",
            description: "Global Solutions Ltd. is looking for a skilled Project Manager to lead our client projects. You will be responsible for planning, executing, and closing projects while ensuring they are delivered on time, within scope, and within budget.",
            requirements: [
                "3+ years of experience in project management",
                "PMP certification preferred",
                "Strong communication and leadership skills",
                "Experience with project management software",
                "Bachelor's degree in Business or related field"
            ]
        }
    },
    company3: {
        name: "Future Technologies",
        job: {
            title: "Data Scientist",
            location: "Austin, TX",
            type: "Full-time",
            salary: "$110,000 - $140,000",
            description: "Future Technologies is seeking a talented Data Scientist to join our analytics team. You will work on challenging problems, develop innovative solutions, and help drive business decisions through data insights.",
            requirements: [
                "Master's degree in Data Science, Statistics, or related field",
                "Experience with Python, R, and SQL",
                "Knowledge of machine learning algorithms",
                "Experience with data visualization tools",
                "Strong analytical and problem-solving skills"
            ]
        }
    },
    company4: {
        name: "Creative Designs Co.",
        job: {
            title: "UX/UI Designer",
            location: "Remote",
            type: "Full-time",
            salary: "$80,000 - $100,000",
            description: "Creative Designs Co. is looking for a talented UX/UI Designer to create amazing user experiences. You will work closely with product managers and developers to design intuitive and visually appealing interfaces for our web and mobile applications.",
            requirements: [
                "3+ years of experience in UX/UI design",
                "Proficiency in design tools (Figma, Adobe XD, Sketch)",
                "Strong portfolio showcasing UI and UX projects",
                "Knowledge of user research and testing methodologies",
                "Understanding of HTML, CSS, and JavaScript basics"
            ]
        }
    },
    company5: {
        name: "Data Analytics Pro",
        job: {
            title: "Marketing Analyst",
            location: "Chicago, IL",
            type: "Full-time",
            salary: "$70,000 - $90,000",
            description: "Data Analytics Pro is seeking a Marketing Analyst to join our growing team. You will analyze marketing data, identify trends, and provide actionable insights to improve campaign performance and drive business growth.",
            requirements: [
                "2+ years of experience in marketing analytics",
                "Proficiency in data analysis tools (Google Analytics, Excel, Tableau)",
                "Experience with digital marketing channels",
                "Strong statistical and analytical skills",
                "Bachelor's degree in Marketing, Business, or related field"
            ]
        }
    }
};

// Function to display job details
function displayJobDetails(companyId) {
    const company = companies[companyId];
    
    if (!company) {
        return;
    }
    
    // Update job details
    document.getElementById('jobTitle').textContent = company.job.title;
    document.getElementById('companyName').textContent = company.name;
    document.getElementById('jobLocation').textContent = company.job.location;
    document.getElementById('jobType').textContent = company.job.type;
    document.getElementById('jobSalary').textContent = company.job.salary;
    document.getElementById('jobDescription').textContent = company.job.description;
    
    // Update requirements list
    const requirementsList = document.getElementById('jobRequirements');
    requirementsList.innerHTML = '';
    
    company.job.requirements.forEach(requirement => {
        const li = document.createElement('li');
        li.textContent = requirement;
        requirementsList.appendChild(li);
    });
    
    // Show job details section and hide the "no job selected" message
    document.getElementById('jobDetails').style.display = 'block';
    document.getElementById('noJobSelected').style.display = 'none';
}

// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const coverLetter = document.getElementById('coverLetter').value;
    const additionalDetails = document.getElementById('applicationDetails').value;
    
    // Simple validation
    if (!firstName || !lastName || !email || !phone) {
        alert('Please fill in all required fields');
        return;
    }
    
    // In a real application, you would send this data to a server
    // For this demo, we'll just show a success message
    alert(`Thank you, ${firstName} ${lastName}! Your application has been submitted successfully.`);
    
    // Reset form
    document.getElementById('applicationForm').reset();
}

// Add event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Company select dropdown
    const companySelect = document.getElementById('companySelect');
    companySelect.addEventListener('change', function() {
        displayJobDetails(this.value);
    });
    
    // Form submission
    const applicationForm = document.getElementById('applicationForm');
    applicationForm.addEventListener('submit', handleFormSubmit);
});