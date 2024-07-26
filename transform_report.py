import json

# Load the original JSON report
with open('us026.json', 'r') as file:
    original_report = json.load(file)

# The transformed report
transformed_report = []

# Transform the report
for feature in original_report:
    for scenario in feature['elements']:
        if scenario['type'] == 'scenario':
            # Check if the scenario was executed and if it was successful
            was_executed = any(step['result']['status'] != 'skipped' for step in scenario['steps'])
            was_successful = all(step['result']['status'] == 'passed' for step in scenario['steps'])
            # Set the Result object for the scenario
            scenario['Result'] = {
                "WasExecuted": was_executed,
                "WasSuccessful": was_successful,
                "WasProvided": was_executed  # Assuming if executed, results were provided
            }
    # Add the transformed feature to the report
    transformed_report.append(feature)

# Write the transformed report to a new file
with open('transformed_report.json', 'w') as file:
    json.dump(transformed_report, file, indent=2)
