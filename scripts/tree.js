document.getElementById("tree__text--citi").addEventListener("click", expandTree);
document.getElementById("tree__text--sky").addEventListener("click", collapseTree);
var element = document.getElementById("tree__subtree");

// from https://cssanimation.rocks/scroll-animations/
const callback = function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("is-visible"); // if visible is set remove it, otherwise add it
        } else {
            entry.target.classList.remove("is-visible");
        }
    });
};
const observer = new IntersectionObserver(callback);
const target = document.querySelector(".show-on-scroll");
observer.observe(target);

const observer2 = new IntersectionObserver(callback);
const target2 = document.querySelector(".show-on-scroll2");
observer2.observe(target2);



async function expandTree() {
    for(child of element.children) {
        if (child.className == 'tree__branch--vertical') { //check if style child is there already
            var styleElem = child.appendChild(document.createElement("style"));
            styleElem.innerHTML = "#tree__subtree .tree__branch--vertical:after { animation-delay: 0s; }";
        }
    }
    element.classList.remove("tree__subtree--collapse");
    element.classList.add("tree__subtree--expand");
}

function collapseTree() {
    element.classList.add("tree__subtree--collapse");
    element.classList.remove("tree__subtree--expand");
}

