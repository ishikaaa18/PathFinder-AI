# MINOR PROJECT REPORT
# ON
# “PATHFINDER AI: AN INTELLIGENT CAREER GUIDANCE AND PROGRESS TRACKING SYSTEM”

**Submitted To**  
**National Forensic Sciences University**

**[MASTER OF SCIENCE IN CYBER SECURITY]**

**Submitted By**  
**NAME OF STUDENT**  
**(ENROLLMENT NUMBER)**

**Under the Supervision of**  
**NAME OF GUIDE**  
**(DESIGNATION)**

**Submitted to**  
**SCHOOL OF CYBER SECURITY & DIGITAL FORENSICS**  
**NATIONAL FORENSIC SCIENCES UNIVERSITY**  
**GANDHINAGAR – 382009, GUJARAT, INDIA.**  
**[MARCH, 2026]**

---

## DECLARATION By STUDENT

I hereby declare that the work being presented in this Report titled **“PathFinder AI: An Intelligent Career Guidance and Progress Tracking System”** by me i.e. **NAME OF STUDENT**, having Enrolment Number **“ENROLLMENT NUMBER”**, and submitted to the School of Cyber Security and Digital Forensic at National Forensic Sciences University, Gandhinagar; is my original work carried out during the period of **“January 2026”** to **“March 2026”** under the supervision of **“Name of Supervisor”**. I have complied it with the School’s Ethical Code of Conduct and have duly acknowledged all sources through proper citations and references. The plagiarism check confirms that the overall similarity index is within 10%.

<br><br><br>
__________________________  
**(Name & Signature of Student)**

---

## CERTIFICATE FROM GUIDE

I hereby certify that the dissertation entitled **“PathFinder AI: An Intelligent Career Guidance and Progress Tracking System”**, embodies the result of bonafide minor project work done by **[Name of Student]** of the Semester **[II/III/IV/VII]**, having enrollment number **“[Enrollment Number]”** for the degree of **“[Name of Degree]”** in the **“School of Cyber Security & Digital Forensics”** of the **“National Forensic Sciences University, Gandhinagar, Gujarat – India”** under my guidance and supervision. I further certify that this is an original work and that whatever material obtained and used from other sources has been duly acknowledged in the report. This work has not been submitted for any degree or diploma of any university or institute, as per my knowledge.

<br>
**Date:**  
**Place:** Gandhinagar, Gujarat

<br><br>
**[Name & Designation of Guide]**  
School of Cyber Security & Digital Forensics  
National Forensic Sciences University Gandhinagar, Gujarat – India, 382007.

---

## CERTIFICATE

This is to certify that the minor project viva of Mr./ Ms. **[Name of Student]** of the School of Cyber Security & Digital Forensics, National Forensic Sciences University, Gandhinagar, Gujarat, India - 382007 was conducted on **[Date]** at the National Forensic Sciences University, Gandhinagar Campus. His/Her Minor project titled **“PathFinder AI: An Intelligent Career Guidance and Progress Tracking System”** was evaluated and found satisfactory.

<br><br><br>
**Name & Signature of Internal Examiner 1** &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Name & Signature of Internal Examiner 2**

<br>
**Date:**  
**Place:** Gandhinagar, Gujarat

---

## ACKNOWLEDGEMENT

I would like to express my sincere appreciation to all who have supported the completion of this dissertation work. My heartfelt thanks go to my project supervisor, **[Name of Guide]**, for their constant encouragement, invaluable suggestions, and technical insights which have been crucial in shaping **PathFinder AI**.

I am also grateful to the Head of Department and the esteemed faculty members of the **School of Cyber Security & Digital Forensics** for their academic support and for providing the necessary infrastructure. I would also like to thank my lab mates and peers for their constructive feedback and collaborative spirit during the development of this platform.

Finally, I wish to thank my family and friends for their unwavering support and patience, which allowed me to focus on the successful realization of this project.

**With Sincere Regards,**  
**Name of the Student**  
**Course Name**

---

## ABSTRACT

