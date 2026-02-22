let interviewList = [];
let rejectedList = [];

const allCardSection = document.getElementById('all-tab');

const interviewCardSection = document.getElementById('interview-tab');

const rejectedCardSection = document.getElementById('rejected-tab');


const emptyJobSection = document.getElementById('empty-job-section');

const totalCount = document.getElementById('total-count');

const interviewCount = document.getElementById('interview-count');

const rejectedCount = document.getElementById('rejected-count');

const jobsCount = document.getElementById('jobs-count');



const totalAllCards = allCardSection.children.length;
const totalInterviewCards = interviewCardSection.children.length;
const totalRejectedCards = rejectedCardSection.children.length;

totalCount.innerText = totalAllCards;
interviewCount.innerText = totalInterviewCards;
rejectedCount.innerText = totalRejectedCards;





jobsCount.innerText = totalAllCards;






const tabs = document.querySelectorAll('.tab');

tabs.forEach(tab => {

    tab.addEventListener('click', (event) => {
        const selectedButton = event.target;

        
        // for Selecting different tabs =>
        tabs.forEach(tab => {
            tab.classList.remove('bg-[#3B82F6]', 'text-white');
        });
        
        selectedButton.classList.remove('bg-white', 'text-gray-500');
        selectedButton.classList.add('bg-[#3B82F6]', 'text-white');
       
        
        
        // Hide all the tabs before =>
        emptyJobSection.classList.add('hidden');
        allCardSection.classList.add('hidden');
        interviewCardSection.classList.add('hidden');
        rejectedCardSection.classList.add('hidden');



        const totalAllCards = allCardSection.children.length;
        const totalInterviewCards = interviewCardSection.children.length;
        const totalRejectedCards = rejectedCardSection.children.length;

        totalCount.innerText = totalAllCards;
        interviewCount.innerText = totalInterviewCards;
        rejectedCount.innerText = totalRejectedCards;



        // showing the card Section based on tab =>
        const selectedButtonID = selectedButton.id;

        if (selectedButtonID == "all-tab-btn") {
            allCardSection.classList.remove('hidden');

            //  Calulating Jobs Count on the way to make it more dynamic =>
            jobsCount.innerText = totalAllCards;
            
            // showing the default "no jobs available" section when tab has no jobs in the section =>
            if (jobsCount.innerText == '0') {
                emptyJobSection.classList.remove('hidden');
            }

        } else if (selectedButtonID == "interview-tab-btn") {
            interviewCardSection.classList.remove('hidden');

            if (totalInterviewCards == '0') {
                jobsCount.innerText = '0';
                emptyJobSection.classList.remove('hidden');

            } else {
                // for showing _ of _ cards =>
                jobsCount.innerText = `${totalInterviewCards} of ${totalAllCards}`; 
            }


        } else if (selectedButtonID == "rejected-tab-btn") {
            rejectedCardSection.classList.remove('hidden');

            if (totalRejectedCards == '0') {
                jobsCount.innerText = '0';
                emptyJobSection.classList.remove('hidden');

            } else {
                jobsCount.innerText = `${totalRejectedCards} of ${totalAllCards}`;
            }

        }

    })
});



document.addEventListener('click', (event) => {
    const button = event.target.closest('.toggle-btn');

    // making sure it is intervie or rejected toggle button =>
    if(!button){
        return;
    }

    // getting the card for the button and information =>
    const clickedCard = event.target.closest('.card');

    const companyName = clickedCard.querySelector('.company-name').innerText;
    const position = clickedCard.querySelector('.position').innerText;
    const locationTypeSalary = clickedCard.querySelector('.location-type-salary').innerText;
    const description = clickedCard.querySelector('.description').innerText;



    // if the button is interview then =>
    if (button.innerText == "INTERVIEW") {

        // get the design of clicked Card status =>
        let currentStatus = clickedCard.querySelector('.stat');
        currentStatus.innerText = "INTERVIEW";
        currentStatus.classList.remove('bg-red-500', 'border-red-400', 'text-white');
        currentStatus.classList.remove('bg-[#EEF4FF]', 'text-[#002C5C]', 'border-black');
        currentStatus.classList.add('bg-green-500', 'border-green-400', 'text-white');

        // setting up the object to show in filtered Section =>
        const object = {
            companyName,
            position,
            locationTypeSalary,
            description,
            stat: "INTERVIEW"
        }

        // if object alreadys exists in the not adding again =>
        const Existing = interviewList.find(item =>
            item.companyName == object.companyName && item.position == object.position);

        if (!Existing) {
            interviewList.push(object);
        }

        // filtering it out from  other list =>
        rejectedList = rejectedList.filter(item => !(item.companyName == object.companyName && item.position == object.position));

        // updating the Original card status =>
        updateAllTabCard(companyName,position, "INTERVIEW");

        // if the button is Rejected then =>
    } else if (button.innerText == "REJECTED") {

        let currentStatus = clickedCard.querySelector('.stat');
        currentStatus.innerText = "REJECTED";
        currentStatus.classList.remove('bg-green-500', 'border-green-400', 'text-white');
        currentStatus.classList.remove('bg-[#EEF4FF]', 'text-[#002C5C]', 'border-black');
        currentStatus.classList.add('bg-red-500', 'border-red-400', 'text-white');


        const object = {
            companyName,
            position,
            locationTypeSalary,
            description,
            stat: "REJECTED"
        }


        // does the item exist in the rejected list =>
        const Existing = rejectedList.find(item =>
            item.companyName == object.companyName && item.position == object.position);

            // if it does not then add to it =>
        if (!Existing) {
            rejectedList.push(object);
        }


        // filtering it out from other list =>
        interviewList = interviewList.filter(item => !(item.companyName == object.companyName && item.position == object.position));

        // updating the Original card status =>
        updateAllTabCard(companyName,position, "REJECTED");
    }

    
    
    //Appending to the Section and rendering it =>
    AppendToSection(interviewCardSection, interviewList);
    AppendToSection(rejectedCardSection, rejectedList);

})


