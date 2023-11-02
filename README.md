<!-- This is a comment in md (Markdown) format, it will not be visible to the end user -->
<!-- Update the below line with your Pre-Built name -->
# Pre-Built Name
<!-- Leave TOC intact unless you've added or removed headers -->
## Table of Contents
- [Pre-Built Name](#pre-built-name)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
    - [Capabilities](#capabilities)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [How to Install](#how-to-install)
    - [Testing](#testing)
      - [IAP Version](#iap-version)
      - [Adapter Version](#adapter-version)
      - [External System](#external-system)
  - [Using this Pre-Built](#using-this-pre-built)
    - [Entry Point](#entry-point)
    - [Input Schema](#input-schema)
    - [Output Schema](#output-schema)
  - [Additional Information](#additional-information)
<!-- Write a few sentences about the Pre-Built and explain the use case(s) -->
## Overview
The **Pre-Built Name** Pre-Built is used for a repeatable task to automate your network operations.
<!-- List capabilities of the Pre-Built -->
### Capabilities
- Does operation in external system
- Provides option to run with no manual tasks shown in job with auto approve
## Getting Started
These instructions will help you get a copy of the Pre-Built in your IAP instance for testing in your environment. Reading this section is also helpful for deployments as it provides you with pertinent information on prerequisites and capabilities.
<!-- List any IAP version, adapters, or other dependencies needed to run this Pre-Built -->
### Prerequisites
Users must satisfy the following prerequisites to install and run this Pre-Built:
- Itential Automation Platform
  - `2023.1.x`
- An instantiated adapter
<!-- Link to documentation for Pre-Built installation related major verison of IAP -->
### How to Install
To install this Pre-Built:
- Verify that you are running the documented [prerequisites](#prerequisites) in order to install the Pre-Built.
- Follow the instructions on the Itential Documentation site for [importing a Pre-Built](https://docs.itential.com/docs/importing-a-prebuilt-2).
### Testing
While Itential tests this Pre-Built and its capabilities, it is often the case the customer environments offer their own unique circumstances. Therefore, it is our recommendation that you deploy this Pre-Built into a development/testing environment in which you can test the Pre-Built.
#### IAP Version
Specifically what version of IAP was used to test Pre-Built
#### Adapter Version
What version of adapter was used to test Pre-Built. If no adapter needed for Pre-Built, do not include this section.
#### External System
What version of external system was used to test Pre-Built. If no external system needed for Pre-Built, do not include this section.
<!-- Explain the main entrypoint(s) for this Pre-Built: Automation Catalog item, Workflow, Postman, etc. -->
## Using this Pre-Built
This Pre-Built can be run in a [childJob task](https://docs.itential.com/docs/childjob-1).
### Entry Point
State the IAP component name used to start the Pre-Built. Could be a workflow or JST or some other IAP component.
**Note**: The entry point workflow to this Pre-Built is called `Pre-Built Workflow`. Use this workflow name if running this Pre-Built in a childJob task.
The input to and possible outputs from this Pre-Built are described here.
<!-- Provide example input to Pre-Built as well as show table of what each property is regarding data type, if required, and a description -->
### Input Schema
Example input:
```json
{}
```
The following table details the property keys of the  input object.
| key                                      | type    | required | description                                             |
|------------------------------------------|---------|----------|---------------------------------------------------------|
<!-- Provide example input to Pre-Built as well as show table of what each property is regarding data type, if required, and a description -->
### Output Schema
The `preBuiltResponse` job variable returned from the run Pre-Built workflow `Pre-Built Workflow` provides the reponse of the Pre-Built.
See an example output below.
```json
{}
```
The `preBuiltError` job variable returned from the Pre-Built workflow `Pre-Built Workflow` provides the error response.
See an example output for this job variable when an error occurs.
```json
{}
```
## Additional Information
Please use your Itential Customer Success account if you need support when using this Pre-Built.
