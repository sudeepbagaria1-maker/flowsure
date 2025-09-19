// feedback.js - Feedback functionality for Flowsure CRM
// This file handles the feedback system including modal creation, form handling, and Firebase integration

/**
 * Initialize feedback system when the page loads
 */
document.addEventListener('DOMContentLoaded', function() {
    // Create feedback modal
    createFeedbackModal();
    
    // Add event listeners to feedback buttons
    const suggestFeatureBtn = document.getElementById('suggest-feature');
    const reportProblemBtn = document.getElementById('report-problem');
    
    if (suggestFeatureBtn) {
        suggestFeatureBtn.addEventListener('click', function() {
            openFeedbackModal('feature');
        });
    }
    
    if (reportProblemBtn) {
        reportProblemBtn.addEventListener('click', function() {
            openFeedbackModal('problem');
        });
    }
});

/**
 * Create the feedback modal HTML and add it to the page
 */
function createFeedbackModal() {
    const modalHTML = `
        <div id="feedback-modal" class="feedback-modal">
            <div class="feedback-modal-content">
                <span class="feedback-close">&times;</span>
                <h2 id="feedback-title">Feedback</h2>
                <form id="feedback-form">
                    <div class="form-group">
                        <label for="feedback-text">Your Feedback *</label>
                        <textarea id="feedback-text" name="feedback" required placeholder="Please provide your feedback here..."></textarea>
                    </div>
                    
                    <div id="context-fields">
                        <!-- Context-specific fields will be added here dynamically -->
                    </div>
                    
                    <div class="form-group">
                        <label for="feedback-email">Email (optional)</label>
                        <input type="email" id="feedback-email" name="email" placeholder="your.email@example.com">
                        <small>We'll only use this to follow up on your feedback</small>
                    </div>
                    
                    <div class="form-actions">
                        <button type="button" id="feedback-cancel" class="btn btn-secondary">Cancel</button>
                        <button type="submit" id="feedback-submit" class="btn btn-primary">Submit Feedback</button>
                    </div>
                </form>
                
                <div id="feedback-message" class="feedback-message" style="display: none;">
                    <p>Thank you for your feedback!</p>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to the body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add event listeners after a short delay to ensure elements are ready
    setTimeout(() => {
        const modal = document.getElementById('feedback-modal');
        const closeBtn = document.querySelector('.feedback-close');
        const cancelBtn = document.getElementById('feedback-cancel');
        const form = document.getElementById('feedback-form');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', closeFeedbackModal);
        }
        
        if (cancelBtn) {
            cancelBtn.addEventListener('click', closeFeedbackModal);
        }
        
        if (modal) {
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    closeFeedbackModal();
                }
            });
        }
        
        if (form) {
            form.addEventListener('submit', handleFeedbackSubmit);
        }
    }, 100);
}

/**
 * Open the feedback modal with the appropriate context
 * @param {string} type - Type of feedback ('feature' or 'problem')
 */
function openFeedbackModal(type) {
    const modal = document.getElementById('feedback-modal');
    const title = document.getElementById('feedback-title');
    const contextFields = document.getElementById('context-fields');
    
    if (!modal || !title || !contextFields) {
        console.error('Modal elements not found');
        return;
    }
    
    // Set modal title and context-specific fields
    if (type === 'feature') {
        title.textContent = 'Suggest a Feature';
        contextFields.innerHTML = `
            <div class="form-group">
                <label for="feature-context">How would this feature help you? *</label>
                <textarea id="feature-context" name="context" required placeholder="Please explain how this feature would benefit you..."></textarea>
            </div>
        `;
    } else {
        title.textContent = 'Report a Problem';
        contextFields.innerHTML = `
            <div class="form-group">
                <label for="problem-context">What were you trying to do? *</label>
                <textarea id="problem-context" name="context" required placeholder="Please describe what you were doing when the problem occurred..."></textarea>
            </div>
        `;
    }
    
    // Reset form and hide message
    const form = document.getElementById('feedback-form');
    const message = document.getElementById('feedback-message');
    if (form) form.reset();
    if (message) message.style.display = 'none';
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

/**
 * Close the feedback modal
 */
function closeFeedbackModal() {
    const modal = document.getElementById('feedback-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

/**
 * Handle feedback form submission
 * @param {Event} e - Form submission event
 */
async function handleFeedbackSubmit(e) {
    e.preventDefault();
    
    // Get form elements
    const form = document.getElementById('feedback-form');
    const submitBtn = document.getElementById('feedback-submit');
    const message = document.getElementById('feedback-message');
    
    if (!form || !submitBtn || !message) {
        console.error('Required form elements not found');
        return;
    }
    
    // Store original button text
    const originalBtnText = submitBtn.textContent;
    
    // Disable submit button and show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';
    
    try {
        // Get form data
        const formData = new FormData(form);
        const feedbackData = {
            feedback: formData.get('feedback'),
            context: formData.get('context'),
            email: formData.get('email'),
            timestamp: new Date(),
            type: document.getElementById('feedback-title').textContent === 'Suggest a Feature' ? 'feature' : 'problem'
        };
        
        // Check if Firebase is available and properly initialized
        let useFirebase = false;
        try {
            // More thorough Firebase check
            if (typeof firebase !== 'undefined' && 
                firebase.apps && 
                firebase.apps.length > 0 && 
                typeof db !== 'undefined' && 
                db.collection) {
                useFirebase = true;
            }
        } catch (error) {
            console.error('Firebase check error:', error);
            useFirebase = false;
        }
        
        if (useFirebase) {
            // Save to Firestore with a timeout to prevent hanging
            try {
                await Promise.race([
                    db.collection('feedback').add(feedbackData),
                    new Promise((_, reject) => 
                        setTimeout(() => reject(new Error('Firebase operation timed out')), 5000)
                    )
                ]);
                console.log('Feedback saved to Firestore');
            } catch (error) {
                console.error('Firebase operation failed:', error);
                // Fall back to simulation
                console.log('Falling back to simulation');
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        } else {
            // Simulate submission for testing
            console.log('Firebase not available, simulating submission');
            console.log('Feedback data:', feedbackData);
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
        // Show success message
        form.style.display = 'none';
        message.style.display = 'block';
        message.innerHTML = '<p>Thank you for your feedback!</p>';
        
        // Close modal after delay and reset button
        setTimeout(() => {
            closeFeedbackModal();
            form.style.display = 'block';
            message.style.display = 'none';
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }, 2000);
        
    } catch (error) {
        console.error('Error submitting feedback:', error);
        alert('Sorry, there was an error submitting your feedback. Please try again.');
        
        // Always reset button state on error
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
    }
}