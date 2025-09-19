// dashboard.js - Dashboard functionality for Flowsure CRM
// This file contains functions to populate the dashboard with sample data and handle user interactions

/**
 * Initialize the dashboard when the page loads
 */
document.addEventListener('DOMContentLoaded', function() {
    // Populate the dashboard with sample data
    populateDashboard();
    
    // Create the lead detail modal
    createLeadDetailModal();
});

/**
 * Populate the dashboard with sample data from data.js
 * This function creates a welcome message, summary cards, and the leads table
 */
function populateDashboard() {
    // Get the sample leads data
    const leads = sampleLeads || [];
    
    // Create welcome message
    createWelcomeMessage();
    
    // Create summary cards
    createSummaryCards(leads);
    
    // Create leads table
    createLeadsTable(leads);
}

/**
 * Create a welcome message section
 */
function createWelcomeMessage() {
    const welcomeHTML = `
        <div class="welcome-message">
            <h2>CRM Dashboard</h2>
            <p>Welcome to your customer management experience</p>
        </div>
    `;
    
    // Insert welcome message into the dashboard content area
    const dashboardContent = document.querySelector('.dashboard-content');
    if (dashboardContent) {
        dashboardContent.innerHTML = welcomeHTML;
    }
}

/**
 * Create summary cards showing lead counts by status
 * @param {Array} leads - Array of lead objects
 */
function createSummaryCards(leads) {
    // Calculate counts for each status
    const totalLeads = leads.length;
    const newLeads = leads.filter(lead => lead.status === 'New').length;
    const contactedLeads = leads.filter(lead => lead.status === 'Contacted').length;
    const wonLeads = leads.filter(lead => lead.status === 'Won').length;
    
    // Create HTML for summary cards
    const summaryCardsHTML = `
        <div class="summary-cards">
            <div class="summary-card">
                <h3>${totalLeads}</h3>
                <p>Total Leads</p>
            </div>
            <div class="summary-card">
                <h3>${newLeads}</h3>
                <p>New Leads</p>
            </div>
            <div class="summary-card">
                <h3>${contactedLeads}</h3>
                <p>Contacted Leads</p>
            </div>
            <div class="summary-card">
                <h3>${wonLeads}</h3>
                <p>Won Leads</p>
            </div>
        </div>
    `;
    
    // Insert summary cards into the dashboard content area
    const dashboardContent = document.querySelector('.dashboard-content');
    if (dashboardContent) {
        dashboardContent.innerHTML += summaryCardsHTML;
    }
}

/**
 * Create responsive table showing leads with columns for company, contact person, status, and source
 * @param {Array} leads - Array of lead objects
 */
function createLeadsTable(leads) {
    // Create table HTML
    let tableHTML = `
        <div class="leads-table-container">
            <div class="table-header">
                <h3>Leads</h3>
                <div class="sort-controls">
                    <label for="sort-status">Sort by Status:</label>
                    <select id="sort-status" onchange="sortLeads('status')">
                        <option value="">All</option>
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Qualified">Qualified</option>
                        <option value="Won">Won</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Closed">Closed</option>
                    </select>
                    
                    <label for="sort-source">Sort by Source:</label>
                    <select id="sort-source" onchange="sortLeads('source')">
                        <option value="">All</option>
                        <option value="Website">Website</option>
                        <option value="Facebook">Facebook</option>
                        <option value="Google">Google</option>
                        <option value="Cold Call">Cold Call</option>
                        <option value="Referral">Referral</option>
                    </select>
                </div>
            </div>
            <div class="table-responsive">
                <table class="leads-table">
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Contact Person</th>
                            <th>Status</th>
                            <th>Source</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
    `;
    
    // Add rows for each lead
    leads.forEach(lead => {
        tableHTML += `
            <tr>
                <td>${lead.company}</td>
                <td>${lead.contactPerson}</td>
                <td><span class="status-badge status-${lead.status.toLowerCase()}">${lead.status}</span></td>
                <td>${lead.source}</td>
                <td><button class="btn btn-secondary view-details-btn" data-lead-id="${lead.id}">View Details</button></td>
            </tr>
        `;
    });
    
    tableHTML += `
                    </tbody>
                </table>
            </div>
        </div>
    `;
    
    // Insert table into the dashboard content area
    const dashboardContent = document.querySelector('.dashboard-content');
    if (dashboardContent) {
        dashboardContent.innerHTML += tableHTML;
        // Add event listeners to the View Details buttons and status buttons
        setTimeout(() => {
            addViewDetailsEventListeners();
        }, 100);
    }
}

