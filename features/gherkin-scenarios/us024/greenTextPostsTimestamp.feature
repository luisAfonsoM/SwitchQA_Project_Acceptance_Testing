Feature: US024 - Green Timestamps in "Unpopular" Section

  Scenario: Posts with less than two days must show their dates in green text
    Given I'm a logged in member
    When I go to the main page and choose the Unpopular filter
    Then I should see posts younger than two days with the timestamp in green

  Scenario: Younger than two days posts in "New" don't display green timestamps
    Given I'm a logged in member in scenario 2
    When I go to the main page and choose the New filter
    Then I shouldn't see posts younger than two days with the timestamp in green

  Scenario: Popular posts with less than two days don't show timestamps in green
    Given I'm a logged in member in scenario 3
    When I go to the main page and choose the Popular filter
    Then I shouldn't see posts younger than two days with a green timestamp

  Scenario: If the user isn't logged in, timestamps aren't displayed in green
    Given I'm not logged in
    When I go to the main page and choose the Unpopular filter in scenario 4
    Then I shouldn't see posts with less than two days with the timestamp in green in scenario 4
