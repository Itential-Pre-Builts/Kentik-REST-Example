# AWS Blocked Traffic - Reset - Kentik - Example

## Table of Contents

- [AWS Blocked Traffic - Reset - Kentik - Example](#aws-blocked-traffic---reset---kentik---example)
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
    - [Query Output](#query-output)
    - [Example Inputs and Outputs](#example-inputs-and-outputs)
    - [API Links](#api-links)
  - [Support](#support)

## Overview

Workflow that is used to remove source IP from security group in AWS to reset data for AWS Blocked Traffic - Kentik - Example automation

Capabilities include:
- Removes IP from security group in AWS





## Getting Started

### Supported IAP Versions

Itential Example Projects are built and tested on particular versions of IAP. In addition, Example Projects are often dependent on external systems and as such, these Example Projects will have dependencies on these other systems. This version of **AWS Blocked Traffic - Reset - Kentik - Example** has been tested with:


- IAP **2023.2**



### External Dependencies

This version of **AWS Blocked Traffic - Reset - Kentik - Example** has been tested with:

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
      <td>AWS</td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>




### Adapters

This version of **AWS Blocked Traffic - Reset - Kentik - Example** has been tested with:

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
      <td><a href="https://gitlab.com/itentialopensource/adapters/cloud/adapter-aws_ec2">adapter-aws_ec2</a></td>
      <td>^0.6.9</td>
      <td></td>
    </tr>
  </tbody>
</table>



### How to Install

To install the Example Project:

- Verify you are running a supported version of the Itential Automation Platform (IAP) as listed above in the [Supported IAP Versions](#supported-iap-versions) section in order to install the Example Project.
- Import the Example Project in [Admin Essentials](https://docs.itential.com/docs/importing-pre-built-iap).

### Testing

While Itential tests this Example Project and its capabilities, it is often the case the customer environments offer their own unique circumstances. Therefore, it is our recommendation that you deploy this Example Project into a development/testing environment in which you can test the Example Project.

## Using this Example Project


### Entry Point IAP Component

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

### Inputs

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



### Outputs

There are no outputs for **AWS Blocked Traffic - Reset - Kentik - Example**.


### Query Output

There are no query output examples for **AWS Blocked Traffic - Reset - Kentik - Example**.




### Example Inputs and Outputs

  
#### Example 1

    
Input:
<pre>{
    "sourceIP": "10.10.10.10",
    "awsEC2Adapter": "AWS",
    "awsSecurityGroup": "security_group"
  } </pre>

    
    
Output:
<pre>{} </pre>

    
  


### API Links


No API Links provided.


## Support

Please use your Itential Customer Success account if you need support when using **AWS Blocked Traffic - Reset - Kentik - Example**.