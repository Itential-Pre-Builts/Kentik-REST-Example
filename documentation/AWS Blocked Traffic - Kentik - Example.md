# AWS Blocked Traffic - Kentik - Example

## Table of Contents

- [AWS Blocked Traffic - Kentik - Example](#aws-blocked-traffic---kentik---example)
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

Workflow that is started from Kentik that determines if IP address is whitelisted and if so adds it to security group in AWS. If the IP address is not whitelisted, a message is sent to MS Teams notifying of the alarm.

Capabilities include:
- Checks if source IP is in allowed IP list
- Sends MS Teams message indicating alarm triggered
- Adds source IP to AWS security group if source IP is in allowed IP list
- Sends MS Teams notification if unable to add source IP to AWS security group
- Creates ServiceNow Change Request if alarm triggered


## Getting Started

### Supported IAP Versions

Itential Example Projects are built and tested on particular versions of IAP. In addition, Example Projects are often dependent on external systems and as such, these Example Projects will have dependencies on these other systems. This version of **AWS Blocked Traffic - Kentik - Example** has been tested with:


- IAP **2023.1**



### External Dependencies

This version of **AWS Blocked Traffic - Kentik - Example** has been tested with:

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
      <td>Itential Automation Gateway</td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>




### Adapters

This version of **AWS Blocked Traffic - Kentik - Example** has been tested with:

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
      <td>AWS Blocked Traffic - Kentik - Example</td>
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
      <td>serviceNowAdapter</td>
      <td>string</td>
      <td>yes</td>
      <td>ServiceNow adapter to use for this job</td>
      <td><pre lang="json">servicenow</pre></td>
    </tr>    <tr>
      <td>msTeamsAdapter</td>
      <td>string</td>
      <td>yes</td>
      <td>Microsoft Teams adapter to use for this job</td>
      <td><pre lang="json">msteams</pre></td>
    </tr>    <tr>
      <td>awsEC2Adapter</td>
      <td>string</td>
      <td>yes</td>
      <td>AWS EC2 adapter to use for this job</td>
      <td><pre lang="json">aws_ec2</pre></td>
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
      <td>allPolicyEventsWebhookUrl</td>
      <td>string</td>
      <td>yes</td>
      <td>Microsoft Teams Webhook URL for notification of any policy event.</td>
      <td><pre lang="json">webhookURL</pre></td>
    </tr>    <tr>
      <td>policyAutomatedAuthorizationWebhookUrl</td>
      <td>string</td>
      <td>yes</td>
      <td>Microsoft Teams Webhook URL for notification of any policy authorization remediation event.</td>
      <td><pre lang="json">webhookURL</pre></td>
    </tr>    <tr>
      <td>policyAutomatedFailureWebhookUrl</td>
      <td>string</td>
      <td>yes</td>
      <td>Microsoft Teams Webhook URL for notification of any policy remediation failure event.</td>
      <td><pre lang="json">webhookURL</pre></td>
    </tr>    <tr>
      <td>CompanyID</td>
      <td>number</td>
      <td>yes</td>
      <td>Company ID in Kentik</td>
      <td><pre lang="json">180173</pre></td>
    </tr>    <tr>
      <td>CurrentState</td>
      <td>string</td>
      <td>yes</td>
      <td>Current state in Kentik</td>
      <td><pre lang="json">ackReq</pre></td>
    </tr>    <tr>
      <td>Dimensions</td>
      <td>object</td>
      <td>yes</td>
      <td>Kentik dimensions data</td>
      <td><pre lang="json">{}</pre></td>
    </tr>    <tr>
      <td>Dimensions.AS_src</td>
      <td>string</td>
      <td>yes</td>
      <td>AS source</td>
      <td><pre lang="json">198465</pre></td>
    </tr>    <tr>
      <td>Dimensions.Geography_src</td>
      <td>string</td>
      <td>yes</td>
      <td>Geography source</td>
      <td><pre lang="json">GB</pre></td>
    </tr>    <tr>
      <td>Dimensions.IP_dst</td>
      <td>string</td>
      <td>yes</td>
      <td>IP destination</td>
      <td><pre lang="json">10.0.18.252</pre></td>
    </tr>    <tr>
      <td>Dimensions.IP_src</td>
      <td>string</td>
      <td>yes</td>
      <td>IP source</td>
      <td><pre lang="json">45.129.14.30</pre></td>
    </tr>    <tr>
      <td>Dimensions.kt_aws_action</td>
      <td>string</td>
      <td>yes</td>
      <td>Kentik AWS action</td>
      <td><pre lang="json">REJECT</pre></td>
    </tr>    <tr>
      <td>Dimensions.kt_aws_dst_sg</td>
      <td>string</td>
      <td>yes</td>
      <td>Kentik AWS destination security group</td>
      <td><pre lang="json">security-group</pre></td>
    </tr>    <tr>
      <td>Dimensions.kt_aws_dst_vpc_id</td>
      <td>string</td>
      <td>yes</td>
      <td>Kentik AWS destination VPC ID</td>
      <td><pre lang="json">vpc-0bf364141dd4f9120</pre></td>
    </tr>    <tr>
      <td>Links</td>
      <td>array</td>
      <td>yes</td>
      <td>Kentik links</td>
      <td><pre lang="json">[]</pre></td>
    </tr>    <tr>
      <td>Links[i].Name</td>
      <td>string</td>
      <td>yes</td>
      <td>Kentik link name</td>
      <td><pre lang="json">DashboardAlarmURL</pre></td>
    </tr>    <tr>
      <td>Links[i].Label</td>
      <td>string</td>
      <td>yes</td>
      <td>Kentik link label</td>
      <td><pre lang="json">Open in Dashboard</pre></td>
    </tr>    <tr>
      <td>Links[i].Value</td>
      <td>string</td>
      <td>yes</td>
      <td>Kentik link value</td>
      <td><pre lang="json">https://portal.kentik.com/v4/library/dashboards/18392</pre></td>
    </tr>    <tr>
      <td>Description</td>
      <td>string</td>
      <td>yes</td>
      <td>Kentik alarm description</td>
      <td><pre lang="json">Alarm for Web Server Traffic Rejections Requires Ack</pre></td>
    </tr>    <tr>
      <td>EndTime</td>
      <td>string</td>
      <td>yes</td>
      <td>End time of alarm</td>
      <td><pre lang="json">2023-06-29 18:36:48 UTC</pre></td>
    </tr>    <tr>
      <td>EndTime</td>
      <td>string</td>
      <td>yes</td>
      <td>End time of alarm</td>
      <td><pre lang="json">2023-06-29 18:36:48 UTC</pre></td>
    </tr>    <tr>
      <td>AlarmPolicyName</td>
      <td>string</td>
      <td>yes</td>
      <td>Alarm policy name</td>
      <td><pre lang="json">Web Server Traffic Rejections</pre></td>
    </tr>    <tr>
      <td>IsActive</td>
      <td>boolean</td>
      <td>yes</td>
      <td>Set to true if alarm policy is active and false if inactive</td>
      <td><pre lang="json">true</pre></td>
    </tr>    <tr>
      <td>PreviousState</td>
      <td>string</td>
      <td>yes</td>
      <td>Previous state</td>
      <td><pre lang="json">alarm</pre></td>
    </tr>    <tr>
      <td>StartTime</td>
      <td>string</td>
      <td>yes</td>
      <td>Start time of alarm</td>
      <td><pre lang="json">2023-06-29 18:26:48 UTC</pre></td>
    </tr>    <tr>
      <td>Type</td>
      <td>string</td>
      <td>yes</td>
      <td>Type of alarm</td>
      <td><pre lang="json">alarm</pre></td>
    </tr>    <tr>
      <td>AlarmID</td>
      <td>string</td>
      <td>yes</td>
      <td>Alarm ID</td>
      <td><pre lang="json">266940386</pre></td>
    </tr>    <tr>
      <td>AlarmPolicyID</td>
      <td>string</td>
      <td>yes</td>
      <td>Alarm Policy ID</td>
      <td><pre lang="json">187811</pre></td>
    </tr>    <tr>
      <td>AlarmPolicyMetadataType</td>
      <td>string</td>
      <td>yes</td>
      <td>Alarm policy metadata type</td>
      <td><pre lang="json">Custom</pre></td>
    </tr>    <tr>
      <td>AlarmSeverity</td>
      <td>string</td>
      <td>yes</td>
      <td>Alarm severity</td>
      <td><pre lang="json">critical</pre></td>
    </tr>    <tr>
      <td>AlarmThresholdID</td>
      <td>string</td>
      <td>yes</td>
      <td>Alarm threshold ID</td>
      <td><pre lang="json">446709</pre></td>
    </tr>    <tr>
      <td>Metrics</td>
      <td>object</td>
      <td>yes</td>
      <td>Alarm metrics</td>
      <td><pre lang="json">{}</pre></td>
    </tr>    <tr>
      <td>Metrics.bits</td>
      <td>number</td>
      <td>yes</td>
      <td>Amount of bits</td>
      <td><pre lang="json">2.6666669845581055</pre></td>
    </tr>
  </tbody>
</table>

  


### Outputs

There are no outputs for this Example Project.



### Example Inputs and Outputs

No example inputs or outputs found.



## Support

Please use your Itential Customer Success account if you need support when using this Example Project.