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

        emptyJobSection.classList.add('hidden');


        tabs.forEach(tab => {
            tab.classList.remove('bg-[#3B82F6]', 'text-white');
        });

        selectedButton.classList.remove('bg-white', 'text-gray-500');
        selectedButton.classList.add('bg-[#3B82F6]', 'text-white');


        allCardSection.classList.add('hidden');
        interviewCardSection.classList.add('hidden');
        rejectedCardSection.classList.add('hidden');



        const totalAllCards = allCardSection.children.length;
        const totalInterviewCards = interviewCardSection.children.length;
        const totalRejectedCards = rejectedCardSection.children.length;

        totalCount.innerText = totalAllCards;
        interviewCount.innerText = totalInterviewCards;
        rejectedCount.innerText = totalRejectedCards;

        

        const selectedButtonID = selectedButton.id;

        if (selectedButtonID == "all-tab-btn") {
            allCardSection.classList.remove('hidden');
            jobsCount.innerText = totalAllCards;

            if (jobsCount.innerText == '0') {
                emptyJobSection.classList.remove('hidden');
            }

        } else if (selectedButtonID == "interview-tab-btn") {
            interviewCardSection.classList.remove('hidden');

            if (totalInterviewCards == '0') {
                jobsCount.innerText = '0';
                emptyJobSection.classList.remove('hidden');

            } else {
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



const stat = document.querySelectorAll('.stat');



document.addEventListener('click', (event) => {
    const button = event.target.closest('.toggle-btn');

    const clickedCard = event.target.closest('.card');

    const companyName = clickedCard.querySelector('.company-name').innerText;
    const position = clickedCard.querySelector('.position').innerText;
    const locationTypeSalary = clickedCard.querySelector('.location-type-salary').innerText;
    const description = clickedCard.querySelector('.description').innerText;




    if (event.target.innerText == "INTERVIEW") {

        let currentStatus = clickedCard.querySelector('.stat');
        currentStatus.innerText = "INTERVIEW";
        currentStatus.classList.remove('bg-red-500', 'border-red-400', 'text-white');
        currentStatus.classList.remove('bg-[#EEF4FF]', 'text-[#002C5C]', 'border-black');
        currentStatus.classList.add('bg-green-500', 'border-green-400', 'text-white');

        const object = {
            companyName,
            position,
            locationTypeSalary,
            description,
            stat: "INTERVIEW"
        }


        const Existing = interviewList.find(item =>
            item.companyName == object.companyName && item.position == object.position && item.locationTypeSalary == object.locationTypeSalary && item.description == object.description);

        if (!Existing) {
            interviewList.push(object);
        }

        rejectedList = rejectedList.filter(item => item.companyName != object.companyName);



    } else if (event.target.innerText == "REJECTED") {

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


        const Existing = rejectedList.find(item =>
            item.companyName == object.companyName && item.position == object.position && item.locationTypeSalary == object.locationTypeSalary && item.description == object.description);

        if (!Existing) {
            rejectedList.push(object);
        }


        interviewList = interviewList.filter(item => item.companyName != object.companyName);

    }

    AppendToSection(interviewCardSection, interviewList);
    AppendToSection(rejectedCardSection, rejectedList);

})




function AppendToSection(cardSection, objectlist) {
    cardSection.innerHTML = "";


    for (let object of objectlist) {

        let statClass = "";

        if (object.stat === "INTERVIEW") {
            statClass = "bg-green-500 border-green-400 text-white"
        } else if (object.stat === "REJECTED") {
            statClass = 'bg-red-500 border-red-400 text-white';
        }

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
        
        if(totalInterviewCards == 0){
            jobsCount.innerText = '0'
        }else{
            jobsCount.innerText = `${totalInterviewCards} of ${totalAllCards}`
        }
    }

    else if (!rejectedCardSection.classList.contains('hidden')) {
        
        if(totalRejectedCards == 0){
            jobsCount.innerText = '0'

        }else{
            jobsCount.innerText = `${totalRejectedCards} of ${totalAllCards}`
        }
    }
}


