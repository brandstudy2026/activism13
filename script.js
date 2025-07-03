document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('return-btn').addEventListener('click', () => {
    const surveyUrl = 'https://example.com/your-survey';
    window.location.href = surveyUrl;
  });
});
