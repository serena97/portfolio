const work_exp = {
    "ft": {
        name: "Financial Times",
        title: "Senior Software Engineer",
        duration: "Sep 2021 - Current",
        description: [
        "As part of the platforms team, I am responsible for maintaining the CDN and core frameworks of ft.com, and creating tooling to improve developer experience across the department using Typescript and Nodejs",
        "Examples include refactoring VCL code to make the Fastly CDN much more maintainable, completing department wide docker image and npm/node migrations, developing new CI/CD tooling that is quicker and more reliable to run on circleci, rotating AWS keys, and supporting other developers that have platform specific issues"
        ]
    },
    "cfg": {
        name: "Code First Girls",
        title: "Python / Web Development Volunteer Instructor",
        duration: "Sep 2021 - Current",
        description: [
        "Taught a python fundamentals course and another introduction to web development course to 16 students over 8 sessions, helping young women to get into tech"
        ]
    },
    "citi_avp": {
        name: "Citi",
        title: "Software Engineer (Assistant Vice President)",
        duration: "Jul 2020 - Sep 2021",
        description: [
        "Contributed to the development of the Citi Velocity web application, a market leading single dealer trading platform. Developed with Angular/TypeScript/HTML/Sass, interacted with internal salespeople to clarify requirements, and worked closely with QA, UX and a large team of developers across different timezones.",
        "Successfully lead the development of a new CI/CD pipeline (Docker, Jenkins, Openshift, uDeploy) for the project, retiring from the legacy pipeline.",
        "Spearheaded the pilot Citi London Apprenticeship Programme by working with HR and other business partners, improving diversity within the organisation, and mentoring a software developer apprentice"
        ]
    },
    "citi_grad": {
        name: "Citi",
        title: "Software Engineer (Graduate)",
        duration: "Aug 2018 - Jul 2020",
        description: [
        "Contributed to developing a high-performance LTA Commodities eTrading platform, writing business logic in python and working closely with traders.",
        "Developed a regression test for the eTrading pricing platform to ensure that changes made to the codebase will still price with the expected ticks, and also to help traders fine tune their prices by running with different parameters on historical data.",
        "Contributed to developing the Citi Velocity FX desktop application with C#, and collaborated with the QA, UX and server side team to deliver requirements. Created an application with React, to monitor the engineering excellence levels across all repository in Citi."
        ]
    },
    "sky": {
        name: "Sky",
        title: "Software Engineer (Intern)",
        duration: "Aug 2017 - Sep 2017",
        description:
        [
        "Contributed to developing an app using React that monitors other application endpoints"
        ]
    }
}

function initShowOnScroll() {
    const callback = (entries) => { // shouldn't use function(entries), or else keyword this will refer to callback https://stackoverflow.com/questions/50097907/cannot-access-this-from-nested-function-in-angular4
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible"); // if visible is set remove it, otherwise add it
          } else {
            entry.target.classList.remove("is-visible");
            for (const v of this.verticalBranches) {
              v.innerHTML = "#tree__subtree .tree__branch--vertical:after { animation-delay: 2s; }";
            }
          }
        });
    };

    const observer = new IntersectionObserver(callback); //{ root: document.body }
    const target = document.querySelector(".show-on-scroll");
    observer.observe(target);

    const selectionList = document.querySelectorAll('.tree__text');

    selectionList.forEach(element => {
        element.addEventListener('click', () => selectItem(selectionList, element));
    });
}

async function selectItem(selectionList, element: Element): Promise<void> {
    selectionList.forEach(e => e.classList.remove("selected"));
    element.classList.add("selected");
    const id = element.id
    const container = document.getElementById('xp-description')
    container.textContent = ''

    //animate typewriter with js
    const titleNode = document.createElement('div')
    titleNode.classList.add('xp-description__title')
    const title = [work_exp[id].title, ` @ ${work_exp[id].name}`]

    typeWriter(titleNode, title[0]).then(x => {
        const titleSubnode = document.createElement('span')
        titleSubnode.classList.add('xp-description__name')
        titleNode.appendChild(titleSubnode)
        typeWriter(titleSubnode, title[1])
    })
    
    container.appendChild(titleNode)
}


async function typeWriter(titleNode, title): Promise<void> {
    async function task(i) { // 3
        await new Promise(res => setTimeout(res, 200));
        titleNode.innerHTML += title[i]
        console.log(`Task ${i} done!`);
    }

    for(var i = 0; i < title.length; i++) {
        await task(i)
    }
}

function main() {
    initShowOnScroll();
}

main();