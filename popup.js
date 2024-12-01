

document.getElementById("save_btn").addEventListener("click", () => {
    const userData = {
        fname: document.getElementById("fname").value,
        lname: document.getElementById("lname").value,
        edu: document.querySelector('input[name="edu"]:checked')?.value || "", // Use optional chaining and default to empty string
        experience: document.getElementById("experience").value,
        skills: document.getElementById("skills").value,
        portfolio: document.getElementById("portfolio").value,
        summary: document.getElementById("summary").value,


    };

    localStorage.setItem("userData", JSON.stringify(userData));
    // alert("Data saved succesfully");
})
document.addEventListener("DOMContentLoaded", () => {

    const savedData = localStorage.getItem("userData");

    if (savedData) {

        const userData = JSON.parse(savedData);
        document.getElementById("fname").value = userData.fname || "";

        document.getElementById("lname").value = userData.lname || "";
        document.getElementById("experience").value = userData.experience || "";
        document.getElementById("skills").value = userData.skills || "";
        document.getElementById("portfolio").value = userData.portfolio || "";
        document.getElementById("summary").value = userData.summary || "";

        // Set the correct radio button for "edu"
        if (userData.edu) {
            const eduRadio = document.querySelector(`input[name="edu"][value="${userData.edu}"]`);
            if (eduRadio) eduRadio.checked = true;
        }
        // alert("Data restored succesfully");

    }


});

document.getElementById("reset").addEventListener("click", () => {
    // List of form fields related to personal information and job applications
    const formFields = [
        "firstName",
        "lastName",
        "email",
        "phone",
        "linkedin",
        "experience",
        "skills",
        "certificates",
        "portfolio",
        "summary"
    ];

    // Clear only the form-related fields from localStorage
    formFields.forEach((field) => {
        localStorage.removeItem(field);
    });

    // Also clear the form inputs on the page (reset the form)
    document.querySelector('form').reset();
});


document.getElementById("save_btn").addEventListener("click", () => {
    const userData = {
        fname: document.getElementById("fname").value,
        lname: document.getElementById("lname").value,
        experience: document.getElementById("experience").value,
        skills: document.getElementById("skills").value,
        portfolio: document.getElementById("portfolio").value,
        summary: document.getElementById("summary").value,
    };

    // Retrieve existing saved forms or initialize an empty array
    const savedForms = JSON.parse(localStorage.getItem("savedForms")) || [];

    // Add the current form data to the list of saved forms
    savedForms.push(userData);

    // Save the updated list back to localStorage
    localStorage.setItem("savedForms", JSON.stringify(savedForms));

    alert("Form saved successfully!");
    updateSavedFormsDropdown(); // Refresh the dropdown with updated saved forms
});

// Function to populate the dropdown with saved forms
function updateSavedFormsDropdown() {
    const savedForms = JSON.parse(localStorage.getItem("savedForms")) || [];
    const savedFormsDropdown = document.getElementById("saved-forms");

    // Clear existing options
    savedFormsDropdown.innerHTML = '<option value="">Select a saved form</option>';

    // Populate the dropdown with saved forms
    savedForms.forEach((form, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = `Form ${index + 1}: ${form.fname || "Unnamed"}`;
        savedFormsDropdown.appendChild(option);
    });
}

// Function to load a selected form into the fields
document.getElementById("load-form").addEventListener("click", () => {
    const selectedIndex = document.getElementById("saved-forms").value;

    if (selectedIndex === "") {
        alert("Please select a saved form.");
        return;
    }

    const savedForms = JSON.parse(localStorage.getItem("savedForms")) || [];
    const selectedForm = savedForms[selectedIndex];

    if (selectedForm) {
        document.getElementById("fname").value = selectedForm.fname || "";
        document.getElementById("lname").value = selectedForm.lname || "";
        document.getElementById("experience").value = selectedForm.experience || "";
        document.getElementById("skills").value = selectedForm.skills || "";
        document.getElementById("portfolio").value = selectedForm.portfolio || "";
        document.getElementById("summary").value = selectedForm.summary || "";
        alert("Form loaded successfully!");
    }
});

