<!-- This is a comment in md (Markdown) format, it will not be visible to the end user -->

<!-- Update the below line with your Pre-Built name -->
# Pre-Built Name

<!-- Leave TOC intact unless you've added or removed headers -->

## Table of Contents

- [Pre-Built Name](#pre-built-name)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Supported IAP Versions](#supported-iap-versions)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Capabilities](#capabilities)
    - [How to Install](#how-to-install)
    - [Testing](#testing)
  - [Using this Pre-Built](#using-this-pre-built)
    - [Input Schema](#input-schema)
    - [Output Schema](#output-schema)
  - [Additional Information](#additional-information)

<!-- Write a few sentences about the Pre-Built and explain the use case(s) -->

## Overview

The **Pre-Built Name** pre-built is used for a repeatable task to automate your network operations.

- Estimated Run Time: < 1 minute

<!-- Update version for relevant major IAP release -->

## Supported IAP Versions

Itential pre-builts are built and tested on particular versions of IAP. In addition, pre-builts that work with devices are often dependent on certain orchestration systems (e.g. NSO and IAG). As such, these pre-builts will have dependencies on these other systems. This version of the pre-built has been tested with:

- IAP 2023.1.x

## Getting Started

These instructions will help you get a copy of the pre-built in your IAP instance for testing in your environment. Reading this section is also helpful for deployments as it provides you with pertinent information on prerequisites and capabilities.

<!-- List any IAP version, adapters, or other dependencies needed to run this pre-built -->

### Prerequisites

Users must satisfy the following prerequisites to install and run this pre-built:

- Itential Automation Platform
  - `^2023.1.x`
- An instantiated GitLab adapter

<!-- List capabilities of the pre-built -->

### Capabilities

- Does operation in external system
- Provides option to run with no manual tasks shown in job with auto approve

<!-- Link to documentation for pre-built installation related major verison of IAP -->

### How to Install

To install this pre-built:

- Verify that you are running the documented [prerequisites](#prerequisites) in order to install the pre-built.

- Follow the instructions on the Itential Documentation site for [importing a pre-built](https://docs.itential.com/docs/importing-a-prebuilt-3).

### Testing

While Itential tests this pre-built and its capabilities, it is often the case the customer environments offer their own unique circumstances. Therefore, it is our recommendation that you deploy this pre-built into a development/testing environment in which you can test the pre-built.

<!-- Explain the main entrypoint(s) for this Pre-Built: Automation Catalog item, Workflow, Postman, etc. -->

## Using this Pre-Built

This pre-built can be run in a [childJob task](https://docs.itential.com/docs/childjob-3).

**Note**: The entry point workflow to this pre-built is called `Pre-Built Workflow`. Use this workflow name if running this pre-built in a childJob task.

The input to and possible outputs from this pre-built are described here.

<!-- Provide example input to pre-built as well as show table of what each property is regarding data type, if required, and a description -->

### Input Schema

Example input:

```json
{
  "deviceName": "device",
  "autoApprove": true
}
```

The following table details the property keys of the  input object.
| key                     | type    | required | description                                             |
|-------------------------|---------|----------|---------------------------------------------------------|
| deviceName              | string  | yes      | the device name                                         |
| autoApprove             | boolean | yes      | if set to true, will not display any manual tasks       |

<!-- Provide example output of pre-built indicating job variable with meaningful result data. -->

### Output Schema

The `preBuiltResponse` job variable returned from the run pre-built workflow `Pre-Built Workflow` provides the reponse of the pre-built.

See an example output below.

```json
{
  "deviceName": "device",
  "autoApprove": true,
  "_id": "",
  "initiator": "",
  "preBuiltResponse": "Response"
}
```

The `preBuiltError` job variable returned from the pre-built workflow `Pre-Built Workflow` provides the error response.

See an example output for this job variable when an error occurs.

```json
{
  "deviceName": "device",
  "autoApprove": true,
  "_id": "",
  "initiator": "",
  "preBuiltError": "Error encountered"
}
```

## Additional Information

Please use your Itential Customer Success account if you need support when using this pre-built.
