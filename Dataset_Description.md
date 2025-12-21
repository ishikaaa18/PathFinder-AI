# Project Dataset Description

## Overview
This file describes the structure and content of the dataset used in the **PathFinder AI** project. The dataset currently consists of synthetic user profiles, representing various students with different skill sets, interests, and qualifications, mapped to ideal career recommendations.

## File Information
- **File Name:** `Project_Dataset.json`
- **Format:** JSON (JavaScript Object Notation)
- **Total Records:** 5 Sample Profiles
- **Date Created:** December 2025

## Data Dictionary
The dataset follows a nested JSON structure with the following fields:

### Root Object (User Record)
| Field | Type | Description |
| :--- | :--- | :--- |
| `user_id` | String | Unique identifier for the user (e.g., "u_001"). |
| `profile` | Object | Personal and educational details of the user. |
| `skills` | Array | List of technical skills possessed by the user. |
| `interests` | Array | Areas of professional interest. |
| `qualifications` | Array | Academic or vocational certifications. |
| `target_recommendation` | Object | The expected output/career path for this profile (Ground Truth). |

### Field Details

#### 1. Profile Object (`profile`)
- `firstName`: First Name of the student.
- `lastName`: Last Name of the student.
- `email`: Contact email.
- `current_education`: Current degree or course functionality.

#### 2. Skills Object (`skills`)
- `skillName`: Name of the technology or soft skill (e.g., "Python").
- `proficiencyLevel`: Self-assessed level (Beginner, Intermediate, Advanced, Expert).
- `yearsExperience`: Number of years practicing this skill.

#### 3. Interests Object (`interests`)
- `interestName`: General domain of interest (e.g., "AI", "Web Dev").
- `description`: Specific focus within the domain.

#### 4. Target Recommendation (`target_recommendation`)
- `role`: The ideal job role suggested for this profile.
- `match_score`: Confidence score (0.0 - 1.0) indicating fit.
- `skill_gaps`: List of missing skills required for this role.
- `learning_path`: Suggested roadmap or course focus.

## Usage
This dataset is used for:
1.  **System Verification:** Testing the backend recommendation logic against known expected outputs.
2.  **AI Fine-tuning (Future Scope):** Potential seed data for training custom models.
3.  **Demo Purposes:** Populating the dashboard with realistic example data during presentations.
