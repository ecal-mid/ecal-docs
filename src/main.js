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

const sidebarTemplate = require('templates/sidebar-elem.html');

let elBody = document.querySelector('body');

// Read the data and download everything / add to sidebar

var docdata = "";
const elSidebar = document.querySelector("sidebar");

async function readData(){
    const dataUrl = "assets/docdata.json";

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

async function main(){
    const url = "https://docs.google.com/document/d/e/2PACX-1vSp3pwrNr1KZ7WaATrc7Fsgyh9vBRbnzkEAPXWks0mjhYh24qXBFE0mQPYJSvyhv09VqyYYKM4Ttf-Y/pub";
    console.log("main function");
    try {
        // docdata = await readData().docs;
        // console.log("got here");
        // console.log(docdata);
        // docdata.forEach(el => {
        //     console.log(el);
            
        //     var html = sidebarTemplate({ name: el.name, url: el.url });
        //     console.log(html);
        //     elSidebar.appendChild(html);
            
        //     //<a class="mdc-list-item" href="#group1">
        //     //  <span class="mdc-list-item__text">Group 1</span>
        //     //</a>
        //     // Add the title to the sidebar

        // });
        // console.log(docdata);

        let table = await fetch(url);
        let text = await table.text();
        console.log(text);

        let frag = document.createRange().createContextualFragment(text);
        console.log(frag);
        
        let content = frag.querySelector("#contents");
        let styleNode = content.querySelector("style");
        styleNode.remove();

        // var arr = Array.from(nl);
        // arr.forEach(el => el.removeAttribute("style"))

        // console.log(frag.querySelector("table"));
        document.querySelector("main > div").replaceWith(frag.querySelector("#contents"));

        //todo remove styling

        // let parser = new DOMParser();
        // let htmlDoc = parser.parseFromString(text, 'text/html');
        // console.log(htmlDoc);

        // // let elTable = htmlDoc.querySelector("table")[0];
        // // console.log(elTable);
        // document.querySelector("main").appendChild(elTable);
    } catch (e) {
        console.log("Exception occured");
        console.log(e);
    }
}

main();
