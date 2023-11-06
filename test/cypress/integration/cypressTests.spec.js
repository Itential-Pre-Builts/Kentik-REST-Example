import { WorkflowRunner, PrebuiltRunner } from '@itential-tools/iap-cypress-testing-library/testRunner/testRunners';
const DeviceOnboardingKentikExampleJob0Data = require('../fixtures/stubs/Device Onboarding - Kentik - Example Job0.json');
const DeviceOnboardingResetKentikExampleJob1Data = require('../fixtures/stubs/Device Onboarding - Reset - Kentik - Example Job1.json');
const AWSBlockedTrafficEventKentikExampleJob2Data = require('../fixtures/stubs/AWS Blocked Traffic Event - Kentik - Example Job2.json');
const AWSBlockedTrafficEventKentikExampleJob3Data = require('../fixtures/stubs/AWS Blocked Traffic Event - Kentik - Example Job3.json');
const AWSBlockedTrafficEventKentikExampleJob4Data = require('../fixtures/stubs/AWS Blocked Traffic Event - Kentik - Example Job4.json');
const PushConfigurationtoDeviceIAGJob5Data = require('../fixtures/stubs/Push Configuration to Device - IAG Job5.json');
const CreateDeviceKentikRESTJob6Data = require('../fixtures/stubs/Create Device - Kentik - REST Job6.json');
const DeviceOnboardingFlowTestKentikExampleJob7Data = require('../fixtures/stubs/Device Onboarding Flow Test - Kentik - Example Job7.json');
const SendNotificationMicrosoftTeamsRESTJob9Data = require('../fixtures/stubs/Send Notification - Microsoft - Teams - REST Job9.json');
const PushConfigurationtoDeviceIAGJob11Data = require('../fixtures/stubs/Push Configuration to Device - IAG Job11.json');
const CommandTemplateRunnerJob21Data = require('../fixtures/stubs/Command Template Runner Job21.json');
const DeviceFlowTestKentikRESTJob22Data = require('../fixtures/stubs/Device Flow Test - Kentik - REST Job22.json');

function initializeWorkflowRunner(workflow, importWorkflow, isStub, stubTasks) {
  let workflowRunner = new WorkflowRunner(workflow.name);

  if (importWorkflow) {
    // cancel all running jobs for workflow
    workflowRunner.job.cancelAllJobs();

    workflowRunner.deleteWorkflow.allCopies({
      failOnStatusCode: false
    });
    // Check if Stub flag is enabled
    if(isStub){
      stubTasks.forEach(stubTask=>{
        workflow = workflowRunner.stub.task({
          stub: stubTask,
          workflow: workflow,
        });
      })
    }
    workflowRunner.importWorkflow.single({
      workflow,
      failOnStatusCode: false
    });
  }

  /* Verify workflow */
  workflowRunner.verifyWorkflow.exists();
  workflowRunner.verifyWorkflow.hasNoDuplicates({});
  // workflowRunner.verifyWorkflow.dependenciesOnline();

  return workflowRunner;
}

// Function to delete the stubbed workflow and reimport it without the stub tasks
function replaceStubTasks(workflowRunner, workflowName) {
    workflowRunner.deleteWorkflow.allCopies({
        failOnStatusCode: false,
    });
    workflowRunner.importWorkflow.single({ workflow: workflowName });
    workflowRunner.verifyWorkflow.exists();
    workflowRunner.verifyWorkflow.hasNoDuplicates({});
}