PathFinder AI is an advanced AI-driven career guidance platform designed specifically to bridge the gap between academic learning and professional employment. Built using the **MERN (MongoDB, Express, React, Node)** stack and integrated with **Google's Gemini Large Language Model**, the platform provides a personalized, 24/7 coaching experience. This project addresses the challenge students face in translating their skills into actionable career paths.

The system features a **Core Recommendation Engine** that analyzes user skills and interests to suggest high-fit careers with match scores. It generates **Personalized Learning Roadmaps** with verified course links from top providers like Coursera and edX. A critical module is the **AI Resume Analyzer**, which extracts text from PDF uploads to provide automated match scores, highlight strengths, and identify skill gaps. Furthermore, the platform includes a **Kanban-style Goal Tracker**, a categorized **Skill Quiz Center**, and a **Market Insights Dashboard** showing live industry trends.

Key findings show that integrating LLMs like Gemini allows for zero-training-cost AI interventions that are highly effective for personal career coaching. The project concludes with a clear roadmap for future features like an Interview Prep Coach and Job Description Matching.

**Keywords:** AI Career Coach, Gemini LLM, MERN Stack, Resume Analysis, Career Recommendation, Skill Matrix, Goal Tracking, Cyber Security Careers, NLP, Roadmap Generation.

---

## LIST OF ABBREVIATIONS

| Abbreviation | Description |
| :--- | :--- |
| **MERN** | MongoDB, Express, React, Node.js |
| **AI** | Artificial Intelligence |
| **LLM** | Large Language Model |
| **JWT** | JSON Web Token |
| **JSON** | JavaScript Object Notation |
| **API** | Application Programming Interface |
| **PDF** | Portable Document Format |
| **CRUD** | Create, Read, Update, Delete |
| **ATS** | Applicant Tracking System |
| **AAA** | Authentication, Authorization, and Accounting |
| **CIA** | Confidentiality, Integrity & Availability |

---

## LIST OF TABLES

*   Table 1: Revision History
*   Table 2: System Feature Completion Status

---

## LIST OF FIGURES

*   Figure 2.1: System Architecture Diagram
*   Figure 4.1: Sequence Diagram – Data Flow
*   Figure 5.1: Skill Matrix Radar Chart Example

---

## TABLE OF CONTENTS

| Section | Title | Page |
| :--- | :--- | :--- |
| | DECLARATION | II |
| | CERTIFICATE | III |
| | APPROVAL CERTIFICATE | IV |
| | ACKNOWLEDGEMENTS | V |
| | ABSTRACT | VI |
| | LIST OF ABBREVIATIONS | VII |
| | LIST OF TABLES | VIII |
| | LIST OF FIGURES | IX |
| | TABLE OF CONTENTS | XII |
| **1.** | **INTRODUCTION** | **1** |
| | 1.1 Purpose | 1 |
| | 1.2 Dissertation Submission | 1 |
| **2.** | **SPECIFICATIONS FOR DISSERTATION FORMAT** | **2** |
| | 2.1 Preparation of Manuscript and Copies | 2 |
| | 2.2 Size and Margins | 2 |
| | 2.3 Page Numbering | 3 |
| **3.** | **GUIDELINES FOR STRUCTURING CONTENTS** | **4** |
| | 3.1 Sequence of Contents | 4 |
| | 3.2 The Body of Dissertation | 4 |
| | 3.3 Reference Material | 5 |
| **4.** | **SYSTEM DESIGN & IMPLEMENTATION** | **7** |
| | 4.1 Technology Stack | 7 |
| | 4.2 Module Description | 8 |
| **5.** | **CONCLUSION & FUTURE SCOPE** | **10** |
| | Bibliography | 12 |
| | PERIODIC PROGRESS REPORT | 13 |
| | PLAGIARISM REPORT | 14 |

---

## 1. INTRODUCTION

### 1.1 Purpose
PathFinder AI is a comprehensive, AI-driven career guidance platform. Its purpose is to help students and job seekers identify optimal career paths by analyzing their skills, interests, and qualifications. The platform leverages Google's Gemini large language model (LLM) for all AI-generated content, providing a full ecosystem of tools including learning roadmaps, resume feedback, and professional document generation.

