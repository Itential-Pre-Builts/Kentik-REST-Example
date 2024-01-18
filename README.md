# Kentik - REST - Example

## Overview

This Pre-Built Automation bundle contains several example use cases that are applicable when Itential is integrated with the Kentik Platform. Because every environment is different, these use cases are fully functioning examples that can be easily modified to operate in your specific environment. These workflows have been written with modularity in mind to make them easy to understand and simple to modify to suite your needs. Example use case in this project include:

**AWS Blocked Traffic - Kentik - Example**
This is a workflow to receive an alert from Kentik for an AWS flow log, and determine whether to update an AWS Security Group based Source IP.

**AWS Blocked Traffic - Reset - Kentik - Example**
This is a workflow to reset the AWS Security Group for the AWS Blocked Traffic - Reset - Kentik - Example.

**Device Onboarding - Kentik - Example**
This is a workflow that will read inventory from an existing NetBox system, configure the device for monitoring, and onboard it into the Kentik platform.

**Device Onboarding - Reset - Kentik - Example**
This is a workflow to reset the Device Onboarding - Kentik - Example.


## Example Workflows


<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Overview</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href='https://gitlab.com/itentialopensource/pre-built-automations/kentik-rest-example/-/blob/master/documentation/AWS Blocked Traffic - Kentik - Example.md' target='_blank'>AWS Blocked Traffic - Kentik - Example</a></td>
      <td>This is an end-to-end automation example where an alert is triggered within a Kentik policy due to a threshold being exceeded. In this example Kentik uses an integration to call IAP's <a href='https://docs.itential.com/docs/triggers-2023-1#api-endpoint-triggers' target='_blank'>northbound API trigger</a>. Once the trigger is executed it invokes an automation that then validates the traffic can be accepted and interacts with change management (ServiceNow), AWS EC2, and a notification platform (MS Teams).

This automation example can be installed and reviewed for ideas on how to incorporate Kentik into a closed loop alert remediation scenario with IAP. If interested in fully running this automation, see `Configuring Dependencies` below for setting up required dependencies.

### Configuring Dependencies

#### AWS

A <a href='https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html' target='_blank'>Security Group in AWS</a> grants access of a hosted server to given source IP. This automation is able to update a given Security Group to have source IP after alert is sent by Kentik to IAP in the Kentik <a href='https://kb.kentik.com/v0/Ia04.htm#Ia04-AWS_Dimensions' target='_blank'>AWS Dimension field kt_aws_dst_sg</a>.

#### Microsoft Teams

This IAP automation sends formatted messages over Microsoft Teams with links to the IAP job run, a ServiceNow Change Request created for an alarm event, and the Kentik flow data. Three channels are used in this automation that each require creating an Incoming Webhook and are used for the following events:

1. `Policy All Events`: receives messages any time an alert is sent from Kentik to IAP and starts a job in IAP.
2. `Policy Automated Authorizations`: receives messages when a source IP detected by Kentik sending web traffic to a given server is added to Security Group in AWS to grant access to that server since the source IP is found in a white-list.
3. `Policy Automated Failures`: received messages when a source IP fails to be added to Security Group in AWS. This can occur if a failure happens when performing that operation or the source IP is already found in the Security Group.

Follow the Microsoft Teams documentation linked for <a href='https://learn.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook?tabs=dotnet' target='_blank'>creating Incoming Webhooks</a> for each of the three channels described above.

#### Kentik

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

#### IP Whitelist

A <a href='https://docs.itential.com/docs/newvariable-task-2023-1?highlight=new%20job%20variable' target='_blank'>newVariable task</a> at the start of the workflow `AWS Blocked Traffic Event - Kentik - Example` is used to create an IP whitelist for allowed source IPs to reach the server in AWS that Kentik is observing.

### Running Automation and Resetting State

In order for Kentik to send a request to IAP the client source IP must not exist in the corresponding security group for the server in AWS. The `AWS Blocked Traffic - Reset - Kentik - Example` Operations Manager automation can delete a given source IP from a given security group.

