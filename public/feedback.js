
window.addEventListener('DOMContentLoaded', () => {

  const feedbackForm = document.getElementById('feedback-form');

  if (feedbackForm) {
    feedbackForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const question1 = document.getElementById('question1').value.trim();
      const question2 = document.getElementById('question2').value.trim();

      if (!question1 || !question2) {
        alert('Please fill in all required fields');
        return;
      }

      const feedback = {
        id: Date.now(),
        question1,
        question2,
      };

      try {
        const response = await fetch(`/feedback`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(feedback),
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

window.addEventListener('DOMContentLoaded', () => {

  const feedbackForm = document.getElementById('feedback-form');

  if (feedbackForm) {
    feedbackForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const question1 = document.getElementById('question1').value.trim();
      const question2 = document.getElementById('question2').value.trim();

      if (!question1 || !question2) {
        alert('Please fill in all required fields');
        return;
      }

      const feedback = {
        id: Date.now(),
        question1,
        question2,
      };

      try {
        const response = await fetch(`/feedback`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(feedback),
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
});