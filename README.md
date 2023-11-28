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


<a href='https://gitlab.com/itentialopensource/pre-built-automations/kentik-rest-example/-/blob/master/documentation/AWS Blocked Traffic - Kentik - Example.md' target='_blank'>AWS Blocked Traffic - Kentik - Example</a>

<a href='https://gitlab.com/itentialopensource/pre-built-automations/kentik-rest-example/-/blob/master/documentation/AWS Blocked Traffic - Reset - Kentik - Example.md' target='_blank'>AWS Blocked Traffic - Reset - Kentik - Example</a>

<a href='https://gitlab.com/itentialopensource/pre-built-automations/kentik-rest-example/-/blob/master/documentation/Device Onboarding - Kentik - Example.md' target='_blank'>Device Onboarding - Kentik - Example</a>

<a href='https://gitlab.com/itentialopensource/pre-built-automations/kentik-rest-example/-/blob/master/documentation/Device Onboarding - Reset - Kentik - Example.md' target='_blank'>Device Onboarding - Reset - Kentik - Example</a>



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
      <td>ServiceNow</td>
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
    </tr>
  </tbody>
</table>

## Adapters

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Version</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>adapter-netbox_v33</td>
      <td>^2.0.0</td>
    </tr>    <tr>
      <td>adapter-kentik_v5</td>
      <td>^0.1.1</td>
    </tr>    <tr>
      <td>adapter-service_now</td>
      <td>^2.6.3</td>
    </tr>    <tr>
      <td>adapter-ms_teams</td>
      <td>^0.13.0</td>
    </tr>    <tr>
      <td>adapter-automation_gateway</td>
      <td>^4.29.0-2023.1.12</td>
    </tr>    <tr>
      <td>adapter-aws_ec2</td>
      <td>^0.6.9</td>
    </tr>
  </tbody>
</table>