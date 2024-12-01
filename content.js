
// -------------------------------------------------
// NAME

const nameElement = document.querySelector('h1.inline.t-24.v-align-middle.break-words');
const userName = nameElement ? nameElement.innerText.trim() : null;
console.log('Extracted Name:', userName);

// -------------------------------------------------
// SUMMARY

let summary = '';
try {



    const summaryCont = document.querySelector('#about');
    if (summaryCont) {
        const summarySib = summaryCont.nextElementSibling?.nextElementSibling;
        if (summarySib) {
            const summaryDiv = summarySib.querySelector('div.inline-show-more-text--is-collapsed span[aria-hidden="true"]');

            if (summaryDiv) {
                summary = summaryDiv.textContent.trim();
                console.log('Summary Text:', summary);
            } else {
                console.error('Summarynot found.');
            }
        }
        else {
            console.log("Sibling div for summary not found.");
        }
    }
    else {
        console.log("#about not found.");
    }

} catch (error) {

    console.error("Summary extraction error", error);
}

// -------------------------------------------------
// EXPERIENCE


const experienceCont = document.querySelector('#experience');
let experiencesAll = [];
if (experienceCont) {
    const expSib = experienceCont.nextElementSibling?.nextElementSibling;
    if (expSib) {
        const expSubDivs = expSib.querySelectorAll('li.artdeco-list__item');

        expSubDivs.forEach((item) => {
            const titleEl = item.querySelector('span[aria-hidden="true"]');
            const jobTitle = titleEl ? titleEl.textContent.trim() : null;
            // if (jobTitle) experiencesAll.push(jobTitle);

            const companyEl = item.querySelector('span.t-14.t-normal span[aria-hidden="true"]');
            const company = companyEl ? companyEl.textContent.trim() : null;
            // if (company) experiencesAll.push(company);

            if (jobTitle || company) {
                experiencesAll.push({
                    JobTitle: jobTitle || "Unknown Title",
                    Company: company || "Unknown Company"
                });
            }
        });
        console.log("Experiences extracted: ", experiencesAll);
    }
    else {
        console.log("Sibling div not found.");
    }
}
else {
    console.log("#experience not found.");
}

// -------------------------------------------------
// EDUCATION


const eduCont = document.querySelector('#education');
let educationAll = [];
if (eduCont) {
    const eduSib = eduCont.nextElementSibling?.nextElementSibling;
    if (eduSib) {
        const eduSubDivs = eduSib.querySelectorAll('li.artdeco-list__item');

        eduSubDivs.forEach((item) => {
            const institutonEl = item.querySelector('div.display-flex.align-items-center.mr1.hoverable-link-text.t-bold span[aria-hidden="true"]');
            const instituton = institutonEl ? institutonEl.textContent.trim() : null;

            const majorEl = item.querySelector('span.t-14.t-normal span[aria-hidden="true"]');
            const major = majorEl ? majorEl.textContent.trim() : null;

            const durationEl = item.querySelector('span.t-14.t-normal.t-black--light span[aria-hidden="true"]');
            const duration = durationEl ? durationEl.textContent.trim() : null;

            if (instituton || major || duration) {
                educationAll.push({
                    Instituton: instituton || "Unknown instituion",
                    Major: major || "Unknown major",
                    Duration: duration || "Unknown duration"
                });
            }
        });
        console.log("Education extracted: ", educationAll);
    }
    else {
        console.log("Sibling div not found.");
    }
}
else {
    console.log("#education not found.");
}

// -------------------------------------------------
// CERTIFICATES