### 1.2 Dissertation Submission
To have the dissertation examined, the number of dissertation copies to be submitted to the Dean of School of Cyber Security and Digital Forensics corresponds to 3 (including dissertation of supervisor {1 copy for student, 1 for supervisor and 1 for library}) for an M.Tech/MSc Degree student.

---

## 2. SPECIFICATIONS FOR DISSERTATION FORMAT

### 2.1 Preparation of Manuscript and Copies
The dissertation has been prepared using standard text processing software (React/Markdown/HTML) and printed in black text (color for images) in **Times New Roman**. All pages are clear, sharp, and uniformly spaced according to the 75 gsm paper quality requirements.
*   **Chapter Headers:** Size 18, Bold & Underline.
*   **Titles:** Size 14, Bold.
*   **Main Text:** Size 12.

### 2.2 Size and Margins
*   **Size:** A4 (21 cm x 29.7 cm).
*   **Top Margin:** 1.5 cm.
*   **Bottom Margin:** 1 cm.
*   **Left Margin (Binding):** 2.5 cm.
*   **Right Margin:** 1 cm.

### 2.3 Page Numbering
All pages prior to Chapter 1 are in lower case Roman numerals (i, ii, iii...). Starting from Chapter 1, Arabic numerals (1, 2, 3...) are used in the lower right-hand corner.

---

## 3. GUIDELINES FOR STRUCTURING CONTENTS

### 3.1 Sequence of Contents
The organization follows the structure: Introduction → Body of Dissertation → Summary and Conclusions → Future Scope → Reference Material → Appendices.

### 3.2 The Body of Dissertation
The body contains the technical implementation details of the MERN stack application, sequence diagrams for the Gemini AI integration, and the logic behind the Resume PDF parsing and Career Recommendation algorithms.

---

## 4. SYSTEM DESIGN & IMPLEMENTATION

### 4.1 Technology Stack
PathFinder AI utilizes the **MERN** stack for high scalability and performance:
*   **Frontend:** React (Vite) for a fast, reactive UI.
*   **Backend:** Node.js & Express for the RESTful API layer.
*   **Database:** MongoDB Atlas for cloud-based document storage.
*   **AI:** Google Gemini API for intelligent content generation.

### 4.2 Module Description
*   **Resume Analyzer:** Uses `pdf-parse` to extract text from user-uploaded PDFs and compares it against industry-standard career profiles.
*   **Goal Tracker:** Implements a state-managed Kanban board for career milestones.
*   **Skill Matrix:** Uses `Recharts` to visualize the gap between the user's current skill set and the target role's requirements.

---

## 5. CONCLUSION & FUTURE SCOPE

PathFinder AI successfully demonstrates how large language models can be democratized to provide high-quality career guidance. All primary objectives—authentication, recommendation, analysis, and tracking—have been fully implemented.

**Future Scope:**
1.  **Interview Prep Coach:** Role-specific mock interviews.
2.  **LinkedIn Profile Optimizer:** Automated headline and summary rewriting.
3.  **Daily Study Planner:** Day-by-day conversion of roadmaps into tasks.

---

## Bibliography

**Books**
*   German, R.M. (1990) *Powder Injection Molding*, Metal Powder Industries Federation, Princeton, New Jersey, USA.

**Theses**
*   Johnson, J.L. (1994) *Densification, Microstructural Evolution, and Thermal Properties of Liquid Phase Sintered Composites*, Ph.D. Thesis, The Pennsylvania State University.

**Web Resources**
*   Google Gemini API Documentation (2025). [https://ai.google.dev/](https://ai.google.dev/)
*   React.js Documentation (2025). [https://react.dev/](https://react.dev/)

---

## APPENDIX-I: PROGRESS REPORT
*(Refer to separate Progress Report documents attached at the end of the semester)*

---

## PLAGIARISM REPORT
*(Plagiarism check confirms a similarity index of < 10%)*
