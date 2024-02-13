# Device Onboarding - Reset - Kentik - Example

## Table of Contents

- [Device Onboarding - Reset - Kentik - Example](#device-onboarding---reset---kentik---example)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Getting Started](#getting-started)
    - [Supported IAP Versions](#supported-iap-versions)
    - [External Dependencies](#external-dependencies)
    - [Adapters](#adapters)
    - [How to Install](#how-to-install)
    - [Testing](#testing)
  - [Using this Example Project](#using-this-example-project)
    - [Entry Point IAP Component](#entry-point-iap-component)
    - [Inputs](#inputs)
    - [Outputs](#outputs)
    - [API Links](#api-links)
    - [Example Inputs and Outputs](#example-inputs-and-outputs)
  - [Support](#support)

## Overview

Automation removes flow test Cisco IOS device configuration and deletes device from Kentik to reset data for Device Onboarding - Kentik - Example automation

Capabilities include:
- Removes flow test configuration on Cisco IOS device over Itential Automation Gateway
- Archives and then deletes device from Kentik


## Getting Started

### Supported IAP Versions

Itential Example Projects are built and tested on particular versions of IAP. In addition, Example Projects are often dependent on external systems and as such, these Example Projects will have dependencies on these other systems. This version of **Device Onboarding - Reset - Kentik - Example** has been tested with:


- IAP **2023.1**



### External Dependencies

This version of **Device Onboarding - Reset - Kentik - Example** has been tested with:

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>OS Version</th>
      <th>API Version</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Kentik</td>
      <td></td>
      <td></td>
    </tr>    <tr>
      <td>Itential Automation Gateway</td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>




### Adapters

This version of **Device Onboarding - Reset - Kentik - Example** has been tested with:

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Version</th>
      <th>Configuration Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="https://gitlab.com/itentialopensource/adapters/observability/adapter-kentik_v5">adapter-kentik_v5</a></td>
      <td>^0.1.1</td>
      <td></td>
    </tr>    <tr>
      <td>adapter-automation_gateway</td>
      <td>^4.29.0-2023.1.12</td>
      <td></td>
    </tr>
  </tbody>
</table>



### How to Install

To install the Example Project:

- Verify you are running a supported version of the Itential Automation Platform (IAP) as listed above in the [Supported IAP Versions](#supported-iap-versions) section in order to install the Example Project.
- Import the Example Project in [Admin Essentials](https://docs.itential.com/docs/importing-a-prebuilt-4).

### Testing

While Itential tests this Example Project and its capabilities, it is often the case the customer environments offer their own unique circumstances. Therefore, it is our recommendation that you deploy this Example Project into a development/testing environment in which you can test the Example Project.

## Using this Example Project


### Entry Point IAP Component

The primary IAP component to run this Example Project is listed below:

<table>
  <thead>
    <tr>
      <th>IAP Component Name</th>
      <th>IAP Component Type</th>
    </tr>
  </thead>
  <tbody>
      <td>Device Onboarding - Reset - Kentik - Example</td>
      <td>Operations Manager Automation</td>
    </tr>
  </tbody>
</table>

### Inputs

The following table lists the inputs to the Example Project:

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Required</th>
      <th>Description</th>
      <th>Example Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>deviceName</td>
      <td>string</td>
      <td>yes</td>
      <td>Name of device to delete from Kentik</td>
      <td><pre lang="json">ios_device</pre></td>
    </tr>    <tr>
      <td>kentikAdapter</td>
      <td>string</td>
      <td>yes</td>
      <td>Name of Kentik adapter to use for the job</td>
      <td><pre lang="json">kentik</pre></td>
    </tr>
  </tbody>
</table>



### Outputs

There are no outputs for this Example Project.


### API Links


No API Links provided.
 


### Example Inputs and Outputs

  
#### Example 1

    
Input:
<pre>{
  "formData":  {
    "deviceName": "ios_device",
    "kentikAdapter": "Kentik v5"
  }
} </pre>

    
    
  


## Support

Please use your Itential Customer Success account if you need support when using this Example Project.