// Function to delete a selected form from the list
document.getElementById("delete-saved-form").addEventListener("click", () => {
    const selectedIndex = document.getElementById("saved-forms").value;

    if (selectedIndex === "") {
        alert("Please select a saved form.");
        return;
    }

    const confirmation = confirm("Are you sure you want to delete this saved form?");
    if (!confirmation) return;

    const savedForms = JSON.parse(localStorage.getItem("savedForms")) || [];
    savedForms.splice(selectedIndex, 1); // Remove the selected form

    localStorage.setItem("savedForms", JSON.stringify(savedForms)); // Save the updated list
    alert("Saved form deleted successfully!");
    updateSavedFormsDropdown(); // Refresh the dropdown
});

// Initialize the dropdown on page load
document.addEventListener("DOMContentLoaded", () => {
    updateSavedFormsDropdown();
});



// Save the current form data to a named profile
function saveProfile(profileName) {
    if (!profileName) {
        alert("Please enter a profile name.");
        return;
    }

    const profileData = {
        fname: document.getElementById("fname").value,
        lname: document.getElementById("lname").value,
        experience: document.getElementById("experience").value,
        skills: document.getElementById("skills").value,
        portfolio: document.getElementById("portfolio").value,
        summary: document.getElementById("summary").value,
    };

    localStorage.setItem(profileName, JSON.stringify(profileData));
    alert(`Profile "${profileName}" saved successfully!`);
}

// Load a named profile into the form
function loadProfile(profileName) {
    if (!profileName) {
        alert("Please enter a profile name.");
        return;
    }

    const profileData = localStorage.getItem(profileName);
    if (!profileData) {
        alert(`Profile "${profileName}" does not exist.`);
        return;
    }

    const data = JSON.parse(profileData);

    // Populate the form fields
    document.getElementById("fname").value = data.fname || "";
    document.getElementById("lname").value = data.lname || "";
    document.getElementById("experience").value = data.experience || "";
    document.getElementById("skills").value = data.skills || "";
    document.getElementById("portfolio").value = data.portfolio || "";
    document.getElementById("summary").value = data.summary || "";

    alert(`Profile "${profileName}" loaded successfully!`);
}

// Delete a named profile
function deleteProfile(profileName) {
    if (!profileName) {
        alert("Please enter a profile name.");
        return;
    }

    const confirmation = confirm(`Are you sure you want to delete the profile "${profileName}"?`);
    if (!confirmation) return;

    localStorage.removeItem(profileName);
    alert(`Profile "${profileName}" deleted successfully!`);

    // Clear the form after deletion
    document.getElementById("fname").value = "";
    document.getElementById("lname").value = "";
    document.getElementById("experience").value = "";
    document.getElementById("skills").value = "";
    document.getElementById("portfolio").value = "";
    document.getElementById("summary").value = "";
}

// Add event listeners
document.getElementById("save_btn").addEventListener("click", () => {
    const profileName = document.getElementById("profile-name").value;
    saveProfile(profileName);
});

document.getElementById("load-profile").addEventListener("click", () => {
    const profileName = document.getElementById("profile-name").value;
    loadProfile(profileName);
});

document.getElementById("delete-profile").addEventListener("click", () => {
    const profileName = document.getElementById("profile-name").value;
    deleteProfile(profileName);
});


