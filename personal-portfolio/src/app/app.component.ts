import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'personal-portfolio';
  verticalBranches = [];
  element = document.getElementById("tree__subtree");

  constructor() {}

  ngOnInit() {
    document.getElementById("citi").addEventListener("click", expandTree);
    document.getElementById("sky").addEventListener("click", collapseTree);

    // from https://cssanimation.rocks/scroll-animations/
    const callback = function(entries) {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add("is-visible"); // if visible is set remove it, otherwise add it
          } else {
              entry.target.classList.remove("is-visible");
              for(const v of this.verticalBranches) {
                  v.innerHTML = "#tree__subtree .tree__branch--vertical:after { animation-delay: 2s; }";
              }
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
        for(const child of this.element.children) {
            if (child.className == 'tree__branch--vertical') { //check if style child is there already
                var styleElem = child.appendChild(document.createElement("style"));
                styleElem.innerHTML = "#tree__subtree .tree__branch--vertical:after { animation-delay: 0s; }";
                this.verticalBranches.push(styleElem);
            }
        }
        this.element.classList.remove("tree__subtree--collapse");
        this.element.classList.add("tree__subtree--expand");
    }

    function collapseTree() {
        this.element.classList.add("tree__subtree--collapse");
        this.element.classList.remove("tree__subtree--expand");
    }

    const selectionList = document.querySelectorAll('.tree__text--selectable');
    selectionList.forEach(element => {
      element.addEventListener('click', () => selectItem(element));
    });

    async function selectItem(element) {
        selectionList.forEach(e => e.classList.remove("selected"));
        const children: any = document.querySelectorAll(".work-experience--child")
        for (const e of children) {
            e.style.visibility = "hidden"
            e.style.height = 0;
            e.children[0].classList.remove("work-experience--title"); //for animation to rerender
            e.children[1].classList.remove("work-experience--details");
        };
        element.classList.add("selected");
        let div = document.getElementsByClassName(element.id)[0] as HTMLElement;
        div.style.visibility = "visible"; 
        div.style.height = "100%"; 
        void (div.children[0] as HTMLElement).offsetWidth; // https://stackoverflow.com/questions/60686489/what-purpose-does-void-element-offsetwidth-serve
        void (div.children[1] as HTMLElement).offsetWidth;
        div.children[0].classList.add("work-experience--title");
        div.children[1].classList.add("work-experience--details");
    }
    }
}
