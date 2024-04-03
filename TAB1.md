# Overview 

This contains several example use cases that are applicable when the Itential Automation Platform is integrated with the Kentik Platform. Because every environment is different, these use cases are fully functioning examples that can be modified to operate in your IT ecosystem. These workflows have been written with modularity in mind to make them easy to understand and simple to modify to suit your needs.


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
      <td>This is an end-to-end automation example where an alert is triggered within a Kentik policy due to a threshold being exceeded. In this example Kentik uses an integration to call IAP's <a href='https://docs.itential.com/docs/triggers-2023-1#api-endpoint-triggers' target='_blank'>northbound API trigger</a>. Once the trigger is executed it invokes an automation that then validates the traffic can be accepted and interacts with change management (ServiceNow), AWS EC2, and a notification platform (MS Teams).</br></br>This automation example can be installed and reviewed for ideas on how to incorporate Kentik into a closed loop alert remediation scenario with IAP.</td>
    </tr>    <tr>
      <td><a href='https://gitlab.com/itentialopensource/pre-built-automations/kentik-rest-example/-/blob/master/documentation/AWS Blocked Traffic - Reset - Kentik - Example.md' target='_blank'>AWS Blocked Traffic - Reset - Kentik - Example</a></td>
      <td>Workflow that is used to remove source IP from security group in AWS to reset data for AWS Blocked Traffic - Kentik - Example automation</td>
    </tr>    <tr>
      <td><a href='https://gitlab.com/itentialopensource/pre-built-automations/kentik-rest-example/-/blob/master/documentation/Device Onboarding - Kentik - Example.md' target='_blank'>Device Onboarding - Kentik - Example</a></td>
      <td>This automation example can be installed and reviewed for ideas on how to query a Cisco IOS device from NetBox that has already been onboarded to Itential Automation Gateway (IAG) and then onboards the device into Kentik. Once onboarded into Kentik, the device is configured via IAG to send flow data to Kentik. Finally, the automation validates that Kentik has received flow data from the device.</br></br>IAP updates NetBox with the Kentik device ID and keeps Change Management up to date integrating with ServiceNow and MS Teams for notifications throughout the automation.</td>
    </tr>    <tr>
      <td><a href='https://gitlab.com/itentialopensource/pre-built-automations/kentik-rest-example/-/blob/master/documentation/Device Onboarding - Reset - Kentik - Example.md' target='_blank'>Device Onboarding - Reset - Kentik - Example</a></td>
      <td>Automation removes flow test Cisco IOS device configuration and deletes device from Kentik to reset data for Device Onboarding - Kentik - Example automation</td>
    </tr>
  </tbody>
</table>

For further technical details on how to install and use this Example Project, please click the Technical Documentation tab. 
