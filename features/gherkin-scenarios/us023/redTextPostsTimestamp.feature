Feature: US023 - Red Timestamps in "Popular" Section

  Scenario: Older than five days posts display red timestamps and younger don't in "Popular"

    Given I'm a logged in member
    When I go to the main page and choose the Popular filter
    Then I expect posts older than five days to display their timestamps in red, while posts younger than five days don't.
  
  Scenario: Older than five days posts in "New" don't display red timestamps

    Given I'm a logged in member in scenario 2
    When I go to the main page and choose the New filter
    Then I shouldn't see posts older than five days with the timestamp in red

  Scenario: Older than five days posts in "Unpopular" don't display red timestamps
  
    Given I'm a logged in member in scenario 3
    When I go to the main page and choose the Unpopular filter
    Then I shouldn't see posts older than five days with a red timestamp

  Scenario: If user isn't logged in, timestamps aren't displayed in red.
  
    Given I'm not logged in
    When I go to the main page and choose the Popular filter in scenario 4
    Then I shouldn't see posts older than five days with the timestamp in red in scenario 4
  
