# Overview 

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

For further technical details on how to install and use this Example Project, please click the Technical Documentation tab. 
