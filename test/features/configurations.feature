@configuration @regression
Feature: Claim Module - Configurations
  As an expense claim team member
  I want to be able to configure event and expense types for claims records
  So that the claim records can be categorized accordingly

  Background: Login to Orangehrm site
    Given the admin user login to Orangehrm site
    And the user views the "Claim" Module
    Then the "Claim" page is displayed

  @smoke
  Scenario Outline: Validate create a Claim Event type with valid inputs
    Given the user views the "Events" type records
    When the user fills-up the "event" type details for new record with the following
      | key         | value         |
      | Event Name  | <name>        |
      | Description | <description> |
      | Is Active   | <isActive>    |
    And the user save the "event" type details
    Then the "event" type record is added successfully

    Examples:
      | name                                                                                                 | description | isActive |
      | Learning & Development                                                                               | qwerty      | true     |
      | Meals & Allowances                                                                                   |             | true     |
      | Test100CharactersKLZXCVBNM1234567890!@#$%^&**() <>?":{}][~`QWERTYUIOPASDFGHJKLZXCVBNM1234567890!@#$% |             | false    |

  Scenario Outline: Validate create a Claim Event type with invalid inputs
    Given the user views the "Events" type records
    When the user fills-up the "event" type details for new record with the following
      | key         | value         |
      | Event Name  | <name>        |
      | Description | <description> |
      | Is Active   | <isActive>    |
    And the user save the "event" type details
    Then adding the event type record is not successful
    And an inline message is displayed
      | key     | value     |
      | message | <message> |

    Examples:
      | name                                                                                                  | message                          |
      |                                                                                                       | Required                         |
      | Test101CharactersKLZXCVBNM1234567890!@#$%^&**() <>?":{}][~`QWERTYUIOPASDFGHJKLZXCVBNM1234567890!@#$%^ | Should not exceed 100 characters |

  Scenario: Validate creating a duplicate Claim Event record
    Given the user views the "Events" type records
    And the user fills-up the "event" type details for new record with the following
      | key        | value               |
      | Event Name | Travel & Allowances |
    And the user save the "event" type details
    And the "event" type record is added successfully
    When the user fills-up the "event" type details for new record with the following
      | key        | value               |
      | Event Name | Travel & Allowances |
    Then adding the event type record is not successful
    And an inline message is displayed
      | key     | value          |
      | message | Already exists |

  @smoke
  Scenario Outline: Validate create a Claim Expense type with valid inputs
    Given the user views the "Expense" type records
    When the user fills-up the "expense" type details for new record with the following
      | key          | value         |
      | Expense Type | <name>        |
      | Description  | <description> |
      | Is Active    | <isActive>    |
    And the user save the "expense" type details
    Then the "expense" type record is added successfully

    Examples:
      | name                                                                                                 | description | isActive |
      | Online Course Subscription                                                                           | qwerty      | true     |
      | Training Fee                                                                                         | qwerty      | true     |
      | Test100CharactersKLZXCVBNM1234567890!@#$%^&**() <>?":{}][~`QWERTYUIOPASDFGHJKLZXCVBNM1234567890!@#$% |             | false    |

  Scenario Outline: Validate create a Claim Expense type with invalid inputs
    Given the user views the "Expense" type records
    When the user fills-up the "expense" type details for new record with the following
      | key          | value         |
      | Expense Type | <name>        |
      | Description  | <description> |
      | Is Active    | <isActive>    |
    And the user save the "expense" type details
    Then adding the expense type record is not successful
    And an inline message is displayed
      | key     | value     |
      | message | <message> |

    Examples:
      | name                                                                                                  | message                          |
      |                                                                                                       | Required                         |
      | Test101CharactersKLZXCVBNM1234567890!@#$%^&**() <>?":{}][~`QWERTYUIOPASDFGHJKLZXCVBNM1234567890!@#$%^ | Should not exceed 100 characters |

  Scenario: Validate creating a duplicate Claim Expense record
    Given the user views the "Expense" type records
    And the user fills-up the "expense" type details for new record with the following
      | key          | value     |
      | Expense Type | Team Meal |
    And the user save the "expense" type details
    And the "expense" type record is added successfully
    When the user fills-up the "expense" type details for new record with the following
      | key          | value     |
      | Expense Type | Team Meal |
    Then adding the expense type record is not successful
    And an inline message is displayed
      | key     | value          |
      | message | Already exists |
