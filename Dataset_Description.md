# Project Dataset Description

## Overview
This file describes the data structures and schemas used in the **PathFinder AI** platform. The project uses MongoDB (Atlas) as its primary data store. Data is generated dynamically through user interaction and AI inference — there is no static training dataset. Each collection is described below with its schema and purpose.

---

## Collections & Schemas

### 1. Users Collection
**Purpose:** Stores account credentials and personal information for each registered user.

| Field | Type | Description |
| :--- | :--- | :--- |
| `_id` | ObjectId | Unique MongoDB document identifier. |
| `firstName` | String | User's first name. |
| `lastName` | String | User's last name. |
| `email` | String | Unique email address (used for login). |
| `password` | String | Bcrypt-hashed password. |
| `createdAt` | Date | Account registration timestamp. |

---

### 2. Skills Collection
**Purpose:** Stores technical and soft skills associated with a user's profile.

| Field | Type | Description |
| :--- | :--- | :--- |
| `_id` | ObjectId | Unique identifier. |
| `user` | ObjectId (ref: User) | The owning user. |
| `skillName` | String | Name of the skill (e.g., "Python", "React"). |
| `proficiencyLevel` | String | Self-assessed level: Beginner / Intermediate / Advanced / Expert. |
| `yearsExperience` | Number | Years of experience with this skill. |

---

### 3. Interests Collection
**Purpose:** Stores a user's professional areas of interest that inform career recommendations.

| Field | Type | Description |
| :--- | :--- | :--- |
| `_id` | ObjectId | Unique identifier. |
| `user` | ObjectId (ref: User) | The owning user. |
| `interestName` | String | Domain of interest (e.g., "AI", "Web Development", "Data Science"). |
| `description` | String | Optional notes on specific focus within the domain. |

---

### 4. Qualifications Collection
**Purpose:** Stores the user's academic or professional certifications.

| Field | Type | Description |
| :--- | :--- | :--- |
| `_id` | ObjectId | Unique identifier. |
| `user` | ObjectId (ref: User) | The owning user. |
| `degree` | String | Degree or certification title (e.g., "B.Tech Computer Science"). |
| `institution` | String | Name of the university or course provider. |
| `year` | Number | Year of completion or expected completion. |

---

### 5. Recommendations Collection
**Purpose:** Archives all AI-generated career recommendations for a user.

| Field | Type | Description |
| :--- | :--- | :--- |
| `_id` | ObjectId | Unique identifier. |
| `user` | ObjectId (ref: User) | The owning user. |
| `careerSuggestion` | String | The AI-recommended career role (e.g., "Data Scientist"). |
| `justification` | String | AI-generated rationale for the recommendation. |
| `confidenceScore` | Number | Match confidence (0.0–1.0) between user profile and career. |
| `roadmap` | Array[String] | Ordered list of learning milestones. |
| `courseLink` | Mixed | JSON array of `{ title, link, platform }` objects for recommended courses. |
| `aiModelUsed` | String | AI model identifier used for generation. |
| `createdAt` | Date | Timestamp of when the recommendation was generated. |

---

### 6. ResumeAnalysis Collection
**Purpose:** Stores the results of every AI-powered resume check performed by a user.

| Field | Type | Description |
| :--- | :--- | :--- |
| `_id` | ObjectId | Unique identifier. |
| `user` | ObjectId (ref: User) | The owning user. |
| `originalFilename` | String | Name of the uploaded PDF file. |
| `targetCareer` | String | The career role selected for comparison. |
| `matchScore` | Number | AI-generated match percentage (0–100). |
| `summary` | String | Overall AI narrative summary of the resume vs. target role. |
| `strengths` | Array[String] | List of identified strong points in the resume. |
| `missingSkills` | Array[String] | List of skills present in the target role but absent from the resume. |
| `improvements` | Array[String] | Actionable steps to improve the resume for the target role. |
| `createdAt` | Date | Timestamp of when the analysis was performed. |

---

### 7. Goals Collection
**Purpose:** Stores career-related goals that the user creates and tracks.

| Field | Type | Description |
| :--- | :--- | :--- |
| `_id` | ObjectId | Unique identifier. |
| `user` | ObjectId (ref: User) | The owning user. |
| `title` | String | Short goal title (e.g., "Complete Python Course"). |
| `description` | String | Optional longer description of the goal. |
| `priority` | String | Priority level: Low / Medium / High. |
| `deadline` | Date | Target completion date. |
| `completed` | Boolean | Whether the goal has been marked as done. |
| `createdAt` | Date | Creation timestamp. |

---

## AI-Generated Data (Not Stored in Dataset)

The following data types are generated on-the-fly by the Google Gemini API and returned to the user in real time. Only the structured output fields are persisted to the collections above:

| Generated Content | Source | Persisted? |
| :--- | :--- | :--- |
| Career Recommendation + Justification | Gemini AI | ✅ Yes (Recommendations collection) |
| Learning Roadmap | Gemini AI | ✅ Yes (Recommendations collection) |
| Course Links | Gemini AI + curated list | ✅ Yes (Recommendations collection) |
| Resume Analysis Report | Gemini AI | ✅ Yes (ResumeAnalysis collection) |
| Cover Letter Text | Gemini AI | ❌ No (Returned to user only, not stored) |

---

## Legacy: Sample Profiles (Original Dataset)
For demo and testing purposes, the following sample profile schema was used in the initial development phase:

- **File Name:** `Project_Dataset.json`
- **Format:** JSON
- **Total Records:** 5 synthetic user profiles
- **Purpose:** System verification — testing backend recommendation logic against known expected outputs.
- **Status:** Superseded by live user data. The system now operates entirely on real user-created data.

---

## Usage
1. **System Operation:** All collections are populated dynamically as users interact with the platform.
2. **Testing:** Postman was used to verify all API endpoints against these schemas.
3. **Demo:** Sample accounts can be pre-seeded using the `/api/auth/register` endpoint to demonstrate all features during presentations.