/**
 * Sort leads by a specific field (status or source)
 * @param {string} field - Field to sort by ('status' or 'source')
 */
function sortLeads(field) {
    // Get the selected value for the field
    const selectElement = document.getElementById(`sort-${field}`);
    const selectedValue = selectElement.value;
    
    // Filter leads based on the selected value
    let filteredLeads = sampleLeads || [];
    
    if (selectedValue) {
        filteredLeads = filteredLeads.filter(lead => lead[field] === selectedValue);
    }
    
    // Update the table with filtered leads
    updateLeadsTable(filteredLeads);
}

/**
 * Update the leads table with new data
 * @param {Array} leads - Array of lead objects to display
 */
function updateLeadsTable(leads) {
    // Get the table body element
    const tableBody = document.querySelector('.leads-table tbody');
    
    // Clear existing rows
    if (tableBody) {
        tableBody.innerHTML = '';
        
        // Add rows for each lead
        leads.forEach(lead => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${lead.company}</td>
                <td>${lead.contactPerson}</td>
                <td><span class="status-badge status-${lead.status.toLowerCase()}">${lead.status}</span></td>
                <td>${lead.source}</td>
                <td><button class="btn btn-secondary view-details-btn" data-lead-id="${lead.id}">View Details</button></td>
            `;
            tableBody.appendChild(row);
        });
        
        // Add event listeners to the View Details buttons
        setTimeout(() => {
            addViewDetailsEventListeners();
        }, 100);
    }
}

/**
 * Add event listeners to all View Details buttons
 */
function addViewDetailsEventListeners() {
    const viewDetailsButtons = document.querySelectorAll('.view-details-btn');
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function() {
            const leadId = parseInt(this.getAttribute('data-lead-id'));
            openLeadDetailModal(leadId);
        });
    });
}

/**
 * Update the status of a lead
 * @param {number} leadId - The ID of the lead to update
 * @param {string} newStatus - The new status to set
 */
/**
 * Show a temporary success message
 * @param {string} message - The message to display
 */
function showSuccessMessage(message) {
    // Create a temporary message element if it doesn't exist
    let messageElement = document.getElementById('status-update-message');
    if (!messageElement) {
        messageElement = document.createElement('div');
        messageElement.id = 'status-update-message';
        messageElement.className = 'status-update-message';
        document.body.appendChild(messageElement);
    }
    
    // Set the message and show it
    messageElement.textContent = message;
    messageElement.style.display = 'block';
    
    // Hide the message after 3 seconds
    setTimeout(() => {
        messageElement.style.display = 'none';
    }, 3000);
}

/**
 * Update the status of a lead from the modal
 * @param {number} leadId - The ID of the lead to update
 * @param {string} newStatus - The new status to set
 */
function updateLeadStatusInModal(leadId, newStatus) {
    // Find the lead in the sample data
    const leadIndex = sampleLeads.findIndex(lead => lead.id === leadId);
    
    if (leadIndex === -1) {
        console.error('Lead not found');
        return;
    }
    
    // Store the old status for comparison
    const oldStatus = sampleLeads[leadIndex].status;
    
    // Update the lead's status
    sampleLeads[leadIndex].status = newStatus;
    
    // Show success message
    showSuccessMessage(`Lead status updated to ${newStatus}`);
    
    // Update the status badge in the modal if it exists
    const statusBadge = document.querySelector('.modal-status-badge');
    if (statusBadge) {
        statusBadge.className = `status-badge status-${newStatus.toLowerCase()}`;
        statusBadge.textContent = newStatus;
    }
}

/**
 * Close the lead detail modal
 */
function closeLeadDetailModal() {
    const modal = document.getElementById('lead-detail-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Refresh the leads table to show any updated statuses
        const currentLeads = sampleLeads || [];
        updateLeadsTable(currentLeads);
    }
}

/**
 * Create and display the lead detail modal
 */
function createLeadDetailModal() {
    const modalHTML = `
        <div id="lead-detail-modal" class="lead-detail-modal">
            <div class="lead-detail-modal-content">
                <span class="lead-detail-close">&times;</span>
                <h2>Lead Details</h2>
                <form id="lead-detail-form">
                    <div class="form-group">
                        <label for="lead-company">Company</label>
                        <input type="text" id="lead-company" name="company" readonly>
                    </div>
                    
                    <div class="form-group">
                        <label for="lead-contact-person">Contact Person</label>
                        <input type="text" id="lead-contact-person" name="contactPerson" readonly>
                    </div>
                    
                    <div class="form-group">
                        <label for="lead-source">Source</label>
                        <input type="text" id="lead-source" name="source" readonly>
                    </div>
                    
                    <div class="form-group">
                        <label for="lead-next-contact-date">Next Contact Date</label>
                        <input type="date" id="lead-next-contact-date" name="nextContactDate">
                    </div>
                    
                    <div class="form-group">
                        <label for="lead-discussion-summary">Discussion Summary</label>
                        <textarea id="lead-discussion-summary" name="discussionSummary" placeholder="Enter discussion summary..."></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label for="lead-handover-note">Handover Note</label>
                        <textarea id="lead-handover-note" name="handoverNote" placeholder="Enter handover note..."></textarea>
                    </div>
                    
                    <!-- Department-specific Actions Section -->
                    <div class="form-group lead-actions-section">
                        <h3>Actions</h3>
                        <div id="department-actions" class="department-actions">
                            <!-- Department-specific buttons will be added here dynamically -->
                        </div>
                    </div>
                    
                    <div class="form-actions">
                        <button type="button" id="lead-detail-cancel" class="btn btn-secondary">Cancel</button>
                        <button type="submit" id="lead-detail-save" class="btn btn-primary">Save Changes</button>
                    </div>
                </form>
                
                <div id="lead-detail-message" class="lead-detail-message" style="display: none;">
                    <p>Lead information updated successfully!</p>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to the body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add event listeners
    const modal = document.getElementById('lead-detail-modal');
    const closeBtn = document.querySelector('.lead-detail-close');
    const cancelBtn = document.getElementById('lead-detail-cancel');
    const form = document.getElementById('lead-detail-form');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeLeadDetailModal);
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeLeadDetailModal);
    }
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeLeadDetailModal();
            }
        });
    }
    
    if (form) {
        form.addEventListener('submit', handleLeadDetailSubmit);
    }
}

