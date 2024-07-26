import { Given, When, Then } from "@wdio/cucumber-framework";
import { expect } from "@wdio/globals";
import registerPage from "../../pageobjects/register.page";
import loginPage from "../../pageobjects/login.page";
import memberDetails from "../../pageobjects/memberDetails.page";
import submitPost from "../../pageobjects/submitPost.page";
import postDetails from "../../pageobjects/postDetails.page";
import statisticsPage from "../../pageobjects/statistics.page";


const pages: any = {
  registerPage: registerPage,
  login: loginPage,
  memberPage: memberDetails,
  submitPost: submitPost,
  postDetails: postDetails,
  statisticsPage: statisticsPage,
};

const member = { username: "NataliLucas", email: "natalilucas@dddforum.com", password: "1222649" };
 
Given("a member is logged into DDD Forum", async () => {
    await pages.login.open();
    await pages.login.login(member.username, member.password);
    await browser.pause(2000); 
    await pages.statisticsPage.loggedMemberStatistics();
    await browser.pause(2000); 
  });
  When("I enter the statistics page, type the date {string} and click submit for box 5", async (date: string) => {
    await pages.statisticsPage.enterDate(4, date);
    await browser.pause(2000); 
    await pages.statisticsPage.clickSubmit(4);
    await browser.pause(2000); 
  });

  Then("the system displays the usernames that didn't interact in any way on the screen {string}", async (expectedResult: string) => {
    await browser.waitUntil(async () => {
      const resultText = await pages.statisticsPage.getResultTextContent(4);
      return resultText.includes(expectedResult);
    }, {
      timeout: 5000,
      timeoutMsg: `Result did not contain "${expectedResult}" within 1 seconds`
    });
    const resultText = await pages.statisticsPage.getResultTextContent(4);
    expect(resultText).toBe(expectedResult);
  });