// last changes
// Load job applications from localStorage and render the dashboard
function loadDashboard() {
    const jobApplications = JSON.parse(localStorage.getItem("jobApplications")) || [];
    const tableBody = document.querySelector("#dashboard-table tbody");

    // Clear existing rows
    tableBody.innerHTML = "";

    // Populate the table
    jobApplications.forEach((job, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${job.company}</td>
            <td>${job.title}</td>
            <td>${job.date}</td>
            <td>${job.status}</td>
            <td>
                <button class="delete-btn" data-index="${index}">Delete</button>
                <button class="edit-btn" data-index="${index}">Edit</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Call loadDashboard on page load
document.addEventListener("DOMContentLoaded", loadDashboard);
// Add a new job application
document.getElementById("add-job-btn").addEventListener("click", () => {
    const company = document.getElementById("company").value;
    const title = document.getElementById("title").value;
    // const date = document.getElementById("date").value;
    const status = document.getElementById("status").value;

    const currentDate = new Date().toISOString().split('T')[0];

    if (!company || !title || !status) {
        alert("Please fill out all fields!");
        return;
    }

    // const newJob = { company, title, date, status };

    // Retrieve existing job applications or initialize
    const jobApplications = JSON.parse(localStorage.getItem("jobApplications")) || [];
    // jobApplications.push(newJob);
    jobApplications.push({ company, title, date: currentDate, status });
    localStorage.setItem("jobApplications", JSON.stringify(jobApplications));

    // Clear form fields
    document.getElementById("company").value = "";
    document.getElementById("title").value = "";
    // document.getElementById("date").value = "";
    document.getElementById("status").value = "Applied";

    alert("Job application added successfully!");
    loadDashboard(); // Refresh the dashboard
});
// Handle delete button clicks
document.querySelector("#dashboard-table").addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-btn")) {
        const index = event.target.dataset.index;
        const jobApplications = JSON.parse(localStorage.getItem("jobApplications")) || [];
        jobApplications.splice(index, 1); // Remove the selected job application
        localStorage.setItem("jobApplications", JSON.stringify(jobApplications));
        alert("Job application deleted successfully!");
        loadDashboard(); // Refresh the dashboard
    }
});
// Handle edit button clicks
document.querySelector("#dashboard-table").addEventListener("click", (event) => {
    if (event.target.classList.contains("edit-btn")) {
        const index = event.target.dataset.index;
        const jobApplications = JSON.parse(localStorage.getItem("jobApplications")) || [];
        const job = jobApplications[index];

        // Populate form fields with the selected job's data
        document.getElementById("company").value = job.company;
        document.getElementById("title").value = job.title;
        document.getElementById("date").value = job.date;
        document.getElementById("status").value = job.status;

        // const currentDate = new Date();
        // const formattedDate = currentDate.toISOString().split("T")[0]; // YYYY-MM-DD
        // const formattedTime = currentDate.toTimeString().split(" ")[0]; // HH:MM:SS
        // document.getElementById("date").value = `${formattedDate} ${formattedTime}`;

        // Remove the existing job application from the list
        jobApplications.splice(index, 1);
        localStorage.setItem("jobApplications", JSON.stringify(jobApplications));
        loadDashboard(); // Refresh the dashboard
    }
});


document.getElementById('generate-cover-letter').addEventListener('click', function () {
    const jobTitle = document.getElementById('job-title').value.trim();
    const companyName = document.getElementById('company-name').value.trim();
    const name = document.getElementById('fname').value.trim();
    const lname = document.getElementById('lname').value.trim();

    document.getElementById('cover-letter').value = "Starting to generate cover letter";
    // Basic validation
    if (!jobTitle || !companyName) {
        alert("Please enter both job title and company name.");
        return;
    }

    // API request data
    const prompt = `Write a professional cover letter for the position of ${jobTitle} at ${companyName}. My name is   ${name} and surname is  ${lname}. keep it short 6-7 sentences max`;

    const data = JSON.stringify({
        model: 'gemma-2-27b',
        messages: [
            {
                role: 'user',
                content: prompt
            }
        ]
    });

    // XMLHttpRequest to make the API request
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            // Log the response status and responseText for debugging
            console.log("Response Status: ", xhr.status);  // Log the status code
            console.log("Response Text: ", xhr.responseText);  // Log the full response

            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                if (response && response.choices && response.choices.length > 0) {
                    const coverLetter = response.choices[0].message.content.trim();
                    document.getElementById('cover-letter').value = coverLetter;
                } else {
                    document.getElementById('cover-letter').value = "No cover letter generated.";
                }
            } else {
                document.getElementById('cover-letter').value = `Error: ${xhr.statusText}`;
                alert("There was an issue with the API request. Check the console for details.");
            }
        }
    };

    xhr.open('POST', 'https://google-gemma-2.p.rapidapi.com/');
    xhr.setRequestHeader('x-rapidapi-key', '18e6d8e50amsh13bf0f8b307472ep11e4d2jsnfcf9fa583272');
    xhr.setRequestHeader('x-rapidapi-host', 'google-gemma-2.p.rapidapi.com');
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send(data);
});