There is a delay between when a source IP not in the AWS security group attempts to reach the server on AWS and when the Kentik request due to alarm threshold met is sent to IAP. Look for messages in Microsoft Teams when the request is sent to IAP from Kentik.</td>
    </tr>    <tr>
      <td><a href='https://gitlab.com/itentialopensource/pre-built-automations/kentik-rest-example/-/blob/master/documentation/AWS Blocked Traffic - Reset - Kentik - Example.md' target='_blank'>AWS Blocked Traffic - Reset - Kentik - Example</a></td>
      <td>Workflow that is used to remove source IP from security group in AWS to reset data for AWS Blocked Traffic - Kentik - Example automation</td>
    </tr>    <tr>
      <td><a href='https://gitlab.com/itentialopensource/pre-built-automations/kentik-rest-example/-/blob/master/documentation/Device Onboarding - Kentik - Example.md' target='_blank'>Device Onboarding - Kentik - Example</a></td>
      <td>This automation example can be installed and reviewed for ideas on how to query a Cisco IOS device from NetBox that has already been onboarded to Itential Automation Gateway (IAG) and then onboards the device into Kentik. Once onboarded into Kentik, the device is configured via IAG to send flow data to Kentik. Finally, the automation validates that Kentik has received flow data from the device.

IAP updates NetBox with the Kentik device ID and keeps Change Management up to date integrating with ServiceNow and MS Teams for notifications throughout the automation. If interested in fully running this automation, see `Configuring Dependencies` below for setting up required dependencies.

### Configuring Dependencies

#### NetBox

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

#### Microsoft Teams

This IAP automation sends formatted messages over Microsoft Teams with links to the IAP job run, a ServiceNow Change Request created for the device onboarding event, and the Kentik flow data. One Microsoft Teams channel called `Device Onboarding` is used in this automation that requires creating an Incoming Webhook.

Follow the Microsoft Teams documentation linked for <a href='https://learn.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook?tabs=dotnet' target='_blank'>creating Incoming Webhooks</a> for setting up the webhook for that channel.

#### Itential Automation Gateway

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
</td>
    </tr>    <tr>
      <td><a href='https://gitlab.com/itentialopensource/pre-built-automations/kentik-rest-example/-/blob/master/documentation/Device Onboarding - Reset - Kentik - Example.md' target='_blank'>Device Onboarding - Reset - Kentik - Example</a></td>
      <td>Automation removes flow test Cisco IOS device configuration and deletes device from Kentik to reset data for Device Onboarding - Kentik - Example automation</td>
    </tr>
  </tbody>
</table>


## External Dependencies

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
      <td>MS Teams</td>
      <td></td>
      <td></td>
    </tr>    <tr>
      <td>AWS</td>
      <td></td>
      <td></td>
    </tr>    <tr>
      <td>Itential Automation Gateway</td>
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
      <td>ServiceNow</td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>

## Adapters

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
      <td>adapter-automation_gateway</td>
      <td>^4.29.0-2023.1.12</td>
      <td></td>
    </tr>    <tr>
      <td><a href="https://gitlab.com/itentialopensource/adapters/observability/adapter-kentik_v5">adapter-kentik_v5</a></td>
      <td>^0.1.1</td>
      <td></td>
    </tr>    <tr>
      <td><a href="https://gitlab.com/itentialopensource/adapters/itsm-testing/adapter-servicenow">adapter-service_now</a></td>
      <td>^2.6.3</td>
      <td></td>
    </tr>    <tr>
      <td><a href="https://gitlab.com/itentialopensource/adapters/notification-messaging/adapter-msteams">adapter-ms_teams</a></td>
      <td>^0.13.0</td>
      <td></td>
    </tr>    <tr>
      <td><a href="https://gitlab.com/itentialopensource/adapters/inventory/adapter-netbox_v33">adapter-netbox_v33</a></td>
      <td>^2.0.0</td>
      <td></td>
    </tr>    <tr>
      <td><a href="https://gitlab.com/itentialopensource/adapters/cloud/adapter-aws_ec2">adapter-aws_ec2</a></td>
      <td>^0.6.9</td>
      <td></td>
    </tr>
  </tbody>
</table>