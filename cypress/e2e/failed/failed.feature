Feature: Login
  As a registered user
  I want to be able to login
  So that I can access my account

  Scenario: Successful login
    Given I am on the login page
    When I enter valid credentials
    And click the login button
    Then I should be redirected to the dashboard page
    And see a welcome message