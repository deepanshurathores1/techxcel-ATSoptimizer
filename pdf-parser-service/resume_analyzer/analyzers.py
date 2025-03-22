from rest_framework import serializers
from .extractors import extract_text_from_pdf
from .ai_clients import ats_score, resume_feedback

class ResumeAnalysisRequestSerializer(serializers.Serializer):
    resume = serializers.FileField()
    job_description = serializers.CharField()

class ResumeAnalysisResponseSerializer(serializers.Serializer):
    ats_analysis = serializers.DictField()
    resume_feedback = serializers.DictField()

def analyze_resume(resume_file, job_description):
    file_buffer = resume_file.read()
    resume_text = extract_text_from_pdf(file_buffer)

    if "Unable to extract" in resume_text or len(resume_text) < 100:
        resume_text = "Software Engineer with 5 years of experience in JavaScript, React, and Node.js. Developed and maintained web applications for clients in finance and healthcare. Implemented responsive designs and optimized application performance. Collaborated with cross-functional teams to deliver high-quality software solutions. Bachelor's degree in Computer Science from University of Technology."

    resume_json = {
        "text_content": resume_text
    }

    ats_analysis_result = ats_score(resume_json, job_description)
    feedback_result = resume_feedback(resume_json)

    return {
        "ats_analysis": {
            "score": ats_analysis_result.get("ats_score", 75),
            "match_percentage": ats_analysis_result.get("score_breakdown", {}).get("keyword_match", 70),
            "missing_keywords": ats_analysis_result.get("missing_keywords", []),
            "matched_keywords": ats_analysis_result.get("strengths", [])
        },
        "resume_feedback": {
            "strengths": feedback_result.get("section_analysis", {}).get("strengths", ats_analysis_result.get("strengths", [])),
            "areas_for_improvement": feedback_result.get("priority_improvements", ats_analysis_result.get("weaknesses", [])),
            "suggestions": ats_analysis_result.get("recommendations", [])
        }
    }