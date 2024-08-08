window.addEventListener('DOMContentLoaded', () => {
  const feedbackForm = document.getElementById('feedback-form');

  if (feedbackForm) {
    feedbackForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const question1 = document.getElementById('question1').value;
      const question2 = document.getElementById('question2').value;

      const feedback = {
        id: Date.now(),
        question1,
        question2,
      };

      try {
        const response = await fetch(`/feedback?question1=${question1}&question2=${question2}`, {
          method: 'GET',
        });

        if (response.ok) {
          document.getElementById('question1').value = '';
          document.getElementById('question2').value = '';

          alert('Feedback submitted successfully!');
          console.log(`Feedback submitted: ${JSON.stringify(feedback)}`);
        } else {
          alert('Error submitting feedback. Please try again.');
        }
      } catch (error) {
        alert('Error submitting feedback. Please try again.');
        console.error(error);
      }
    });
  }
});