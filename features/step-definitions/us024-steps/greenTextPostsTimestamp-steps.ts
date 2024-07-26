import { Given, When, Then, BeforeAll, AfterAll } from "@wdio/cucumber-framework";
import { expect } from "@wdio/globals";
import loginPage from "../../pageobjects/login.page";
import postDetails from "../../pageobjects/postDetails.page";
import indexPage from "../../pageobjects/indexPage";
import { Element } from 'webdriverio';
import { exec } from 'child_process';
import us023seed from "../../../database/seeds/us023-seed";

// Seeding
BeforeAll(async () => {
  await us023seed();
});

// Page objects mapping
const pages: any = {
  login: loginPage,
  postDetails: postDetails,
  indexPage: indexPage,
};

// Function to log in a member using predefined credentials
const loginMember = async () => {
  const member = { username: "username", password: "password" };
  await pages.login.open();
  await pages.login.login(member.username, member.password);
};

// Function to get the color value of an element
const getColorValue = async (element: Element) => {
  const foundColor = await element.$('span:first-child').getCSSProperty('color');
  const colorValue = foundColor.value;
  return colorValue;
};

// Define expected color value as red
const color: string = 'rgba(0,128,0,1)';

// Function to get post containers from the main page
const getPostContainers = async () => {
  const firstPostContainer = await $("#root > div > div > div:nth-child(6)"); // Container for post created more than five days ago
  const secondPostContainer = await $("#root > div > div > div:nth-child(7)"); // Container for post created less than five days ago
  return { firstPostContainer, secondPostContainer };
};

// Initialize postContainers before all scenarios execution
let postContainers: { firstPostContainer: Element, secondPostContainer: Element };
BeforeAll(async () => {
  postContainers = await getPostContainers();
});

// Scenario: osts with less than two days must show their dates in green text
Given("I'm a logged in member", async () => {
  await loginMember();
});

When("I go to the main page and choose the Unpopular filter", async () => {
  await pages.postDetails.orderUnpopularLabel.click();
  await browser.pause(2000);
});

Then("I should see posts younger than two days with the timestamp in green", async () => {
  const { firstPostContainer } = postContainers;
  const timestampColor = await getColorValue(firstPostContainer);

  const { secondPostContainer } = postContainers;
  const timestampColorTwo = await getColorValue(secondPostContainer);

  expect(timestampColor).not.toBe(color); // post with more than five days
  expect(timestampColorTwo).toBe(color); // post with less than five days

  await browser.pause(2000);
});

// Scenario: Younger than two days posts in "New" don't display green timestamps
Given("I'm a logged in member in scenario 2", async () => {
  await loginMember();
});

When("I go to the main page and choose the New filter", async () => {
  await pages.postDetails.orderRecentLabel.click();
});

Then("I shouldn't see posts younger than two days with the timestamp in green", async () => {
  const { firstPostContainer } = postContainers;
  const timestampColor = await getColorValue(firstPostContainer);

  const { secondPostContainer } = postContainers;
  const timestampColorTwo = await getColorValue(secondPostContainer);

  expect(timestampColor).not.toBe(color); // post with more than five days
  expect(timestampColorTwo).not.toBe(color); // post with less than five days
});

// Scenario: Popular posts with less than two days don't show timestamps in green
Given("I'm a logged in member in scenario 3", async () => {
  await loginMember();
});

When("I go to the main page and choose the Popular filter", async () => {
  await pages.postDetails.orderPopularLabel.click();
});

Then("I shouldn't see posts younger than two days with a green timestamp", async () => {
  const { firstPostContainer } = postContainers;
  const timestampColor = await getColorValue(firstPostContainer);

  const { secondPostContainer } = postContainers;
  const timestampColorTwo = await getColorValue(secondPostContainer);

  expect(timestampColor).not.toBe(color); // post with more than five days
  expect(timestampColorTwo).not.toBe(color); // post with less than five days
});

// Scenario: If the user isn't logged in, timestamps aren't displayed in green
Given("I'm not logged in", async () => {
  await pages.indexPage.logoutButton.click(); // Ensure user isn't a logged in member
});

When("I go to the main page and choose the Unpopular filter in scenario 4", async () => {
  await pages.postDetails.orderPopularLabel.click();
});

Then("I shouldn't see posts with less than two days with the timestamp in green in scenario 4", async () => {
  const { firstPostContainer } = postContainers;
  const timestampColor = await getColorValue(firstPostContainer);

  const { secondPostContainer } = postContainers;
  const timestampColorTwo = await getColorValue(secondPostContainer);

  expect(timestampColor).not.toBe(color); // post with more than five days
  expect(timestampColorTwo).not.toBe(color); // post with less than five days
});

AfterAll(async () => {
  await new Promise((resolve, reject) => {
    exec('npm run db:delete:post', (error, stdout) => {
      if (error) {
        console.error(`Error during cleanup: ${error}`);
        reject(error);
      } else {
        console.log('Database cleanup completed');
        resolve(stdout);
      }
    });
  });
}); 