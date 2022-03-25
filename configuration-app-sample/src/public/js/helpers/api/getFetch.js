import { fetchApi } from "./fetchApi.js";
import { renderHTML } from "../../../views/render.js";

export async function getFetch(formValues, method) {
  const url = `https://api.wxcc-us1.cisco.com/organization/${formValues.org}/${formValues.endpoint}?page=${formValues.page}&pageSize=${formValues.pageSize}`;
  const response = await fetchApi(url, method);
  try {
    // Traverse form
    const results = response.map(el => {
      const email = el.email;
      const getElements = el.name;
      if (formValues.endpoint === "team" || formValues.endpoint === "skill-profile" || formValues.endpoint === "contact-service-queue" || formValues.endpoint === "entry-point") {
        return `
    					<option class="result">${getElements}</option>
    					`;
      } else if (formValues.endpoint === "user") {
        return `
    					<option class="result">${email}</option>
    					`;
      }
    });
    //Render results
    renderHTML(formValues.endpoint, results);
  } catch (error) {
    console.log(error);
    if (response.error.key == 401) {
      // send back to re-authenticate
      const host = decodeURI(window.location.origin);
      location.href = `${host}/app.html`;
    } else {
      console.log("something went wrong");
    }
  }
}
