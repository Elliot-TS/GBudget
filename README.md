[![codecov](https://codecov.io/gh/csc-324-sga-assisting-tool/csc-324-sga-assisting-tool/branch/main/graph/badge.svg)](https://codecov.io/gh/csc-324-sga-assisting-tool/csc-324-sga-assisting-tool)

# GBudget

An application for Grinnell College Registered Student Organizations (RSOs) and Student Educational Policy Committees (SECPs) to submit budget requests to the Student Goverment Association (SGA) Treasurer.

Students will create an account using their RSO or SECP email address.  The SGA treasurer and assistant treasurers will be able to create an account using their respective email addresses.

Students can create a budget request for their RSO or SECP events.  They can add details about the event, including a description, date, time, and location information, and more.  They can also add budget items to their event.  Once submitted, the SGA treasurer can review the budget and either approve or deny the budget.  If there are items that need to be changed, such as a disallowed item, the treasurer can mark which items need to be changed and the student can resubmit the budget.

## Motivation

The current process for requesting budgets from the Student Government Association (SGA) at Grinnell College is time-consuming and unclear.  Communication between the SGA treasurer adn the RSO treasurer relies on email and Excel spreadsheets, which many find complex and annoying.  This web app enables efficient communication between student organization treasurers and the SGA treasurer.  it also simplifies budget management for RSOs.  Using our tool, RSO treasurers can create and submti budget requests, while the SGA treasurer can approve, comment on, or reject these requests.  SEPCs can also submit budgets for their events and have them reviewed by either the SGA treasurer or the assistant treasurer.  This web app is designed specifically for Grinnell College's SGA and is not currently planned for expansion to other institutions.

# Development

## Software Requirements

### User Roles
Abbreviations:
* SGA: Student Government Association
* SEPC: Student Educational Policy Committee
* RSO: Registered Student Organization

The software will have three user roles:
1. SGA Treasurer
  * Can view all accepted, pending, or rejected budget requests
  * Can review pending  budgets
  * Can approve or reject pending budgets, including marking specific items for revision
  * Can comment on budget requests or individual items
2. SGA Assistant Treasurer
  * Can view all accepted, pending, or rejected budget requests
  * Can approve or reject pending budgets only for SEPCs
3. RSO Treasurer / SEPC Treasurer
  * Can create a new budget request for an event hosted by their club/organization
  * Can submit budget requests for review by the SGA Treasurer
  * Can save a budget request as a draft without submitting it
  * Can view the status of their budget requests

Users can sign up using their RSO, SECP, or SGA email address.  The software will verify the email address and assign the user to the appropriate role.  Multiple users from the same organization can create an account.

### Accessability Requirements
* Usable on a computer or mobile device
* Compatible with screen readers
* Works well at different scales and font sizes
* No distracting animations
* High contrast color scheme

### Non-Functional Requirements

* Security
  * Authentication and data storage will be handled by Firebase
  * All users are validated when they sign up
  * Only validated SGA user can approve or reject budgets
* Hosting
  * Hosted on a Grinnell Server
  * During development, it will be hosted on Vercel
* Performance
  * The app should load quickly
  * If something is loading, the rest of the app should not freeze
  * Loading must always be indicated to the user
  * Changes to the database should be updated in real-time
* Users
  * One person should be able to create multiple accounts and easily switch between them

## Architecture and Design

## Code and Testing

### Style

We will be following Google's TypeScript Style Guide for this repo. See more details on the [wiki](https://github.com/csc-324-sga-assisting-tool/csc-324-sga-assisting-tool/wiki) which includes instructions on how to set up and use the automated linter

# Credit

This software was originally developed as a project for CSC 324: Software Design at Grinnell College in the Spring of 2024.  The original authors are: 
 * [Simon Taye](https://github.com/SimonMTaye)
 * [Diogo Tandeta Tartarotti](https://github.com/tandetat)
 * [Hiiro Uchino](https://github.com/HiiroUchino)
 * [Yuki H.](https://github.com/Yukiiiiiiya)
 * [Jemima](https://github.com/jemima247)
 * And myself

 This is a fork of the [original repository](https://github.com/csc-324-sga-assisting-tool/csc-324-sga-assisting-tool).
