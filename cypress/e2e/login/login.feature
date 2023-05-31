Feature: Login tests
  As a registered user
  I want to be able to login
  So that I can access my account

  Scenario: Successful login
    Given I am open the login page
    When Click login button on login page
    And Insert username "VVVDemoUserOne@hrvysthedge.onmicrosoft.com" and password "TrackStar12@" on on login page
    