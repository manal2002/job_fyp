from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity as linear_cosine_similarity
from transformers import BertTokenizer, BertModel
import torch
import numpy as np

# Initialize BERT tokenizer and model
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = BertModel.from_pretrained('bert-base-uncased')

def get_bert_embeddings(sentences):
    """
    Compute BERT embeddings for each sentence.
    """
    encoded_input = tokenizer(sentences, padding=True, truncation=True, return_tensors='pt')
    with torch.no_grad():
        model_output = model(**encoded_input)
    return model_output.last_hidden_state.mean(dim=1)

def match_skills(cv_skills, job_skills):
    """
    Match CV skills against job skills using a combination of TF-IDF and BERT embeddings.
    """
    
    if not cv_skills or not job_skills:
        print("Either job skills or skills in cv are not present")
        return [],0
    
    # TF-IDF Vectorization
    tfidf_vectorizer = TfidfVectorizer()
    tfidf_matrix = tfidf_vectorizer.fit_transform(cv_skills + job_skills)
    tfidf_cosine_similarities = linear_cosine_similarity(tfidf_matrix[:len(cv_skills), :], tfidf_matrix[len(cv_skills):, :])
    
    # BERT Embeddings
    cv_embeddings = get_bert_embeddings(cv_skills)
    job_embeddings = get_bert_embeddings(job_skills)
    bert_cosine_similarities = linear_cosine_similarity(cv_embeddings, job_embeddings)
    
    # Combine similarities
    combined_similarities = (tfidf_cosine_similarities + bert_cosine_similarities) / 2
    
    # Identify matches and calculate scores
    matched_skills = []
    scores = []
    
    for i, cv_skill in enumerate(cv_skills):
        best_match_idx = np.argmax(combined_similarities[i])
        best_match_score = combined_similarities[i][best_match_idx]
        if best_match_score > 0.5:  # Threshold for considering a match
            matched_skills.append((cv_skill, job_skills[best_match_idx]))
            scores.append(best_match_score)
    
    # Calculate an overall matching score
    overall_score = np.mean(scores) if scores else 0
    
    return matched_skills, overall_score

'''
# Example usage
cv_skills = ["Python programming", "Data analysis", "Machine learning"]
job_skills = ["Python scripting", "Data Science", "Deep Learning"]

matched_skills, overall_score = match_skills(cv_skills, job_skills)
print("Matched Skills and Scores:", matched_skills)
print("Overall Matching Score:", overall_score)

'''