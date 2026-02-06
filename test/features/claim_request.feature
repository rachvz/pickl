@submit-claim @regression
Feature: Claim Module - Submit Claim
  As an expense claim team member
  I want to be able to submit a claim record
  So that the claim record can be assigned for payment processing

  Background: Login to Orangehrm site
    Given the admin user login to Orangehrm site
    And the user views the "Claim" Module
    And the "Claim" page is displayed
    And the user views the "Events" type records
    And the following event types are available
      | key        | value                  |
      | Event Name | Learning & Development |
    And the following expense types are available
      | key          | value                      |
      | Expense Type | Online Course Subscription |
  # view expense records
  # check for expense record in table if exist
  # if not, follow the add event steps

  Scenario: Validate create claim request with valid inputs
    When the user creates a claim request via the Submit Claim in navigation menu
    | key      | value                  |
    | Event    | Learning & Development |
    | Currency | Philippine (Peso)      |
    | Remarks  | autotest 123           |
    Then the claim request is successfully created

  Scenario: Validate add expense record on a claim request
    Given the user creates a claim request via the Submit Claim in navigation menu
    | key      | value                  |
    | Event    | Learning & Development |
    | Currency | Philippine (Peso)      |
    | Remarks  | autotest 123           |
    And the claim request is successfully created
    When the user adds an expense record with the following details
      | key          | value                      |
      | Expense Type | Online Course Subscription |
      | Date         | $TODAY                     |
      | Amount       | 500                        |
      | Note         | autotest note              |
    Then the expense record is added to claim request successfully