document.getElementById("add_fields").addEventListener("click", addNewField);

function addNewField(fieldName, fieldInputType) {
    // Create a new div container for the label and input
    const fieldContainer = document.createElement('div');
    fieldContainer.style.marginTop = '10px';

    // Create label for the input field
    const label = document.createElement('label');
    label.textContent = fieldName + ":";
    label.setAttribute('for', fieldName.toLowerCase().replace(/ /g, "-"));

    // Create the input field
    const input = document.createElement('input');
    input.type = fieldInputType;
    input.id = fieldName.toLowerCase().replace(/ /g, "-");
    input.name = fieldName;
    input.style.margin = '5px';

    // Append label and input to the container
    fieldContainer.appendChild(label);
    fieldContainer.appendChild(input);

    // Append the new field container to the form
    document.getElementById('add_fields').insertAdjacentElement('beforebegin', fieldContainer);
}

// Example usage: Attach the addNewField function to the "Add new fields" button
document.getElementById("add_fields").addEventListener("click", function () {
    const fieldName = prompt("Enter the field name:");
    if (!fieldName) {
        alert("Field name cannot be empty!");
        return;
    }
    const fieldInputType = prompt("Enter the input type (e.g., text, email, number):", "text");
    if (!fieldInputType) {
        alert("Field input type cannot be empty!");
        return;
    }
    addNewField(fieldName, fieldInputType);
});


// popup.js
document.getElementById('extract').addEventListener('click', function () {
    // Send a message to the content script to extract the data
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'extractData' }, function (response) {
            if (response) {
                console.log(response);  
                document.getElementById('fname').value = response.userName.split(' ')[0] || '';
                document.getElementById('lname').value = response.userName.split(' ')[1] || '';
                document.getElementById('summaryProfile').value = response.summary || '';
                document.getElementById('experience').value = response.experiencesAll.map(exp => `${exp.JobTitle} at ${exp.Company}`).join('\n') || '';
                document.getElementById('skills').value = response.skillsAll.join(', ') || '';
                document.getElementById('certificates').value = response.certificatesAll.map(cert => `${cert.Certificate} - ${cert.Organization} (${cert.Date})`).join('\n') || '';
                document.getElementById('education').value = response.educationAll.map(edu => `${edu.Instituton} - ${edu.Major} (${edu.Duration})`).join('\n') || '';
            }
        });
    });
});

document.getElementById("export-data").addEventListener("click", () => {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    const savedForms = JSON.parse(localStorage.getItem("savedForms") || "[]");
    const exportData = {
        userData,
        savedForms,
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data-export.json";
    a.click();
    URL.revokeObjectURL(url);
    alert("Data exported successfully!");
});



document.getElementById("import-button").addEventListener("click", () => {
    // Trigger the file input click event
    const fileInput = document.getElementById("import-data");
    fileInput.click();
});

// File Input Change Event to handle import
document.getElementById("import-data").addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) {
        alert("Please select a file to import.");
        return;
    }

    const reader = new FileReader();
    reader.onload = () => {
        try {
            const importedData = JSON.parse(reader.result);
            if (importedData.userData) {
                localStorage.setItem("userData", JSON.stringify(importedData.userData));
            }
            if (importedData.savedForms) {
                localStorage.setItem("savedForms", JSON.stringify(importedData.savedForms));
            }
            updateSavedFormsDropdown(); // Refresh dropdown or update UI as necessary
            alert("Data imported successfully!");
        } catch (error) {
            alert("Error importing data: Invalid JSON format.");
        }
    };
    reader.readAsText(file);
});


document.getElementById("email-data").addEventListener("click", () => {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    const savedForms = JSON.parse(localStorage.getItem("savedForms") || "[]");
    const exportData = {
        userData,
        savedForms,
    };

    const emailBody = encodeURIComponent(JSON.stringify(exportData, null, 2));
    const mailtoLink = 'mailto:?subject=Exported Data&body=${emailBody}';
    window.location.href = mailtoLink;
    alert("Data prepared for email!");
});