const certifCont = document.querySelector('#licenses_and_certifications');
let certificatesAll = [];
if (certifCont) {
    const certifSib = certifCont.nextElementSibling?.nextElementSibling;
    if (certifSib) {
        const certifSubDivs = certifSib.querySelectorAll('li.artdeco-list__item');

        certifSubDivs.forEach((item) => {
            const certifEl = item.querySelector('div.display-flex.align-items-center.mr1.t-bold span[aria-hidden="true"]');
            const certificate = certifEl ? certifEl.textContent.trim() : null;

            const orgEl = item.querySelector('span.t-14.t-normal span[aria-hidden="true"]');
            const organization = orgEl ? orgEl.textContent.trim() : null;

            const dateEl = item.querySelector('span.t-14.t-normal.t-black--light span[aria-hidden="true"]');
            const date = dateEl ? dateEl.textContent.trim() : null;

            if (certificate || organization || date) {
                certificatesAll.push({
                    Certificate: certificate || "Unknown certificate",
                    Organization: organization || "Unknown organization",
                    Date: date || "Unknown date"
                });
            }
        });
        console.log("Certificates extracted: ", certificatesAll);
    }
    else {
        console.log("Sibling div not found.");
    }
}
else {
    console.log("#licenses_and_certifications not found.");
}

// -------------------------------------------------
// CERTIFICATES

const skillsCont = document.querySelector('#skills');
let skillsAll = [];
if (skillsCont) {
    const skillsSib = skillsCont.nextElementSibling?.nextElementSibling;
    if (skillsSib) {
        const skillsDivs = skillsSib.querySelectorAll('div.display-flex.align-items-center.mr1.hoverable-link-text.t-bold span[aria-hidden="true"]');

        skillsDivs.forEach((element) => {
            const skill = element.textContent.trim();
            if (skill) {
                skillsAll.push(skill);
            }
        });
        console.log("Skills extracted: ", skillsAll);
    }
    else {
        console.log("Sibling div for Skills not found.");
    }
}
else {
    console.log("#skills not found.");
}

// -------------------------------------------------

data = {
    userName,
    summary,
    experiencesAll,
    educationAll,
    certificatesAll,
    skillsAll
};
console.log('Data Extraction:', data);

// Listen for the message from popup.js to send the extracted data
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'extractData') {
        sendResponse(data);  // Send the data object back to popup.js
    }
});


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "autofill") {
        const user = message.user;
        console.log(user);
        autofillForm(user);
    }
});

function autofillForm(user) {
    const selectors = {
        nameField: [
            "[name*='first_name']",
            "[name*='fname']",
            "input[aria-label*='first name']"
        ],
        surnameField: [
            "[name*='last_name']", 
            "input[aria-label*='last name']"
        ],
        fullnameField: [
            "[name*='full_name']",
            "[id*='full_name']",
            "[id='_systemfield_name']"
        ],
        locationField: [
            "[name*='address']",
            "[name*='location']",
            "[placeholder='Address']",
        ],
        education: [
            "[name*='edu']",
            "[name*='university']",
            "input[aria-label*='edu']"
        ],
        degreeField: [
            "[name*='degree']",
            "[name*='qualification']",
            "input[aria-label*='degree']"
        ],
        experience: [
            "[name*='company']",
            "[name*='workplace']",
            "input[aria-label*='company']"
        ],
        skills: [
            "[name*='skills']",
            "[name*='mail']",
            "[type='skills']"
        ],
        summary: [
            "[name*='phone']",
            "[name*='summary']",
            "[name*='telephone']",
        ]
    };

    function findInput(selectorList) {
        for (let selector of selectorList) {
            const field = document.querySelector(selector);
            if (field) return field;
        }
        return null;
    }

    const nameField = findInput(selectors.nameField);
    const surnameField = findInput(selectors.surnameField);
    const fullnameField = findInput(selectors.fullnameField);
    const locationField = findInput(selectors.locationField);
    const education = findInput(selectors.education);
    const experience = findInput(selectors.experience);
    const skills = findInput(selectors.skills);
    const summary = findInput(selectors.summary);

    if (nameField && user.fname) nameField.value = user.fname;
    if (surnameField && user.lname) surnameField.value = user.lname;
    if (fullnameField) {
        if (user.fname && user.lname) {
            fullnameField.value = `${user.fname} ${user.lname}`;
        } else if (user.fname) {
            fullnameField.value = user.fname;
        } else if (user.lname) {
            fullnameField.value = user.lname;
        }
    }
    if (locationField && user.location) locationField.value = user.location;
    if (education && user.edu) education.value = user.edu;
    if (experience && user.experience) experience.value = user.experience;    
    if (skills && user.skills) skills.value = user.skills;
    if (summary && user.summary) summary.value = user.summary;
}

