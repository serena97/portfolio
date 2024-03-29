import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WorkComponent implements OnInit {
  title = 'personal-portfolio';
  verticalBranches = [];

  constructor() { 
  }

  ngOnInit() {
    const element = document.getElementById("tree__subtree");
    const selectionList = document.querySelectorAll('.tree__text--selectable');

    const expandTree = () => {
      for (const child of Array.from(element.children)) {
        if (child.className == 'tree__branch--vertical') { //check if style child is there already
          var styleElem = child.appendChild(document.createElement("style"));
          styleElem.innerHTML = "#tree__subtree .tree__branch--vertical:after { animation-delay: 0s; }";
          this.verticalBranches.push(styleElem);
        }
      }
      element.classList.remove("tree__subtree--collapse");
      element.classList.add("tree__subtree--expand");
      void this.selectItem(selectionList, document.getElementById("fx"))
    }

    const collapseTree = () => {
      element.classList.add("tree__subtree--collapse");
      element.classList.remove("tree__subtree--expand");
    }

    document.getElementById("citi").addEventListener("click", expandTree);
    document.getElementById("sky").addEventListener("click", collapseTree);

    // from https://cssanimation.rocks/scroll-animations/
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
    //TODO: refactor
    const callback2 = (entries) => { // shouldn't use function(entries), or else keyword this will refer to callback https://stackoverflow.com/questions/50097907/cannot-access-this-from-nested-function-in-angular4
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible"); // if visible is set remove it, otherwise add it

        } else {
          entry.target.classList.remove("is-visible");
        }
      });
    };

    const observer = new IntersectionObserver(callback); //{ root: document.body }
    const target = document.querySelector(".show-on-scroll");
    observer.observe(target);

    const observer2 = new IntersectionObserver(callback2);
    const target2 = document.querySelector(".show-on-scroll2");
    observer2.observe(target2);

    selectionList.forEach(element => {
      element.addEventListener('click', () => this.selectItem(selectionList, element));
    });
  }

  async selectItem(selectionList, element) {
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
