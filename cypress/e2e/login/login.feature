Feature: Login tests
 
  @ui
  @smoke
  @HRV-001
  Scenario: Successful login
    Given I am open the login page
    When Click login button on login page
    And Insert username "VVVDemoUserOne@hrvysthedge.onmicrosoft.com" and password "testRJO@2023" on login page
    Then Verify I successfully Logined to HRVYSTHEDGE

  @ui
  @HRV-002
  Scenario: Invalid login email error message
    Given I am open the login page
    When Click login button on login page
    Then Verify login error message while user enteres invalid email "test@test.onmicrosoft.com" on login page

  @ui
  @HRV-003
  Scenario: Invalid password error message
    Given I am open the login page
    When Click login button on login page
    Then Verify password error message while user enteres valid email "VVVDemoUserOne@hrvysthedge.onmicrosoft.com" and invalid password "test" on login page