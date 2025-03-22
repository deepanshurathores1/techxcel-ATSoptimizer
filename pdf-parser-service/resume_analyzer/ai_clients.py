from django.conf import settings
import requests

class AIClient:
    def __init__(self):
        self.groq_api_key = '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'
        self.groq_url = "https://api.groq.com/v1/chat/completions"

    def analyze_resume(self, resume_text, job_description):
        prompt = f"""
        Conduct a comprehensive ATS analysis of this resume against the job description.
        Provide detailed scoring in this exact JSON format:
        {{
          "ats_score": 0-100,
          "score_breakdown": {{
            "keyword_match": 0-100,
            "experience_match": 0-100,
            "skill_match": 0-100,
            "education_match": 0-100
          }},
          "missing_keywords": ["list", "of", "missing", "terms"],
          "strengths": ["list", "of", "strengths"],
          "weaknesses": ["list", "of", "weaknesses"],
          "recommendations": ["list", "of", "actionable", "steps"]
        }}
        
        Resume:
        {resume_text}
        
        Job Description:
        {job_description}
        
        Analysis Guidelines:
        1. Be strict but fair in scoring.
        2. Prioritize role-specific technical skills.
        3. Identify both hard and soft skills.
        4. Consider industry-standard terminology.
        """

        headers = {
            "Authorization": f"Bearer {self.groq_api_key}",
            "Content-Type": "application/json"
        }

        response = requests.post(self.groq_url, json={"messages": [{"role": "user", "content": prompt}]}, headers=headers)

        if response.status_code == 200:
            return response.json()
        else:
            return {
                "error": "Failed to analyze with Groq",
                "status_code": response.status_code,
                "response": response.text
            }

    def get_feedback(self, resume_text):
        prompt = f"""
        Analyze this resume and provide structured feedback in exactly this JSON format:
        {{
          "overview": "summary",
          "section_analysis": {{
            "summary": ["strength/weakness"],
            "experience": ["strength/weakness"],
            "education": ["strength/weakness"],
            "skills": ["strength/weakness"]
          }},
          "priority_improvements": ["list", "of", "improvements"],
          "score_breakdown": {{
            "clarity": 0-100,
            "relevance": 0-100,
            "quantification": 0-100,
            "ats_optimization": 0-100
          }}
        }}
        
        Resume Content:
        {resume_text}
        """

        headers = {
            "Authorization": f"Bearer {self.groq_api_key}",
            "Content-Type": "application/json"
        }

        response = requests.post(self.groq_url, json={"messages": [{"role": "user", "content": prompt}]}, headers=headers)

        if response.status_code == 200:
            return response.json()
        else:
            return {
                "error": "Failed to analyze with Groq",
                "status_code": response.status_code,
                "response": response.text
            }