Feature: Create contract
 
  @ui
  @smoke
  @HRV-000
  @HRV-009
  Scenario Outline: Order Entry | Contract | Basis | HTA | Create. Verify that a Contract can be created
    Given I am open the login page
    When Click login button on login page
    And Insert username "DDDDemoUserOne@hrvysthedge.onmicrosoft.com" and password "ZomgFire6!?" on login page
    When User clicks 'Settings' on home page
    And User clicks 'Bypass Review' on left menu on home page
    And User set "true" for Activate Bypass on home page
    And User clicks 'Contract Management' on home page
    When User clicks 'Actions Hub' button on home page
    And User clicks 'Create Contract' button on Actions Hub dropdown on home page
    When User create 'Contract' with following data
    | TheirContract | Transaction   | ContractNumber | Contract            | Bay_Sell | Commodity | DeliveryLocation | CropYear | DeliveryWindow | DeliveryDate | Quantity | FuturesMonth | FuturesPrice|
    | Test          | Cash Contract | empty          | <typeOfContract>    | buy      | Buckwheat | Test Location    | 2023     | Custom         | null         |  5000    | K23          | 6           |
    Then Verify that contract was succesfully created
   
   Examples:
   | typeOfContract |
   | Basis          |
  #  | Flat Price     |
    | HTA            |

  @ui
  @smoke
  @HRV-009
  @HRV-010
  @HRV-011
  Scenario: Order Entry | Contract | HTA | Create and Edit and Piced. Verify that a HTA Contract can be Created and Edited and Priced
    Given I am open the login page
    When Click login button on login page
    And Insert username "DDDDemoUserOne@hrvysthedge.onmicrosoft.com" and password "ZomgFire6!?" on login page
    When User clicks 'Settings' on home page
    And User clicks 'Bypass Review' on left menu on home page
    And User set "true" for Activate Bypass on home page
    And User clicks 'Contract Management' on home page
    When User clicks 'Actions Hub' button on home page
    And User clicks 'Create Contract' button on Actions Hub dropdown on home page
    When User create 'Contract' with following data
    | TheirContract | Transaction   | ContractNumber | Contract | Bay_Sell | Commodity | DeliveryLocation | CropYear | DeliveryWindow | DeliveryDate | Quantity | FuturesMonth | FuturesPrice|
    | Test          | Cash Contract | empty          | HTA      | buy      | Buckwheat | Test Location    | 2023     | Custom         | random       |  5000    | K23          | 5           |
    Then Verify that contract was succesfully created
    And Skip Alert if it is appear
    When User clicks 'Three dots' menu of created contract and select "Edit Contract" on home page
    And User edits Contract with following data
    | DeliveryLocation | DeliveryDate | Quantity | FuturesMonth | 
    | Osceola          | random       |  10000   | N23          | 
    Then Verify that contract was succesfully created
    And Skip Alert if it is appear
    When Retrive Hrvyst ID of created contract on home page
    And User clicks 'Three dots' menu of created contract and select "Price" on home page
    And User edits Price Contract with following data
    | QuantityToPrice | PostedBasis |  
    | 1000            | 0.5         |  
    And Skip Alert if it is appear
    Then Verify that a Contract can be Priced

  @ui
  @smoke
  @HRV-012
  @HRV-014
  Scenario: Order Entry | Contract | HTA | Roll and Cancel. Verify that a HTA Contract can be Rolled and Canceled
    Given I am open the login page
    When Click login button on login page
    And Insert username "DDDDemoUserOne@hrvysthedge.onmicrosoft.com" and password "ZomgFire6!?" on login page
    When User clicks 'Settings' on home page
    And User clicks 'Bypass Review' on left menu on home page
    And User set "true" for Activate Bypass on home page
    And User clicks 'Contract Management' on home page
    When User clicks 'Actions Hub' button on home page
    And User clicks 'Create Contract' button on Actions Hub dropdown on home page
    When User create 'Contract' with following data
    | TheirContract | Transaction   | ContractNumber | Contract | Bay_Sell | Commodity | DeliveryLocation | CropYear | DeliveryWindow | DeliveryDate | Quantity | FuturesMonth | FuturesPrice|
    | Test          | Cash Contract | empty          | HTA      | buy      | GreenCorn | Test Location    | 2023     | Custom         | random       |  5000    | K23          | 5           |
    Then Verify that contract was succesfully created
    And Skip Alert if it is appear  
    When Retrive Hrvyst ID of created contract on home page  
    And Skip Alert if it is appear  
    And User clicks 'Three dots' menu of created contract and select "Roll" on home page
    And User edits Roll Contract with following data
    | QuantityToRoll | FuturesMonth | Spread |
    | 2000           | N23          |  0.5   |
    And Skip Alert if it is appear  
    Then Verify that contract was succesfully rolled
    And Skip Alert if it is appear
    When User clicks 'Three dots' menu of created contract and select "Cancel Contract" on home page
    And User incerts Max amount to Cancel Contract on home page
    And User clicks 'Confirm' button on Cancel Contract on home page
    Then Verify that contract was succesfully cancelled

  @ui
  @smoke
  @HRV-013
  Scenario: Order Entry | Contract | HTA | Booking. Sytem should not provide option to book a HTA Contract
    Given I am open the login page
    When Click login button on login page
    And Insert username "DDDDemoUserOne@hrvysthedge.onmicrosoft.com" and password "ZomgFire6!?" on login page
    And Skip Alert if it is appear 
    And Skip Alert if it is appear 
    And Click three dots menu of random HTA contract on home page
    Then The three dots menu does not have the option to "Book" on home page
    