/**
 * Open the lead detail modal with the specified lead's information
 * @param {number} leadId - The ID of the lead to display
 */
function openLeadDetailModal(leadId) {
    // Get the lead data
    const lead = sampleLeads.find(l => l.id === leadId);
    
    if (!lead) {
        console.error('Lead not found');
        return;
    }
    
    // Create the modal if it doesn't exist
    let modal = document.getElementById('lead-detail-modal');
    if (!modal) {
        createLeadDetailModal();
        modal = document.getElementById('lead-detail-modal');
    }
    
    // Populate the form with lead data
    document.getElementById('lead-company').value = lead.company || '';
    document.getElementById('lead-contact-person').value = lead.contactPerson || '';
    document.getElementById('lead-source').value = lead.source || '';
    document.getElementById('lead-next-contact-date').value = lead.nextContactDate || '';
    document.getElementById('lead-discussion-summary').value = '';
    document.getElementById('lead-handover-note').value = '';
    
    // Populate department-specific actions
    const departmentActions = document.getElementById('department-actions');
    if (departmentActions) {
        let actionButtons = '';
        switch(lead.department) {
            case 'Technology':
                // Could be Presales or Finance, let's use Presales for this example
                actionButtons = `
                    <button class="btn btn-success modal-status-btn" data-lead-id="${lead.id}" data-status="Qualified">Qualified</button>
                    <button class="btn btn-warning modal-status-btn" data-lead-id="${lead.id}" data-status="Unqualified">Unqualified</button>
                `;
                break;
            case 'Services':
                // Could be Presales or Delivery, let's use Delivery for this example
                actionButtons = `
                    <button class="btn btn-info modal-status-btn" data-lead-id="${lead.id}" data-status="Delivered">Delivered</button>
                    <button class="btn btn-secondary modal-status-btn" data-lead-id="${lead.id}" data-status="Cancelled">Cancelled</button>
                `;
                break;
            case 'Retail':
            case 'Manufacturing':
                // BD department
                actionButtons = `
                    <button class="btn btn-success modal-status-btn" data-lead-id="${lead.id}" data-status="Won">Won</button>
                    <button class="btn btn-danger modal-status-btn" data-lead-id="${lead.id}" data-status="Lost">Lost</button>
                `;
                break;
            default:
                // Default action buttons
                actionButtons = `
                    <button class="btn btn-success modal-status-btn" data-lead-id="${lead.id}" data-status="Qualified">Qualified</button>
                    <button class="btn btn-warning modal-status-btn" data-lead-id="${lead.id}" data-status="Unqualified">Unqualified</button>
                `;
        }
        departmentActions.innerHTML = actionButtons;
        
        // Add event listeners to the modal status buttons
        setTimeout(() => {
            const modalStatusButtons = document.querySelectorAll('.modal-status-btn');
            modalStatusButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const leadId = parseInt(this.getAttribute('data-lead-id'));
                    const newStatus = this.getAttribute('data-status');
                    updateLeadStatusInModal(leadId, newStatus);
                });
            });
        }, 100);
    }
    
    // Hide success message and show form
    const form = document.getElementById('lead-detail-form');
    const message = document.getElementById('lead-detail-message');
    if (form) form.style.display = 'block';
    if (message) message.style.display = 'none';
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

