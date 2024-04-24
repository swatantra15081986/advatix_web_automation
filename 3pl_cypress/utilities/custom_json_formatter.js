const { Formatter, formatterHelpers } = require('@cucumber/cucumber')
const messages = require('@cucumber/messages')
const IEnvelope = messages.Envelope
const ITestStepFinished = messages.TestStepFinished

class custom_json_formatter extends Formatter {
  constructor(options) {
    super(options);
    this.scenarios = {
      total: 0,
      passed: 0,
      failed: 0,
    };
    options.eventBroadcaster.on('envelope', (envelope) => {
      if (envelope.testRunFinished) {
        this.onTestRunFinished();
      } else if (envelope.testStepFinished) {
        this.onTestStepFinished(envelope.testStepFinished);
      }
    });
  }

  onTestStepFinished(testStepFinished) {
    const testCase = this.eventDataCollector.getTestCaseAttempt(testStepFinished.testCaseStartedId);
    const stepResult = testStepFinished.testStepResult;

    // Initialize scenario in scenarios object if not already present
    if (!this.scenarios[testCase.testCase.pickleId]) {
      this.scenarios[testCase.testCase.pickleId] = { status: 'passed' } // Assume passed initially
      this.scenarios.total++;
    }

    // If any step fails, mark the scenario as failed
    if (stepResult.status === 'FAILED') {
      this.scenarios[testCase.testCase.pickleId].status = 'failed'
    }
    return
  }

  onTestRunFinished() {
    // Calculate passed and failed scenarios based on final status
    Object.values(this.scenarios).forEach((scenario) => {
      if (scenario.status === 'failed') {
        this.scenarios.failed++
      } else if (scenario.status === 'passed') {
        this.scenarios.passed++
      }
    });

    this.log(JSON.stringify({
      totalScenarios: this.scenarios.total,
      passedScenarios: this.scenarios.passed,
      failedScenarios: this.scenarios.failed,
    }));
    return
  }
}



exports.default = custom_json_formatter