describe('Default: Cypress Tests', function () {
  let prebuiltRunner;
  let DeviceOnboardingKentikExampleJob0Workflow;
  let DeviceOnboardingResetKentikExampleJob1Workflow;
  let AWSBlockedTrafficEventKentikExampleJob2Workflow;
  let AWSBlockedTrafficEventKentikExampleJob3Workflow;
  let AWSBlockedTrafficEventKentikExampleJob4Workflow;
  let PushConfigurationtoDeviceIAGJob5Workflow;
  let CreateDeviceKentikRESTJob6Workflow;
  let DeviceOnboardingFlowTestKentikExampleJob7Workflow;
  let SendNotificationMicrosoftTeamsRESTJob9Workflow;
  let PushConfigurationtoDeviceIAGJob11Workflow;
  let CommandTemplateRunnerJob21Workflow;
  let DeviceFlowTestKentikRESTJob22Workflow;
  
  before(function () {
    //creates a prebuilt runner for importing the project
    cy.fixture(`../../../artifact.json`).then((data) => {
      prebuiltRunner = new PrebuiltRunner(data);
    });
    cy.fixture(`../../../bundles/workflows/Device Onboarding - Kentik - Example.json`).then((data) => {
      DeviceOnboardingKentikExampleJob0Workflow = data;
    });
    cy.fixture(`../../../bundles/workflows/Device Onboarding - Reset - Kentik - Example.json`).then((data) => {
      DeviceOnboardingResetKentikExampleJob1Workflow = data;
    });
    cy.fixture(`../../../bundles/workflows/AWS Blocked Traffic Event - Kentik - Example.json`).then((data) => {
      AWSBlockedTrafficEventKentikExampleJob2Workflow = data;
    });
    cy.fixture(`../../../bundles/workflows/AWS Blocked Traffic Event - Kentik - Example.json`).then((data) => {
      AWSBlockedTrafficEventKentikExampleJob3Workflow = data;
    });
    cy.fixture(`../../../bundles/workflows/AWS Blocked Traffic Event - Kentik - Example.json`).then((data) => {
      AWSBlockedTrafficEventKentikExampleJob4Workflow = data;
    });
    cy.fixture(`../../../bundles/workflows/Push Configuration to Device - IAG.json`).then((data) => {
      PushConfigurationtoDeviceIAGJob5Workflow = data;
    });
    cy.fixture(`../../../bundles/workflows/Create Device - Kentik - REST.json`).then((data) => {
      CreateDeviceKentikRESTJob6Workflow = data;
    });
    cy.fixture(`../../../bundles/workflows/Device Onboarding Flow Test - Kentik - Example.json`).then((data) => {
      DeviceOnboardingFlowTestKentikExampleJob7Workflow = data;
    });
    cy.fixture(`../../../bundles/workflows/Send Notification - Microsoft - Teams - REST.json`).then((data) => {
      SendNotificationMicrosoftTeamsRESTJob9Workflow = data;
    });
    cy.fixture(`../../../bundles/workflows/Push Configuration to Device - IAG.json`).then((data) => {
      PushConfigurationtoDeviceIAGJob11Workflow = data;
    });
    cy.fixture(`../../../bundles/workflows/Command Template Runner.json`).then((data) => {
      CommandTemplateRunnerJob21Workflow = data;
    });
    cy.fixture(`../../../bundles/workflows/Device Flow Test - Kentik - REST.json`).then((data) => {
      DeviceFlowTestKentikRESTJob22Workflow = data;
    });
    
  });

  after(function() {
    prebuiltRunner.deletePrebuilt.single({ failOnStatusCode: false });
  });

  describe('Default: Imports Project', function () {
    // eslint-disable-next-line mocha/no-hooks-for-single-case
    it('Default: Should import the project into IAP', function () {
        prebuiltRunner.deletePrebuilt.single({ failOnStatusCode: false });
        prebuiltRunner.importPrebuilt.single({});
    });
  })

  describe('Device Onboarding - Kentik - Example', function() {
    it('It should run Device Onboarding - Kentik - Example and onboard device successfully to Kentik', function () {
      const importWorkflow = true;
      const isStub = true;
      // create the job runner so it can be used in future tests
      const workflowRunner = initializeWorkflowRunner(DeviceOnboardingKentikExampleJob0Workflow, importWorkflow, isStub, DeviceOnboardingKentikExampleJob0Data.stubTasks);
      // this has to be customized to each IAP version.

      workflowRunner.job.startAndReturnResultsWhenComplete({
        options: DeviceOnboardingKentikExampleJob0Data.input,
        retryTime: 2000,
      }).then((jobVariableResults) => {
        expect(jobVariableResults['status']).eql(DeviceOnboardingKentikExampleJob0Data.expectedTaskResults.status);
        workflowRunner.job.getJobVariables(jobVariableResults._id).then(jobVariables => {
          delete jobVariables._id;
          delete jobVariables.initiator;
          expect(jobVariables).eql(DeviceOnboardingKentikExampleJob0Data.expectedTaskResults.variables);
        });
        /* Restore the workflow without the stub tasks */
        replaceStubTasks(workflowRunner, DeviceOnboardingKentikExampleJob0Workflow);
      });
    })
  })

  describe('Device Onboarding - Reset - Kentik - Example', function() {
    it('It should run Device Onboarding - Reset - Kentik - Example and delete flow configuration and device from Kentik', function () {
      const importWorkflow = true;
      const isStub = true;
      // create the job runner so it can be used in future tests
      const workflowRunner = initializeWorkflowRunner(DeviceOnboardingResetKentikExampleJob1Workflow, importWorkflow, isStub, DeviceOnboardingResetKentikExampleJob1Data.stubTasks);
      // this has to be customized to each IAP version.

      workflowRunner.job.startAndReturnResultsWhenComplete({
        options: DeviceOnboardingResetKentikExampleJob1Data.input,
        retryTime: 2000,
      }).then((jobVariableResults) => {
        expect(jobVariableResults['status']).eql(DeviceOnboardingResetKentikExampleJob1Data.expectedTaskResults.status);
        workflowRunner.job.getJobVariables(jobVariableResults._id).then(jobVariables => {
          delete jobVariables._id;
          delete jobVariables.initiator;
          expect(jobVariables).eql(DeviceOnboardingResetKentikExampleJob1Data.expectedTaskResults.variables);
        });
        /* Restore the workflow without the stub tasks */
        replaceStubTasks(workflowRunner, DeviceOnboardingResetKentikExampleJob1Workflow);
      });
    })
  })

  describe('AWS Blocked Traffic Event - Kentik - Example', function() {
    it('It should run AWS Blocked Traffic Event - Kentik - Example and automatically authorize IP', function () {
      const importWorkflow = true;
      const isStub = true;
      // create the job runner so it can be used in future tests
      const workflowRunner = initializeWorkflowRunner(AWSBlockedTrafficEventKentikExampleJob2Workflow, importWorkflow, isStub, AWSBlockedTrafficEventKentikExampleJob2Data.stubTasks);
      // this has to be customized to each IAP version.

      workflowRunner.job.startAndReturnResultsWhenComplete({
        options: AWSBlockedTrafficEventKentikExampleJob2Data.input,
        retryTime: 2000,
      }).then((jobVariableResults) => {
        expect(jobVariableResults['status']).eql(AWSBlockedTrafficEventKentikExampleJob2Data.expectedTaskResults.status);
        workflowRunner.job.getJobVariables(jobVariableResults._id).then(jobVariables => {
          delete jobVariables._id;
          delete jobVariables.initiator;
          expect(jobVariables).eql(AWSBlockedTrafficEventKentikExampleJob2Data.expectedTaskResults.variables);
        });
        /* Restore the workflow without the stub tasks */
        replaceStubTasks(workflowRunner, AWSBlockedTrafficEventKentikExampleJob2Workflow);
      });
    })
  })

  describe('AWS Blocked Traffic Event - Kentik - Example', function() {
    it('It should run AWS Blocked Traffic Event - Kentik - Example and see IP already in AWS security group', function () {
      const importWorkflow = true;
      const isStub = true;
      // create the job runner so it can be used in future tests
      const workflowRunner = initializeWorkflowRunner(AWSBlockedTrafficEventKentikExampleJob3Workflow, importWorkflow, isStub, AWSBlockedTrafficEventKentikExampleJob3Data.stubTasks);
      // this has to be customized to each IAP version.

      workflowRunner.job.startAndReturnResultsWhenComplete({
        options: AWSBlockedTrafficEventKentikExampleJob3Data.input,
        retryTime: 2000,
      }).then((jobVariableResults) => {
        expect(jobVariableResults['status']).eql(AWSBlockedTrafficEventKentikExampleJob3Data.expectedTaskResults.status);
        workflowRunner.job.getJobVariables(jobVariableResults._id).then(jobVariables => {
          delete jobVariables._id;
          delete jobVariables.initiator;
          expect(jobVariables).eql(AWSBlockedTrafficEventKentikExampleJob3Data.expectedTaskResults.variables);
        });
        /* Restore the workflow without the stub tasks */
        replaceStubTasks(workflowRunner, AWSBlockedTrafficEventKentikExampleJob3Workflow);
      });
    })
  })

  describe('AWS Blocked Traffic Event - Kentik - Example', function() {
    it('It should run AWS Blocked Traffic Event - Kentik - Example and send notifcation of access attempt from non-white-listed IP', function () {
      const importWorkflow = true;
      const isStub = true;
      // create the job runner so it can be used in future tests
      const workflowRunner = initializeWorkflowRunner(AWSBlockedTrafficEventKentikExampleJob4Workflow, importWorkflow, isStub, AWSBlockedTrafficEventKentikExampleJob4Data.stubTasks);
      // this has to be customized to each IAP version.

      workflowRunner.job.startAndReturnResultsWhenComplete({
        options: AWSBlockedTrafficEventKentikExampleJob4Data.input,
        retryTime: 2000,
      }).then((jobVariableResults) => {
        expect(jobVariableResults['status']).eql(AWSBlockedTrafficEventKentikExampleJob4Data.expectedTaskResults.status);
        workflowRunner.job.getJobVariables(jobVariableResults._id).then(jobVariables => {
          delete jobVariables._id;
          delete jobVariables.initiator;
          expect(jobVariables).eql(AWSBlockedTrafficEventKentikExampleJob4Data.expectedTaskResults.variables);
        });
        /* Restore the workflow without the stub tasks */
        replaceStubTasks(workflowRunner, AWSBlockedTrafficEventKentikExampleJob4Workflow);
      });
    })
  })

  describe('Push Configuration to Device - IAG', function() {
    it('Push Configuration to Device - IAG: It should run Device Onboarding - Kentik - Example and onboard device successfully to Kentik', function () {
      const importWorkflow = true;
      const isStub = true;
      // create the job runner so it can be used in future tests
      const workflowRunner = initializeWorkflowRunner(PushConfigurationtoDeviceIAGJob5Workflow, importWorkflow, isStub, PushConfigurationtoDeviceIAGJob5Data.stubTasks);
      // this has to be customized to each IAP version.

      workflowRunner.job.startAndReturnResultsWhenComplete({
        options: PushConfigurationtoDeviceIAGJob5Data.input,
        retryTime: 2000,
      }).then((jobVariableResults) => {
        expect(jobVariableResults['status']).eql(PushConfigurationtoDeviceIAGJob5Data.expectedTaskResults.status);
        workflowRunner.job.getJobVariables(jobVariableResults._id).then(jobVariables => {
          delete jobVariables._id;
          delete jobVariables.initiator;
          expect(jobVariables).eql(PushConfigurationtoDeviceIAGJob5Data.expectedTaskResults.variables);
        });
        /* Restore the workflow without the stub tasks */
        replaceStubTasks(workflowRunner, PushConfigurationtoDeviceIAGJob5Workflow);
      });
    })
  })

  describe('Create Device - Kentik - REST', function() {
    it('Create Device - Kentik - REST: It should run Device Onboarding - Kentik - Example and onboard device successfully to Kentik', function () {
      const importWorkflow = true;
      const isStub = true;
      // create the job runner so it can be used in future tests
      const workflowRunner = initializeWorkflowRunner(CreateDeviceKentikRESTJob6Workflow, importWorkflow, isStub, CreateDeviceKentikRESTJob6Data.stubTasks);
      // this has to be customized to each IAP version.

      workflowRunner.job.startAndReturnResultsWhenComplete({
        options: CreateDeviceKentikRESTJob6Data.input,
        retryTime: 2000,
      }).then((jobVariableResults) => {
        expect(jobVariableResults['status']).eql(CreateDeviceKentikRESTJob6Data.expectedTaskResults.status);
        workflowRunner.job.getJobVariables(jobVariableResults._id).then(jobVariables => {
          delete jobVariables._id;
          delete jobVariables.initiator;
          expect(jobVariables).eql(CreateDeviceKentikRESTJob6Data.expectedTaskResults.variables);
        });
        /* Restore the workflow without the stub tasks */
        replaceStubTasks(workflowRunner, CreateDeviceKentikRESTJob6Workflow);
      });
    })
  })

  describe('Device Onboarding Flow Test - Kentik - Example', function() {
    it('Device Onboarding Flow Test - Kentik - Example: It should run Device Onboarding - Kentik - Example and onboard device successfully to Kentik', function () {
      const importWorkflow = true;
      const isStub = true;
      // create the job runner so it can be used in future tests
      const workflowRunner = initializeWorkflowRunner(DeviceOnboardingFlowTestKentikExampleJob7Workflow, importWorkflow, isStub, DeviceOnboardingFlowTestKentikExampleJob7Data.stubTasks);
      // this has to be customized to each IAP version.

      workflowRunner.job.startAndReturnResultsWhenComplete({
        options: DeviceOnboardingFlowTestKentikExampleJob7Data.input,
        retryTime: 2000,
      }).then((jobVariableResults) => {
        expect(jobVariableResults['status']).eql(DeviceOnboardingFlowTestKentikExampleJob7Data.expectedTaskResults.status);
        workflowRunner.job.getJobVariables(jobVariableResults._id).then(jobVariables => {
          delete jobVariables._id;
          delete jobVariables.initiator;
          expect(jobVariables).eql(DeviceOnboardingFlowTestKentikExampleJob7Data.expectedTaskResults.variables);
        });
        /* Restore the workflow without the stub tasks */
        replaceStubTasks(workflowRunner, DeviceOnboardingFlowTestKentikExampleJob7Workflow);
      });
    })
  })

  describe('Send Notification - Microsoft - Teams - REST', function() {
    it('Send Notification - Microsoft - Teams - REST: It should run Device Onboarding - Kentik - Example and onboard device successfully to Kentik', function () {
      const importWorkflow = true;
      const isStub = true;
      // create the job runner so it can be used in future tests
      const workflowRunner = initializeWorkflowRunner(SendNotificationMicrosoftTeamsRESTJob9Workflow, importWorkflow, isStub, SendNotificationMicrosoftTeamsRESTJob9Data.stubTasks);
      // this has to be customized to each IAP version.

      workflowRunner.job.startAndReturnResultsWhenComplete({
        options: SendNotificationMicrosoftTeamsRESTJob9Data.input,
        retryTime: 2000,
      }).then((jobVariableResults) => {
        expect(jobVariableResults['status']).eql(SendNotificationMicrosoftTeamsRESTJob9Data.expectedTaskResults.status);
        workflowRunner.job.getJobVariables(jobVariableResults._id).then(jobVariables => {
          delete jobVariables._id;
          delete jobVariables.initiator;
          expect(jobVariables).eql(SendNotificationMicrosoftTeamsRESTJob9Data.expectedTaskResults.variables);
        });
        /* Restore the workflow without the stub tasks */
        replaceStubTasks(workflowRunner, SendNotificationMicrosoftTeamsRESTJob9Workflow);
      });
    })
  })

  describe('Push Configuration to Device - IAG', function() {
    it('Push Configuration to Device - IAG: It should run Device Onboarding - Reset - Kentik - Example and delete flow configuration and device from Kentik', function () {
      const importWorkflow = true;
      const isStub = true;
      // create the job runner so it can be used in future tests
      const workflowRunner = initializeWorkflowRunner(PushConfigurationtoDeviceIAGJob11Workflow, importWorkflow, isStub, PushConfigurationtoDeviceIAGJob11Data.stubTasks);
      // this has to be customized to each IAP version.

      workflowRunner.job.startAndReturnResultsWhenComplete({
        options: PushConfigurationtoDeviceIAGJob11Data.input,
        retryTime: 2000,
      }).then((jobVariableResults) => {
        expect(jobVariableResults['status']).eql(PushConfigurationtoDeviceIAGJob11Data.expectedTaskResults.status);
        workflowRunner.job.getJobVariables(jobVariableResults._id).then(jobVariables => {
          delete jobVariables._id;
          delete jobVariables.initiator;
          expect(jobVariables).eql(PushConfigurationtoDeviceIAGJob11Data.expectedTaskResults.variables);
        });
        /* Restore the workflow without the stub tasks */
        replaceStubTasks(workflowRunner, PushConfigurationtoDeviceIAGJob11Workflow);
      });
    })
  })

  describe('Command Template Runner', function() {
    it.skip('Command Template Runner: Device Onboarding Flow Test - Kentik - Example: It should run Device Onboarding - Kentik - Example and onboard device successfully to Kentik', function () {
      const importWorkflow = true;
      const isStub = true;
      // create the job runner so it can be used in future tests
      const workflowRunner = initializeWorkflowRunner(CommandTemplateRunnerJob21Workflow, importWorkflow, isStub, CommandTemplateRunnerJob21Data.stubTasks);
      // this has to be customized to each IAP version.

      workflowRunner.job.startAndReturnResultsWhenComplete({
        options: CommandTemplateRunnerJob21Data.input,
        retryTime: 2000,
      }).then((jobVariableResults) => {
        expect(jobVariableResults['status']).eql(CommandTemplateRunnerJob21Data.expectedTaskResults.status);
        workflowRunner.job.getJobVariables(jobVariableResults._id).then(jobVariables => {
          delete jobVariables._id;
          delete jobVariables.initiator;
          expect(jobVariables).eql(CommandTemplateRunnerJob21Data.expectedTaskResults.variables);
        });
        /* Restore the workflow without the stub tasks */
        replaceStubTasks(workflowRunner, CommandTemplateRunnerJob21Workflow);
      });
    })
  })

  describe('Device Flow Test - Kentik - REST', function() {
    it.skip('Device Flow Test - Kentik - REST: Device Onboarding Flow Test - Kentik - Example: It should run Device Onboarding - Kentik - Example and onboard device successfully to Kentik', function () {
      const importWorkflow = true;
      const isStub = true;
      // create the job runner so it can be used in future tests
      const workflowRunner = initializeWorkflowRunner(DeviceFlowTestKentikRESTJob22Workflow, importWorkflow, isStub, DeviceFlowTestKentikRESTJob22Data.stubTasks);
      // this has to be customized to each IAP version.

      workflowRunner.job.startAndReturnResultsWhenComplete({
        options: DeviceFlowTestKentikRESTJob22Data.input,
        retryTime: 2000,
      }).then((jobVariableResults) => {
        expect(jobVariableResults['status']).eql(DeviceFlowTestKentikRESTJob22Data.expectedTaskResults.status);
        workflowRunner.job.getJobVariables(jobVariableResults._id).then(jobVariables => {
          delete jobVariables._id;
          delete jobVariables.initiator;
          expect(jobVariables).eql(DeviceFlowTestKentikRESTJob22Data.expectedTaskResults.variables);
        });
        /* Restore the workflow without the stub tasks */
        // replaceStubTasks(workflowRunner, DeviceFlowTestKentikRESTJob22Workflow);
      });
    })
  })
});
