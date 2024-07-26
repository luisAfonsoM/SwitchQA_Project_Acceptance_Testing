Feature: Highlights for Posts in Popular Section

  Scenario: 1 - Highlight Posts with 2/3 of Most Popular Comments
    Given a registered member is logged into the DDD forum
    When the option to sort by popular is selected
    And there is a post with a title "Post with 0 comments testing superior limit"
    Then this post should display background color

  Scenario: 2 - No Highlight for Posts without Comments
    Given the visitor is on the dddforum webpage
    When visitor selects sort by popular posts option
    Then posts should not have background color
    