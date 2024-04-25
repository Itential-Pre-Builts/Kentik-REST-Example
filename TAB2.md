## Table of Contents 

  - [Getting Started](#getting-started)
    - [Helpful Background Information](#helpful-background-information)
    - [Prerequisites](#prerequisites)
    - [External Dependencies](#external-dependencies)
    - [Adapters](#adapters)
    - [How to Install](#how-to-install)
    - [Testing](#testing)
  - [Using this Example Project](#using-this-example-project)
    - [AWS Blocked Traffic - Kentik - Example](#aws-blocked-traffic-kentik-example)
    - [AWS Blocked Traffic - Reset - Kentik - Example](#aws-blocked-traffic-reset-kentik-example)
    - [Device Onboarding - Kentik - Example](#device-onboarding-kentik-example)
    - [Device Onboarding - Reset - Kentik - Example](#device-onboarding-reset-kentik-example)
  - [Additional Information](#additional-information)
    - [Support](#support)

## Getting Started

This section is helpful for deployments as it provides you with pertinent information on prerequisites and properties.

### Helpful Background Information 

Workflows and processes often include logic that varies from business to business. Our Example Projects are more complex processes that include several of our modular components to build a more complete process.

While these can be utilized, you may find more value in using them as a starting point to build around.

### Prerequisites

Itential Example Projects are built and tested on particular versions of IAP. In addition, Example Projects are often dependent on external systems and as such, these Example Projects will have dependencies on these other systems. This version of **Kentik - REST - Example** has been tested with:

- IAP **2023.1**

### External Dependencies

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
      <td>ServiceNow</td>
      <td></td>
      <td></td>
    </tr>    <tr>
      <td>MS Teams</td>
      <td></td>
      <td></td>
    </tr>    <tr>
      <td>NetBox</td>
      <td></td>
      <td></td>
    </tr>    <tr>
      <td>Kentik</td>
      <td></td>
      <td></td>
    </tr>    <tr>
      <td>Itential Automation Gateway</td>
      <td></td>
      <td></td>
    </tr>    <tr>
      <td>AWS</td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>

### Adapters

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
      <td><a href="https://gitlab.com/itentialopensource/adapters/inventory/adapter-netbox_v33">adapter-netbox_v33</a></td>
      <td>^2.0.0</td>
      <td></td>
    </tr>    <tr>
      <td><a href="https://gitlab.com/itentialopensource/adapters/notification-messaging/adapter-msteams">adapter-ms_teams</a></td>
      <td>^0.13.0</td>
      <td></td>
    </tr>    <tr>
      <td>adapter-automation_gateway</td>
      <td>^4.29.0-2023.1.12</td>
      <td></td>
    </tr>    <tr>
      <td><a href="https://gitlab.com/itentialopensource/adapters/itsm-testing/adapter-servicenow">adapter-service_now</a></td>
      <td>^2.6.3</td>
      <td></td>
    </tr>    <tr>
      <td><a href="https://gitlab.com/itentialopensource/adapters/cloud/adapter-aws_ec2">adapter-aws_ec2</a></td>
      <td>^0.6.9</td>
      <td></td>
    </tr>    <tr>
      <td><a href="https://gitlab.com/itentialopensource/adapters/observability/adapter-kentik_v5">adapter-kentik_v5</a></td>
      <td>^0.1.1</td>
      <td></td>
    </tr>
  </tbody>
</table>

### How to Install

To install the Example Project:

- Verify you are running a supported version of the Itential Automation Platform (IAP) as listed above in the [Supported IAP Versions](#supported-iap-versions) section in order to install the Example Project.
- Import the Example Project in [Admin Essentials](https://docs.itential.com/docs/importing-a-prebuilt-4).

### Testing

Cypress is generally used to test all Itential Example Projects. While Cypress is an opensource tool, at Itential we have internal libraries that have been built around Cypress to allow us to test with a deployed IAP.

When certifying our Example Projects for a release of IAP we run these tests against the particular version of IAP and create a release branch in GitLab. If you do not see the Example Project available in your version of IAP please contact Itential.

While Itential tests this Example Project and its capabilities, it is often the case the customer environments offer their own unique circumstances. Therefore, it is our recommendation that you deploy this Example Project into a development/testing environment in which you can test the Example Project.

## Using this Example Project
Example Projects contain 1 or more workflows. Each of these workflows have different inputs and outputs.

### AWS Blocked Traffic - Kentik - Example
This is an end-to-end automation example where an alert is triggered within a Kentik policy due to a threshold being exceeded. In this example Kentik uses an integration to call IAP's <a href='https://docs.itential.com/docs/triggers-2023-1#api-endpoint-triggers' target='_blank'>northbound API trigger</a>. Once the trigger is executed it invokes an automation that then validates the traffic can be accepted and interacts with change management (ServiceNow), AWS EC2, and a notification platform (MS Teams).</br></br>This automation example can be installed and reviewed for ideas on how to incorporate Kentik into a closed loop alert remediation scenario with IAP.

Capabilities include:
- Checks if source IP is in allowed IP list
- Sends MS Teams message indicating alarm triggered
- Adds source IP to AWS security group if source IP is in allowed IP list
- Sends MS Teams notification if unable to add source IP to AWS security group
- Creates ServiceNow Change Request if alarm triggered



#### Configuring Dependencies
  
##### AWS

A <a href='https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html' target='_blank'>Security Group in AWS</a> grants access of a hosted server to given source IP. This automation is able to update a given Security Group to have source IP after alert is sent by Kentik to IAP in the Kentik <a href='https://kb.kentik.com/v0/Ia04.htm#Ia04-AWS_Dimensions' target='_blank'>AWS Dimension field kt_aws_dst_sg</a>.
  
##### Microsoft Teams

This IAP automation sends formatted messages over Microsoft Teams with links to the IAP job run, a ServiceNow Change Request created for an alarm event, and the Kentik flow data. Three channels are used in this automation that each require creating an Incoming Webhook and are used for the following events:

1. `Policy All Events`: receives messages any time an alert is sent from Kentik to IAP and starts a job in IAP.
2. `Policy Automated Authorizations`: receives messages when a source IP detected by Kentik sending web traffic to a given server is added to Security Group in AWS to grant access to that server since the source IP is found in a white-list.
3. `Policy Automated Failures`: received messages when a source IP fails to be added to Security Group in AWS. This can occur if a failure happens when performing that operation or the source IP is already found in the Security Group.

Follow the Microsoft Teams documentation linked for <a href='https://learn.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook?tabs=dotnet' target='_blank'>creating Incoming Webhooks</a> for each of the three channels described above.
  
##### Kentik

The AWS Blocked Traffic Event automation is started by Kentik sending a request to IAP upon a critical threshold met in traffic to a web server observed by Kentik. In order to use this automation a Notification Channel of type Custom Webhook must be set up in Kentik. The IAP URL and API endpoint for the AWS Blocked Traffic Event automation is provided in the configuration of the Custom Webhook in Kentik. A Go template as seen below is used to map the data sent from Kentik to a format the IAP automation can parse to perform a closed loop remediation of either enabling access to client sending traffic to web server observed by Kentik or continuing to block access if the IP is not white-listed.

```python
{
  {{- . | toJSON | explodeJSONKeys -}},
  {{- if .IsSingleEvent  -}}
    {{- with .Event -}}
      {{- . | toJSON | explodeJSONKeys -}},
      {{- .Details.General.ToMap | toJSON | explodeJSONKeys -}},
      "iapUrl": "<iap_url>",
      "serviceNowUrl": "<service_now_url>",
      "allPolicyEventsWebhookUrl": "<webhook_url_1>",
      "policyAutomatedFailureWebhookUrl": "<webhook_url_2>",
      "policyAutomatedAuthorizationWebhookUrl": "<webhook_url_3>",
      "serviceNowAdapter": "<service_now_adapter>",
      "awsEC2Adapter": "<aws_ec2_adapter>",
      "msTeamsAdapter": "<ms_teams_adapter>",
      "Dimensions": {{- (.Details.WithTag "dimension").ToMap | toJSON -}},
      "Links": {{- (.Details.WithTag "url") | toJSON -}}
    {{- end -}}
  {{- else -}}
    {{- with index .Events 0 -}}
      {{- . | toJSON | explodeJSONKeys -}},
      {{- .Details.General.ToMap | toJSON | explodeJSONKeys -}},
      "iapUrl": "<iap_url>",
      "serviceNowUrl": "<service_now_url>",
      "allPolicyEventsWebhookUrl": "<webhook_url_1>",
      "policyAutomatedFailureWebhookUrl": "<webhook_url_2>",
      "policyAutomatedAuthorizationWebhookUrl": "<webhook_url_3>",
      "serviceNowAdapter": "<service_now_adapter>",
      "awsEC2Adapter": "<aws_ec2_adapter>",
      "msTeamsAdapter": "<ms_teams_adapter>",
      "Dimensions": {{- (.Details.WithTag "dimension").ToMap | toJSON -}},
      "Links": {{- (.Details.WithTag "url") | toJSON -}}
    {{- end -}}
  {{- end -}}
}
```

Once the Custom Webhook is created with the above Go template as well as URL of the IAP API endpoint, a <a href='https://kb.kentik.com/v4/Ga08.htm#Ga08-Manage_Alert_Policies' target='_blank'>Kentik Alert Policy</a> must be configured to send a request to IAP upon a threshold being reached using Custom Webhook created above. This automation was tested using a Critical threshold in the Alert Policy, but other threshold levels could be used.
  
##### IP Whitelist

A <a href='https://docs.itential.com/docs/newvariable-task-2023-1?highlight=new%20job%20variable' target='_blank'>newVariable task</a> at the start of the workflow `AWS Blocked Traffic Event - Kentik - Example` is used to create an IP whitelist for allowed source IPs to reach the server in AWS that Kentik is observing.
  



#### Running Automation and Resetting State

In order for Kentik to send a request to IAP the client source IP must not exist in the corresponding security group for the server in AWS. The `AWS Blocked Traffic - Reset - Kentik - Example` Operations Manager automation can delete a given source IP from a given security group.

There is a delay between when a source IP not in the AWS security group attempts to reach the server on AWS and when the Kentik request due to alarm threshold met is sent to IAP. Look for messages in Microsoft Teams when the request is sent to IAP from Kentik.



#### Entry Point IAP Component

The primary IAP component to run **AWS Blocked Traffic - Kentik - Example** is listed below:

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

#### Inputs

The following table lists the inputs for **AWS Blocked Traffic - Kentik - Example**:

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
      <td>no</td>
      <td>Company ID in Kentik</td>
      <td><pre lang="json">180173</pre></td>
    </tr>    <tr>
      <td>CurrentState</td>
      <td>string</td>
      <td>no</td>
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
      <td>no</td>
      <td>Geography source</td>
      <td><pre lang="json">US</pre></td>
    </tr>    <tr>
      <td>Dimensions.IP_dst</td>
      <td>string</td>
      <td>yes</td>
      <td>IP destination</td>
      <td><pre lang="json">13.13.13.13</pre></td>
    </tr>    <tr>
      <td>Dimensions.IP_src</td>
      <td>string</td>
      <td>yes</td>
      <td>IP source</td>
      <td><pre lang="json">45.129.14.30</pre></td>
    </tr>    <tr>
      <td>Dimensions.kt_aws_action</td>
      <td>string</td>
      <td>no</td>
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
      <td>no</td>
      <td>Kentik link label</td>
      <td><pre lang="json">Open Dashboard</pre></td>
    </tr>    <tr>
      <td>Links[i].Value</td>
      <td>string</td>
      <td>yes</td>
      <td>Kentik link value</td>
      <td><pre lang="json">https://portal.kentik.com/v4/library/dashboards/18392</pre></td>
    </tr>    <tr>
      <td>Description</td>
      <td>string</td>
      <td>no</td>
      <td>Kentik alarm description</td>
      <td><pre lang="json">Alarm for Web Server Traffic Rejections Requires Ack</pre></td>
    </tr>    <tr>
      <td>AlarmPolicyName</td>
      <td>string</td>
      <td>yes</td>
      <td>The name of the alert policy generating this notification</td>
      <td><pre lang="json">US Policy Rejected Web Server Traffic</pre></td>
    </tr>    <tr>
      <td>AlarmID</td>
      <td>string</td>
      <td>no</td>
      <td>Alarm ID</td>
      <td><pre lang="json">266940386</pre></td>
    </tr>    <tr>
      <td>AlarmPolicyMetadataType</td>
      <td>string</td>
      <td>no</td>
      <td>Alarm policy metadata type</td>
      <td><pre lang="json">Custom</pre></td>
    </tr>    <tr>
      <td>AlarmSeverity</td>
      <td>string</td>
      <td>no</td>
      <td>Alarm severity</td>
      <td><pre lang="json">critical</pre></td>
    </tr>    <tr>
      <td>AlarmThresholdID</td>
      <td>string</td>
      <td>no</td>
      <td>Alarm threshold ID</td>
      <td><pre lang="json">446709</pre></td>
    </tr>
  </tbody>
</table>



#### Outputs

There are no outputs for **AWS Blocked Traffic - Kentik - Example**.


#### Query Output

There are no query output examples for **AWS Blocked Traffic - Kentik - Example**.




#### Example Inputs and Outputs

  
##### Example 1

    
Input:
<pre>{
  "iapUrl": "https://iap-dev:443",
  "serviceNowUrl": "https://service-now.com",
  "allPolicyEventsWebhookUrl": "webhookurl1",
  "policyAutomatedFailureWebhookUrl": "webhookurl2",
  "policyAutomatedAuthorizationWebhookUrl": "webhookurl3",
  "serviceNowAdapter": "ServiceNow",
  "awsEC2Adapter": "AWS",
  "msTeamsAdapter": "MS Teams",
  "AlarmPolicyName": "US Policy Rejected Web Server Traffic",
  "Dimensions": {
    "AS_src": "1000",
    "IP_dst": "11.11.11.11",
    "IP_src": "10.10.10.10",
    "kt_aws_dst_sg": "aws_security_group"
  },
  "Links": [
    {
      "Name": "DashboardAlarmURL",
      "Label": "Open Dashboard",
      "Value": "https://portal.kentik.com/v4/library/dashboards/10000"
    },
    {
      "Name": "DetailsAlarmURL",
      "Label": "Open Details",
      "Value": "https://portal.kentik.com/v4/alerting/a215729224"
    }
  ]
} </pre>

    
    
Output:
<pre>{} </pre>

    
  


#### API Links


<table>
  <thead>
    <tr>
      <th>API Name</th>
      <th>API Documentation Link</th>
      <th>API Link Visibility</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Kentik API Reference</td>
      <td><a href="https://kb.kentik.com/v0/Ab09.htm">https://kb.kentik.com/v0/Ab09.htm</a></td>
      <td>Public</td>
    </tr>    <tr>
      <td>Kentik Custom Webhook Templating Reference</td>
      <td><a href="https://github.com/kentik/custom-notification-templates/blob/main/docs/TEMPLATING_REFERENCE.md">https://github.com/kentik/custom-notification-templates/blob/main/docs/TEMPLATING_REFERENCE.md</a></td>
      <td>Public</td>
    </tr>    <tr>
      <td>Kentik Notification Channel Management Overview</td>
      <td><a href="https://kb.kentik.com/v4/Cb24.htm#Cb24-Manage_Notification_Channels">https://kb.kentik.com/v4/Cb24.htm#Cb24-Manage_Notification_Channels</a></td>
      <td>Public</td>
    </tr>    <tr>
      <td>Kentik Alert Policies Management Overview</td>
      <td><a href="https://kb.kentik.com/v4/Ga08.htm#Ga08-Manage_Alert_Policies">https://kb.kentik.com/v4/Ga08.htm#Ga08-Manage_Alert_Policies</a></td>
      <td>Public</td>
    </tr>    <tr>
      <td>Kentik General Dimentions Overview</td>
      <td><a href="https://kb.kentik.com/v0/Ia04.htm">https://kb.kentik.com/v0/Ia04.htm</a></td>
      <td>Public</td>
    </tr>    <tr>
      <td>Microsoft Teams Creating Incoming Webhooks Overview</td>
      <td><a href="https://learn.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook?tabs=dotnet">https://learn.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook?tabs=dotnet</a></td>
      <td>Public</td>
    </tr>
  </tbody>
</table>


### AWS Blocked Traffic - Reset - Kentik - Example
Workflow that is used to remove source IP from security group in AWS to reset data for AWS Blocked Traffic - Kentik - Example automation

Capabilities include:
- Removes IP from security group in AWS







#### Entry Point IAP Component

The primary IAP component to run **AWS Blocked Traffic - Reset - Kentik - Example** is listed below:

<table>
  <thead>
    <tr>
      <th>IAP Component Name</th>
      <th>IAP Component Type</th>
    </tr>
  </thead>
  <tbody>
      <td>AWS Blocked Traffic - Reset - Kentik - Example</td>
      <td>Operations Manager Automation</td>
    </tr>
  </tbody>
</table>

#### Inputs

The following table lists the inputs for **AWS Blocked Traffic - Reset - Kentik - Example**:

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
      <td>sourceIP</td>
      <td>string</td>
      <td>yes</td>
      <td>IP to remove from security group in AWS</td>
      <td><pre lang="json">10.10.10.10</pre></td>
    </tr>    <tr>
      <td>awsEC2Adapter</td>
      <td>string</td>
      <td>yes</td>
      <td>The AWS EC2 adapter to use in job</td>
      <td><pre lang="json">AWS</pre></td>
    </tr>    <tr>
      <td>awsSecurityGroup</td>
      <td>string</td>
      <td>yes</td>
      <td>The AWS security group from which to remove IP address provided</td>
      <td><pre lang="json">security-group-east</pre></td>
    </tr>
  </tbody>
</table>



#### Outputs

There are no outputs for **AWS Blocked Traffic - Reset - Kentik - Example**.


#### Query Output

There are no query output examples for **AWS Blocked Traffic - Reset - Kentik - Example**.




#### Example Inputs and Outputs

  
##### Example 1

    
Input:
<pre>{
    "sourceIP": "10.10.10.10",
    "awsEC2Adapter": "AWS",
    "awsSecurityGroup": "security_group"
  } </pre>

    
    
Output:
<pre>{} </pre>

    
  


#### API Links


No API Links provided.


### Device Onboarding - Kentik - Example
This automation example can be installed and reviewed for ideas on how to query a Cisco IOS device from NetBox that has already been onboarded to Itential Automation Gateway (IAG) and then onboards the device into Kentik. Once onboarded into Kentik, the device is configured via IAG to send flow data to Kentik. Finally, the automation validates that Kentik has received flow data from the device.</br></br>IAP updates NetBox with the Kentik device ID and keeps Change Management up to date integrating with ServiceNow and MS Teams for notifications throughout the automation.

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



#### Configuring Dependencies
  
##### NetBox

A single Cisco IOS device needs to be set in NetBox that has a name, a site name, and local config context data. See example object with these fields provided below.

```json
{
  "name": "ATLSWITCH01",
  "site": {
    "name": "ATL HQ"
  },
  "config_context": {
    "ipAddress": "1.2.3.4",
    "sampleRate": 1,
    "snmpV3Conf": {
      "userName": "username",
      "privacyProtocol": "AES",
      "privacyPassphrase": "passphrase",
      "authenticationProtocol": "SHA",
      "authenticationPassphrase": "password"
    },
    "description": "IOS Device"
  }
}
```
  
##### Microsoft Teams

This IAP automation sends formatted messages over Microsoft Teams with links to the IAP job run, a ServiceNow Change Request created for the device onboarding event, and the Kentik flow data. One Microsoft Teams channel called `Device Onboarding` is used in this automation that requires creating an Incoming Webhook.

Follow the Microsoft Teams documentation linked for <a href='https://learn.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook?tabs=dotnet' target='_blank'>creating Incoming Webhooks</a> for setting up the webhook for that channel.
  
##### Itential Automation Gateway

A Cisco IOS device must be onboarded to Itential Automation Gateway (IAG) as an Ansible inventory device. See example properties in JSON object below for this:

```json
{
  "ansible_network_os": "ios",
  "host_key_checking": 0,
  "ansible_port": 22,
  "ansible_user": "username",
  "ansible_password": "password",
  "ansible_host": "10.10.10.10",
  "ansible_connection": "network_cli"
}
```
  





#### Entry Point IAP Component

The primary IAP component to run **Device Onboarding - Kentik - Example** is listed below:

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

#### Inputs

The following table lists the inputs for **Device Onboarding - Kentik - Example**:

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



#### Outputs

There are no outputs for **Device Onboarding - Kentik - Example**.


#### Query Output

There are no query output examples for **Device Onboarding - Kentik - Example**.




#### Example Inputs and Outputs

  
##### Example 1

    
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

    
    
Output:
<pre>{} </pre>

    
  


#### API Links


<table>
  <thead>
    <tr>
      <th>API Name</th>
      <th>API Documentation Link</th>
      <th>API Link Visibility</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Kentik API Reference</td>
      <td><a href="https://kb.kentik.com/v0/Ab09.htm">https://kb.kentik.com/v0/Ab09.htm</a></td>
      <td>Public</td>
    </tr>    <tr>
      <td>Kentik Notification Channel Management Overview</td>
      <td><a href="https://kb.kentik.com/v4/Cb24.htm#Cb24-Manage_Notification_Channels">https://kb.kentik.com/v4/Cb24.htm#Cb24-Manage_Notification_Channels</a></td>
      <td>Public</td>
    </tr>    <tr>
      <td>Kentik General Dimentions Overview</td>
      <td><a href="https://kb.kentik.com/v0/Ia04.htm">https://kb.kentik.com/v0/Ia04.htm</a></td>
      <td>Public</td>
    </tr>    <tr>
      <td>Microsoft Teams Creating Incoming Webhooks Overview</td>
      <td><a href="https://learn.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook?tabs=dotnet">https://learn.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook?tabs=dotnet</a></td>
      <td>Public</td>
    </tr>
  </tbody>
</table>


### Device Onboarding - Reset - Kentik - Example
Automation removes flow test Cisco IOS device configuration and deletes device from Kentik to reset data for Device Onboarding - Kentik - Example automation

Capabilities include:
- Removes flow test configuration on Cisco IOS device over Itential Automation Gateway
- Archives and then deletes device from Kentik







#### Entry Point IAP Component

The primary IAP component to run **Device Onboarding - Reset - Kentik - Example** is listed below:

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

#### Inputs

The following table lists the inputs for **Device Onboarding - Reset - Kentik - Example**:

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



#### Outputs

There are no outputs for **Device Onboarding - Reset - Kentik - Example**.


#### Query Output

There are no query output examples for **Device Onboarding - Reset - Kentik - Example**.




#### Example Inputs and Outputs

  
##### Example 1

    
Input:
<pre>{
  "formData":  {
    "deviceName": "ios_device",
    "kentikAdapter": "Kentik v5"
  }
} </pre>

    
    
Output:
<pre>{} </pre>

    
  


#### API Links


No API Links provided.


## Additional Information

### Support
Please use your Itential Customer Success account if you need support when using this Workflow Project.



