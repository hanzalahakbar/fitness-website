# Skill Creator

Create new Claude Code skills interactively.

## Triggers

- /create-skill
- /new-skill
- /skill-creator

## Instructions

When this skill is triggered, guide the user through creating a new skill by collecting the following information:

### Step 1: Ask for Skill Purpose

Ask the user:
```
What should this skill do? Describe its purpose and main functionality.
```

### Step 2: Ask for Skill Name

Ask the user:
```
What should this skill be called? (This will be the folder name, use kebab-case like "code-reviewer" or "test-runner")
```

### Step 3: Ask for Trigger Phrases

Ask the user:
```
What trigger phrases should activate this skill? (e.g., /review, /run-tests)
List them separated by commas.
```

### Step 4: Ask for Additional Details (Optional)

Ask the user:
```
Any additional instructions or constraints for this skill? (Press enter to skip)
```

### Step 5: Generate the Skill

Create the skill in `.claude/skills/<skill-name>/SKILL.md` with the following structure:

```markdown
# <Skill Title>

<Description of what the skill does>

## Triggers

- /<trigger-1>
- /<trigger-2>

## Instructions

<Detailed instructions for how Claude should behave when this skill is activated>

## Example Usage

<Example of how to use the skill>
```

### Output

After generating the skill, confirm to the user:
1. The path where the skill was created
2. The trigger phrases they can use
3. A brief summary of what the skill does

## Example Usage

User: /create-skill
Assistant: Guides user through the skill creation wizard and generates `.claude/skills/my-new-skill/SKILL.md`
