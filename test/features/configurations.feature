@configuration @regression
Feature: Claim Module - Configurations
  As an expense claim team member
  I want to be able to configure event and expense types for claims records
  So that the claim records can be categorized accordingly

  Background: Login to Orangehrm site
    Given the admin user login to Orangehrm site
    And the user views the "Claim" Module
    Then the "Claim" page is displayed

  Scenario Outline: Validate create a Claim Event type with valid inputs
    Given the user views the Events type records
    When the user adds new event type record with the following details
      | key         | value         |
      | Event Name  | <name>        |
      | Description | <description> |
      | Is Active   | <isActive>    |
    Then the event type record is added successfully

    Examples:
      | name                                                                                                  | description | isActive |
      | Learning & Development                                                                                | qwerty      | true     |
      | Meals & Allowances                                                                                    |             | true     |
      | Test100CharactersKLZXCVBNM1234567890!@#$%^&**() <>?":{}][~`QWERTYUIOPASDFGHJKLZXCVBNM1234567890!@#$%^ |             | false    |

  Scenario Outline: Validate create a Claim Event type with invalid inputs
    Given the user views the Events type records
    When the user adds new event type record with the following details
      | key         | value         |
      | Event Name  | <name>        |
      | Description | <description> |
      | Is Active   | <isActive>    |
    Then adding the event type record is not successful
    And an inline message is displayed
      | key     | value     |
      | message | <message> |

    Examples:
      | name                                                                                                  | description | isActive | message                          |
      |                                                                                                       | qwerty      | true     | Required                         |
      | Test101CharactersKLZXCVBNM1234567890!@#$%^&**() <>?":{}][~`QWERTYUIOPASDFGHJKLZXCVBNM1234567890!@#$%^ |             | false    | Should not exceed 100 characters |

  Scenario Outline: Validate create a Claim Expense type with valid inputs
    Given the user views the Expense type records
    When the user adds new expense type record with the following details
      | key          | value         |
      | Expense Type | <name>        |
      | Description | <description> |
      | Is Active   | <isActive>    |
    Then the expense type record is added successfully

    Examples:
      | name                                                                                                  | description | isActive |
      | Online Course Subscription                                                                            | qwerty      | true     |
      | Training Fee                                                                                          | qwerty      | true     |
      | Test100CharactersKLZXCVBNM1234567890!@#$%^&**() <>?":{}][~`QWERTYUIOPASDFGHJKLZXCVBNM1234567890!@#$%^ |             | false    |

  Scenario Outline: Validate create a Claim Expense type with invalid inputs
    Given the user views the Expense type records
    When the user adds new expense type record with the following details
      | key          | value         |
      | Expense Type | <name>        |
      | Description | <description> |
      | Is Active   | <isActive>    |
    Then adding the expense type record is not successful
    And an inline message is displayed
      | key     | value     |
      | message | <message> |

    Examples:
      | name                                                                                                  | description | isActive | message                          |
      |                                                                                                       | qwerty      | true     | Required                         |
      | Test101CharactersKLZXCVBNM1234567890!@#$%^&**() <>?":{}][~`QWERTYUIOPASDFGHJKLZXCVBNM1234567890!@#$%^ |             | false    | Should not exceed 100 characters |