/**
 * Close the lead detail modal
 */
function closeLeadDetailModal() {
    const modal = document.getElementById('lead-detail-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

/**
 * Handle lead detail form submission
 * @param {Event} e - Form submission event
 */
function handleLeadDetailSubmit(e) {
    e.preventDefault();
    
    // Get form elements
    const form = document.getElementById('lead-detail-form');
    const saveBtn = document.getElementById('lead-detail-save');
    const message = document.getElementById('lead-detail-message');
    
    if (!form || !saveBtn || !message) {
        console.error('Required form elements not found');
        return;
    }
    
    // Store original button text
    const originalBtnText = saveBtn.textContent;
    
    // Disable save button and show loading state
    saveBtn.disabled = true;
    saveBtn.textContent = 'Saving...';
    
    try {
        // In Experience Mode, just show a success message
        // In a real implementation, this would save to a database
        
        // Show success message
        form.style.display = 'none';
        message.style.display = 'block';
        
        // Close modal after delay and reset button
        setTimeout(() => {
            closeLeadDetailModal();
            saveBtn.disabled = false;
            saveBtn.textContent = originalBtnText;
        }, 2000);
        
    } catch (error) {
        console.error('Error saving lead details:', error);
        alert('Sorry, there was an error saving the lead details. Please try again.');
        
        // Always reset button state on error
        saveBtn.disabled = false;
        saveBtn.textContent = originalBtnText;
    }
}