function updateAllTabCard(companyName, position, newStatus){

        // getting all the original cards =>
        const Allcards = allCardSection.querySelectorAll('.card');

        // go through all cards and find the orignial card which's interview/rejected toggle button has been clickedd =>
        Allcards.forEach(card => {

            const cardCompanyName = card.querySelector('.company-name').innerText;
            const cardPosition = card.querySelector('.position').innerText;

            if(cardCompanyName == companyName && cardPosition == position) {
                const statofElement = card.querySelector('.stat');
                statofElement.innerText = newStatus;

                // 
                statofElement.classList.remove(
                    'bg-green-500',
                    'border-green-400',
                    'bg-red-500',
                    'border-red-400',
                    'text-white'
                )

                // if interview button is clicked then change the card's status to interview style or same for the rejected button =>
                if (newStatus == "INTERVIEW") {
                    statofElement.classList.add('bg-green-500','border-green-400','text-white');
                }else if(newStatus == "REJECTED") {
                    statofElement.classList.add('bg-red-500','border-red-400','text-white');
                }
            }
        })
    }


    
function AppendToSection(cardSection, objectlist) {
    cardSection.innerHTML = "";


    for (let object of objectlist) {

        // making sure that the card we append to interview/rejected section has proper status styling =>
        let statClass = "";
        if (object.stat === "INTERVIEW") {
            statClass = "bg-green-500 border-green-400 text-white"
        } else if (object.stat === "REJECTED") {
            statClass = 'bg-red-500 border-red-400 text-white';
        }

        // creating Element to append to the interview/rejected section =>
        const newDiv = document.createElement('div');

        newDiv.className = "card p-6 border border-gray-300 bg-white space-y-5 shadow-lg";
        newDiv.innerHTML = `<div class="flex justify-between items-center">
                        <div class="space-y-1">
                            <h4 class="text-lg font-semibold text-[#002C5C] company-name">${object.companyName}</h4>
                            <p class="text-[#64748B] position">${object.position}</p>
                        </div>
                        <div class="w-10 h-10 border-2 border-gray-300 flex items-center justify-center rounded-full">
                            <div class="w-6 h-6 border border-gray-300  flex items-center justify-center opacity-60">
                                <button class="btn btn-neutral btn-ghost"><i class="fa-regular fa-trash-can"></i></button>
                            </div>
                        </div>
                    </div>

                    <p class="text-sm text-[#64748B] location-type-salary">${object.locationTypeSalary}</p>

                    <div class="flex flex-col gap-2">
                        <p
                            class="stat rounded-md px-3 py-2 w-fit  text-sm font-medium border-2 ${statClass}">
                            ${object.stat}</p>
                        <p class="text-[#323B49] text-sm description">${object.description}</p>
                    </div>

                    <div class="flex gap-2">
                        <button
                            class="toggle-btn btn btn-success btn-soft font-semibold text-sm border border-green-400 px-3 py-2 rounded-sm">INTERVIEW</button>
                        <button
                            class="toggle-btn btn btn-error btn-soft  font-semibold text-sm border border-red-500 px-3 py-2 rounded-sm">REJECTED</button>
                    </div>`



        cardSection.appendChild(newDiv);
    }


    // calculating count =>
    const totalAllCards = allCardSection.children.length;
    const totalInterviewCards = interviewCardSection.children.length;
    const totalRejectedCards = rejectedCardSection.children.length;

    totalCount.innerText = totalAllCards;
    interviewCount.innerText = totalInterviewCards;
    rejectedCount.innerText = totalRejectedCards;

    if (!allCardSection.classList.contains('hidden')) {
        jobsCount.innerText = totalAllCards;

    }

    else if (!interviewCardSection.classList.contains('hidden')) {

        if (totalInterviewCards == 0) {
            jobsCount.innerText = '0'
        } else {
            jobsCount.innerText = `${totalInterviewCards} of ${totalAllCards}`
        }
    }

    else if (!rejectedCardSection.classList.contains('hidden')) {

        if (totalRejectedCards == 0) {
            jobsCount.innerText = '0'

        } else {
            jobsCount.innerText = `${totalRejectedCards} of ${totalAllCards}`
        }
    }

    // making sure after changes of count if count is zero then default "no job section" is shown
    if (jobsCount.innerText == '0') {
        emptyJobSection.classList.remove('hidden');
    }
}

