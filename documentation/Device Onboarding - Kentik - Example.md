# Device Onboarding - Kentik - Example

## Table of Contents

- [Device Onboarding - Kentik - Example](#device-onboarding---kentik---example)
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
    - [Example Inputs and Outputs](#example-inputs-and-outputs)
  - [Support](#support)

## Overview

Automation that onboards a device as listed in NetBox to Kentik while creating ServiceNow Change Request and sending Microsoft Teams notifications. Also configures flow test on device and runs flow test in Kentik. Only supports Cisco IOS device type.

Capabilities include:
- Creates ServiceNow Change Request
- Retrieves device details from NetBox
- Sends Microsoft Teams notification before device creation attempt
- Creates device in Kentik
- Updates NetBox device details with Kentik ID
- Gets Kentik company settings for flow test
- Configures Cisco IOS device over Itential Automation Gateway for flow test
- Runs traffic flow test in Kentik
- Sends Microsoft Teams notification after device creation and flow test with links to Kentik, SerivceNow Change Request, and Itential job


## Getting Started

### Supported IAP Versions

Itential Example Projects are built and tested on particular versions of IAP. In addition, Example Projects are often dependent on external systems and as such, these Example Projects will have dependencies on these other systems. This version of **Device Onboarding - Kentik - Example** has been tested with:


- IAP **2023.1**



### External Dependencies

This version of **Device Onboarding - Kentik - Example** has been tested with:

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
      <td>AWS</td>
      <td></td>
      <td></td>
    </tr>    <tr>
      <td>MS Teams</td>
      <td></td>
      <td></td>
    </tr>    <tr>
      <td>ServiceNow</td>
      <td></td>
      <td></td>
    </tr>    <tr>
      <td>NetBox</td>
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

This version of **Device Onboarding - Kentik - Example** has been tested with:

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Version</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>adapter-aws_ec2</td>
      <td>^0.6.9</td>
    </tr>    <tr>
      <td>adapter-service_now</td>
      <td>^2.6.3</td>
    </tr>    <tr>
      <td>adapter-ms_teams</td>
      <td>^0.13.0</td>
    </tr>    <tr>
      <td>adapter-kentik_v5</td>
      <td>^0.1.1</td>
    </tr>    <tr>
      <td>adapter-netbox_v33</td>
      <td>^2.0.0</td>
    </tr>    <tr>
      <td>adapter-automation_gateway</td>
      <td>^4.29.0-2023.1.12</td>
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
      <td>Device Onboarding - Kentik - Example</td>
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
      <td>Cisco IOS device to onboard to Kentik</td>
      <td><pre lang="json">IOS_Device_Name</pre></td>
    </tr>    <tr>
      <td>iapUrl</td>
      <td>string</td>
      <td>yes</td>
      <td>IAP URL to use in MS Teams and ServiceNow messages</td>
      <td><pre lang="json">https://iap_dev:443</pre></td>
    </tr>    <tr>
      <td>serviceNowUrl</td>
      <td>string</td>
      <td>yes</td>
      <td>ServiceNow URL to use in MS Teams messages</td>
      <td><pre lang="json">https://servicenow_dev.com</pre></td>
    </tr>    <tr>
      <td>deviceOnboardingWebhookUrl</td>
      <td>string</td>
      <td>yes</td>
      <td>Microsoft Teams Webhook URL for notification of device onboarding event.</td>
      <td><pre lang="json">webhookURL</pre></td>
    </tr>    <tr>
      <td>serviceNowAdapter</td>
      <td>string</td>
      <td>yes</td>
      <td>ServiceNow adapter to use for the job</td>
      <td><pre lang="json">servicenow</pre></td>
    </tr>    <tr>
      <td>netBoxAdapter</td>
      <td>string</td>
      <td>yes</td>
      <td>NetBox adapter to use for the job</td>
      <td><pre lang="json">netboxv3</pre></td>
    </tr>    <tr>
      <td>msTeamsAdapter</td>
      <td>string</td>
      <td>yes</td>
      <td>Microsoft Teams adapter to use for the job</td>
      <td><pre lang="json">msteams</pre></td>
    </tr>    <tr>
      <td>kentikAdapter</td>
      <td>string</td>
      <td>yes</td>
      <td>Kentik adapter to use for the job</td>
      <td><pre lang="json">kentik</pre></td>
    </tr>
  </tbody>
</table>

  


### Outputs

There are no outputs for this Example Project.



### Example Inputs and Outputs

  
#### Example 1

    
Input:
<pre>{
  "formData": {
    "iapUrl": "https://iap-dev:443",
    "deviceOnboardingWebhookUrl": "webhookURL1",
    "serviceNowUrl": "https://service-now-dev.com",
    "deviceName": "ios_device",
    "serviceNowAdapter": "ServiceNow",
    "netBoxAdapter": "NetboxV3",
    "msTeamsAdapter": "MS Teams",
    "kentikAdapter": "Kentik v5"
  }
} </pre>

    
    
  


## Support

Please use your Itential Customer Success account if you need support when using this Example Project.