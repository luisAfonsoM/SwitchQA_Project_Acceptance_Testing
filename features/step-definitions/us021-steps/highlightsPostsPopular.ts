import { Given, When, Then } from "@wdio/cucumber-framework";
import indexPage from "../../pageobjects/indexPage";
import loginPage from "../../pageobjects/login.page";
import submitPostPage from "../../pageobjects/submitPost.page";
import postDetailsPage from "../../pageobjects/postDetails.page";

const pages: any = {
    login: loginPage,
    submitPostPage: submitPostPage,
    postDetails: postDetailsPage,
    indexPage: indexPage,
};

const greenColor: string = "rgba(0,128,0,1)"
const noColor: string = "rgba(0,0,0,0)"

const loginMember = async () => {
    const member = { username: "PopularPost", password: "PopularPost"}
    await pages.login.open()
    await pages.login.login(member.username, member.password)
};

//1 - Post with at least one comment
Given("a registered member is logged into the DDD forum", async()=>{
    await loginMember();
})
 
When("the option to sort by popular is selected", async()=>{
    await browser.pause(200)
})
 
When("there is a post with a title {string}", async (title) => {
    await pages.indexPage.getPostByTitle(title);
  });
 
Then("this post should display background color", async () => {
    const postContainer = await $("#root > div > div > div:nth-child(10)"); // Typescript #root > div > div > div:nth-child(6)
    const computedStyle = await postContainer.getCSSProperty("background-color");
    const backgroundColor = computedStyle.value;
    expect(backgroundColor).toBe(greenColor);
});
 
//2 - No Highlight for Posts without Comments
Given("the visitor is on the dddforum webpage", async () => {
    await pages.indexPage.logoutButton.click();
});
 
When("visitor selects sort by popular posts option", async () => {
    await pages.postDetails.orderPopularLabel.click();
    await browser.pause(200);
});
 
 
Then("posts should not have background color", async () => {
    const postContainer = await $("#root > div > div > div:nth-child(10)"); // Typescript #root > div > div > div:nth-child(6)
    const computedStyle = await postContainer.getCSSProperty("background-color");
    const backgroundColor = computedStyle.value;
    expect(backgroundColor).toBe(noColor);
});

