import {exportPhindPair, exportPhindSearch, exportRandomPage} from "./extractPages";
import {fetchInfos, getUrl} from "../../webpage/getters";
import {formatFilename} from "../../formatUtils/formatText";
import {getPhindPageTitle} from "../catcher/catchMetadata";

export async function catchContent() {
  try {
    const url = getUrl();
    let markdownContent = "", title = "", siteName = "";
    switch (true) {
      case url.includes('www.phind.com/search'):
        markdownContent = await exportPhindSearch();
        title = getPhindPageTitle();
        siteName = "Phind-Search"
        break;
      case url.includes('www.phind.com/agent'):
        markdownContent = await exportPhindPair();
        title = getPhindPageTitle();
        siteName = "Phind-Agent";
        break;
      default: {
        return null;
        // markdownContent = await exportRandomPage();
        // title = document.title;
      }
    }
    const fileName = formatFilename(title, siteName); //???
    return {markdownContent, title, siteName, fileName};
  }
  catch (e) {
    console.log(e);
    const appInfos = await fetchInfos();
    alert(`Error while exporting page.\n\nPlease contact me at ${appInfos.CONTACT_EMAIL} with these information if the problem persists:\n≫ The steps to reproduce the problem\n≫ The URL of this page\n≫ The app version: ${appInfos.APP_VERSION}\n≫ Screenshots illustrating the problem\n\nThank you!`);
    return null;
  }
}