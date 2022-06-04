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
    const callback = (entries) => {
        entries.forEach((entry) => {
            console.log(entry)
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          } else if (entry.boundingClientRect.y > 0) { // so the animation only happens when you scroll from top to bottom
            entry.target.classList.remove("is-visible");
          }
        });
    };

    const observer = new IntersectionObserver(callback);
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

    const detailsNode = document.createElement('div')


    typeWriter(titleNode, title[0])
    .then(_ => {
        const titleSubnode = document.createElement('span')
        titleSubnode.classList.add('xp-description__name')
        titleNode.appendChild(titleSubnode)
        return typeWriter(titleSubnode, title[1])
    }).then(_ => {
        detailsNode.classList.add('xp-description__details')
        const durationNode = document.createElement('div')
        durationNode.innerHTML = work_exp[id].duration
        detailsNode.appendChild(durationNode)
        const ulNode = document.createElement('ul')
        work_exp[id].description.forEach(data => {
            const li = document.createElement('li')
            li.innerHTML = data
            ulNode.appendChild(li)
        })
        detailsNode.appendChild(ulNode)
    })

    container.appendChild(titleNode)
    container.appendChild(detailsNode)
}

function createHTMLList(list) {
    list.forEach(data => {
        const li = document.createElement('li')
        li.innerHTML = data
        li.appendChild(li)
    })
}

async function typeWriter(titleNode, title): Promise<void> {
    async function task(i) {
        await new Promise(res => setTimeout(res, 50));
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