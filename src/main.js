import {MDCList} from "@material/list";
import {MDCTopAppBar} from "@material/top-app-bar";
import {MDCDrawer} from "@material/drawer";

const list = MDCList.attachTo(document.querySelector('.mdc-list'));
list.wrapFocus = true;

const drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
const topAppBar = MDCTopAppBar.attachTo(document.getElementById('app-bar'));
topAppBar.setScrollTarget(document.getElementById('main-content'));
topAppBar.listen('MDCTopAppBar:nav', () => {
  drawer.open = !drawer.open;
});
drawer.open = true;

let elBody = document.querySelector('body');

// Templates
const tSidebarItem = document.querySelector("#sidebaritem");

var docdata = "";
const elSidebar = document.querySelector("#sidebar");

async function readData(){
    const dataUrl = "config/docdata.json";

    try {
        let data = await fetch(dataUrl);
        let docdata = await data.json();
        return docdata;
    } catch (e) {
        console.log("Errors are here 😭");
        console.log(e);
        throw (e);
    }
}

async function loadGoogleDocHTML(url){
    let page = await fetch(url);
    let text = await page.text();

    let frag = document.createRange().createContextualFragment(text);
        
    let content = frag.querySelector("#contents");
    let styleNode = content.querySelector("style");
    styleNode.remove();
    document.querySelector("main > div").replaceWith(frag.querySelector("#contents"));
}

async function main(){
    try {
        docdata = await readData();
        docdata.docs.forEach(el => {
            let clone = document.importNode(tSidebarItem.content, true);
            
            let elA = clone.querySelector('a');
            elA.setAttribute('data-url', el.url);
            elA.setAttribute('href', '#');
            elA.addEventListener('click', (evt) => {
                loadGoogleDocHTML(evt.target.dataset.url);
            });
            let elSpan = clone.querySelector('span');
            elSpan.innerHTML = el.name;
            elSidebar.appendChild(clone);
        });

        loadGoogleDocHTML(docdata.docs[0].url);

    } catch (e) {
        console.log("Exception occured");
        console.log(e);
    }
}

main();