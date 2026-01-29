@configuration
Feature: Claim Module - Configurations
  As an expense claim team member
  I want to be able to configure event and expense types for claims records
  So that the claim records can be categorized accordingly

  Background: Login to Orangehrm site
    Given the admin user login to Orangehrm site
    And the user views the "Claim" Module
    Then the "Claim" page is displayed

  Scenario Outline: Validate create a valid Claim Event type
    Given the user views the Events type records
    When the user adds new event type record with the following details
      | key         | value         |
      | Event Name  | <name>        |
      | Description | <description> |
      | Active      | <isActive>    |
    Then the event record is added successfully

    Examples:
      | name                   | description | isActive |
      | Learning & Development | qwerty      | True     |
      | Meals & Allowances     |             | False    |
